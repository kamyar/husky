import { Visibility, VisibilityOff } from "@mui/icons-material"
import {
  Alert,
  Box,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Link,
} from "@mui/material"
import React, { useEffect, useState } from "react"

interface GithubSettingsProps {
    token: string,
    setToken: (string) => void
}

export default function GithubSettings(props: GithubSettingsProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <Box
      sx={{
        padding: "16px",
      }}
    >
      <h3>Github Shortcuts</h3>
      <FormControl
        fullWidth
        sx={{
          m: 1,
        }}
        variant="standard"
      >
        {/* <InputLabel>Token</InputLabel> */}
        <Input
          defaultValue={props.token}
          value={props.token}
          placeholder="Github Token"
          onChange={(v) =>
            props.setToken(v.target.value)
          }
          type={(showPassword) ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <br />
        {!props.token &&
        <Alert  severity="warning">
          By adding a valid Github token, you can see all PRs you are involved in the new tab page.
          <br />
          <Link href="https://github.com/settings/tokens/new">Visit her</Link> to define a token with `repo` scope, copy and set it here and then enable SSO for any Github Org <br />
           you might want to see PRs from.
        </Alert>
        }
      </FormControl>
    </Box>
  )
}
