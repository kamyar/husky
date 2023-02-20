import { Alert, Box, Stack } from "@mui/material"
import React, { useEffect, useState } from "react"
import { GITHUB_TOKEN_SECRET_KEY } from "~config"
import githubClient from "~github/client"
import { QUERY_OWNER_ISSUES, QUERY_OWNER_PRS } from "~github/graphql"
import IssueCard from "~github/IssueCard"
import PullRequestCard from "~github/PullRequestCard"
import type { PullRequest, PRSearchQueryResponse, Issue, IssueSearchQueryResponse } from "~github/types"
import { storage } from "~utils/storage"



export default function NewTabPage() {
  const [pullRequests, setPullRequests] = useState<PullRequest[]>()
  const [issues, setIssues] = useState<Issue[]>()
  const [error, setError] = useState<string>()

  // Search PRs
  useEffect(()=>{
    storage.get<string>(GITHUB_TOKEN_SECRET_KEY).then(async (token: string) => {
      if(!token) {
        setError("Token is missing, click on the extension icon to set your Github Token")
        return
      }
      try {
        const client = githubClient(token)
        const response: PRSearchQueryResponse = await client.graphql<PRSearchQueryResponse>(QUERY_OWNER_PRS)
        const allPrs = response.search.edges.map(v => v.node)
        if(!allPrs.length) {
          setError("No PRs found, your token might not have the correct scope. Please add `repo` scope and re-enable SSO")
          return
        }

        setError("")
        setPullRequests(allPrs)
      } catch (error) {
        setError("Github:" + error.message)
      }
    })
  }, [])

  // Search Issues
  useEffect(()=>{
    storage.get<string>(GITHUB_TOKEN_SECRET_KEY).then(async (token: string) => {
      if(!token) {
        setError("Token is missing, click on the extension icon to set your Github Token")
        return
      }
      try {
        const client = githubClient(token)
        const response: IssueSearchQueryResponse = await client.graphql<IssueSearchQueryResponse>(QUERY_OWNER_ISSUES)
        const allIssues = response.search.edges.map(v => v.node)
        if(!allIssues.length) {
          setError("No PRs found, your token might not have the correct scope. Please add `repo` scope and re-enable SSO")
          return
        }

        setError("")
        setIssues(allIssues)
      } catch (error) {
        setError("Github:" + error.message)
      }
    })
  }, [])

  return (
    <>
      <Box
        sx={{padding: "16px"}}
      >
        <h2>your pull requests</h2>
        <Box sx={{display: "flex", width: "100%"}}>

          <Box
            sx={{display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}
          >
            {pullRequests && pullRequests.map((pr, i) => <PullRequestCard pr={pr} key={i}/>)}
          </Box>
          <Box
            sx={{display: "flex", flexDirection: "column", gap: "8px", flex: 1}}
          >
            {issues && issues.map((issue, i) => <IssueCard issue={issue} key={i}/>)}
          </Box>
        </Box>
        {error && 
            <Alert  severity="error">
              {error}
            </Alert>
        }
      </Box>
    </>
  )
}

