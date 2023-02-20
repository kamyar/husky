import DeleteIcon from "@mui/icons-material/Delete"
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  TextField,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import type { ShortcutItem } from "~shortcut"
import { getURL } from "~utils"

interface ShortcutItemOptionProps {
  shortcut: ShortcutItem
  updateShortcut: (i: number, shortcut: ShortcutItem) => void;
  i: number;
  deleteShortcut: (i: number) => void;
}

export default function ShortcutItemOption(props: ShortcutItemOptionProps) {
  const [suggestions, setSuggestions] = useState([])
  const [addressSearch, setAddressSearch] = useState<string>("")

  useEffect(() => {
    if (addressSearch) {
      chrome.history
        .search({ text: addressSearch, maxResults: 10 })
        .then((suggestions) => {
          console.log(suggestions)
          const suggestionItems: { title?: string; label: string }[] =
            suggestions.map((item) => {
              const url = getURL(item.url)
              return { label: url.href, title: item.title }
            })
          const searchUrl = getURL(addressSearch)
          const hasSearchURL = !suggestionItems.filter(
            (v) => v.label == addressSearch
          )
          if (searchUrl && hasSearchURL) {
            suggestionItems.push({ label: addressSearch })
          }
          setSuggestions(
            suggestionItems
          )
        })
    } else {
      setSuggestions([])
    }
  }, [addressSearch])

  return (
    <Box
      sx={{
        display: "flex",
        padding: "10px",
      }}
    >
      <FormControl
        fullWidth
        sx={{
          m: 1,
        }}
        variant="standard"
      >
        <InputLabel>Key</InputLabel>
        <Input
          defaultValue={props.shortcut.key}
          onChange={(v) =>
            props.updateShortcut(props.i, {
              ...props.shortcut,
              key: v.target.value,
            })
          }
        />
      </FormControl>
      <FormControl
        fullWidth
        sx={{
          m: 1,
        }}
        variant="standard"
      >
        <Autocomplete
          disablePortal
          autoHighlight
          defaultValue={props.shortcut.address ? {label: props.shortcut.address} : undefined}
          // value={{label: props.shortcut.address}}
          options={suggestions}
          onInputChange={(_, value) => setAddressSearch(value)}
          renderInput={(params) => (
            <>
              <TextField variant="standard" {...params} label="Address" />
            </>
          )}
          renderOption={(props, option) => (
            <li {...props}>
              {option.label}
            </li>
          )}
          getOptionLabel={(v) => v.label || ""}
          onChange={(_, v) =>
            props.updateShortcut(props.i, {
              ...props.shortcut,
              address: v ? v.label : "",
            })
          }
        />
      </FormControl>
      <Button onClick={() => props.deleteShortcut(props.i)}>
        <DeleteIcon />
      </Button>
    </Box>
  )
}
