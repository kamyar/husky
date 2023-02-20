import AddIcon from "@mui/icons-material/Add"
import { Box, Button, Snackbar } from "@mui/material"
import Alert from "@mui/material/Alert"
import React, { useCallback, useEffect, useState } from "react"
import { SHORTCUTS_STORAGE_KEY } from "~config"
import type { ShortcutItem } from "~shortcut"
import { storage } from "~utils/storage"
import "~main.css"
import ShortcutItemOption from "./ShortcutItemOption"

interface ShortcutsSettingsProps {
  onSave: () => void
}

export default function ShortcutsSettings(props: ShortcutsSettingsProps) {
  const [shortcuts, setShortcuts] = useState<ShortcutItem[]>([])

  const addNewShortcut = useCallback(
    async () => {
      await setShortcuts([...(shortcuts || []), {}])
      await storage.set(SHORTCUTS_STORAGE_KEY, shortcuts)
      props.onSave()
    }, [props, shortcuts])

  const deleteShortcut = useCallback(
    async (i: number) => {
      shortcuts.splice(i, 1)
      await setShortcuts([...shortcuts])
      await storage.set(SHORTCUTS_STORAGE_KEY, shortcuts)
      props.onSave()
    },
    [props, shortcuts]
  )

  useEffect(() => {
    storage
      .get<ShortcutItem[]>(SHORTCUTS_STORAGE_KEY)
      .then((v: ShortcutItem[]) => {
        setShortcuts(v)
      })
  }, [])

  const updateShortcut = useCallback(
    async (i: number, shortcut: ShortcutItem) => {
      shortcuts[i] = { ...shortcuts[i], ...shortcut }
      await setShortcuts([...shortcuts])
      await storage.set(SHORTCUTS_STORAGE_KEY, shortcuts)
      props.onSave()
    },
    [props, shortcuts]
  )

  return (
    <Box
      sx={{
        padding: "16px",
      }}
    >
      <h3>Omnibox Shortcuts</h3>
      {shortcuts &&
        shortcuts.map((shortcut, i) => (
          <ShortcutItemOption
            key={i}
            deleteShortcut={deleteShortcut}
            updateShortcut={updateShortcut}
            shortcut={shortcut}
            i={i}
          ></ShortcutItemOption>
        ))}
      {!shortcuts?.length && (
        <Alert severity="info" title="No shortcuts found">
          No shortcuts have been defined yet
        </Alert>
      )}
      <Box
        sx={{
          display: "flex",
          padding: "10px",
          justifyContent: "center",
          width: "100%"
        }}
      >
        <Button onClick={addNewShortcut} variant="contained">
          <AddIcon fontSize="medium"/>
        </Button>
      </Box>
    </Box>
  )
}
