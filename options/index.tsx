import { Alert, Snackbar } from "@mui/material"
import React, { useCallback, useEffect, useState } from "react"
import { GITHUB_ORG, GITHUB_TOKEN_SECRET_KEY } from "~config"
import "~main.css"
import { storage } from "~utils/storage"
import GithubSettings from "./githubSettings"
import ShortcutsSettings from "./shortcutSettings"

function OptionsPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [githubToken, setGithubToken] = useState<string>()
  const [githubOrg, setGithubOrg] = useState<string>()

  useEffect(() => {
    storage.get<string>(GITHUB_TOKEN_SECRET_KEY).then((v: string) => {
      setGithubToken(v)
    })
    storage.get<string>(GITHUB_ORG).then((v: string) => {
      setGithubOrg(v)
    })

  }, [githubToken])

  const showSavedAlert = useCallback(()=> {
    setIsOpen(true)
  }, [])


  const setToken = useCallback((v: string) => {
    storage.set(GITHUB_TOKEN_SECRET_KEY, v).then(() => {
      setGithubToken(v)
      showSavedAlert()
    })
  }, [showSavedAlert])

  const setOrg = useCallback((v: string) => {
    storage.set(GITHUB_ORG, v).then(() => {
      setGithubOrg(v)
      showSavedAlert()
    })
  }, [showSavedAlert])

  

  return (
    <>
      <h2>Husky Settings</h2>
      <GithubSettings token={githubToken} setToken={setToken} org={githubOrg} setOrg={setOrg}/>
      <ShortcutsSettings onSave={showSavedAlert}/>;
      <Snackbar
        open={isOpen}
        autoHideDuration={1000}
        onClose={() => setIsOpen(false)}
      >
        <Alert severity="success">Settings saved!</Alert>
      </Snackbar>
    </> 
  )
}

export default OptionsPage
