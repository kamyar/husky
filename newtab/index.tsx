import { Alert, Box, Stack } from "@mui/material"
import React, { useEffect, useState } from "react"
import { GITHUB_ORG, GITHUB_TOKEN_SECRET_KEY } from "~config"
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
  const [githubOrg, setGithubOrg] = useState<string>()
  const [githubToken, setGithubToken] = useState<string>()
  console.log(githubToken)
  useEffect(() => {
    storage.get<string>(GITHUB_TOKEN_SECRET_KEY).then((v) => setGithubToken(v))
    storage.get<string>(GITHUB_ORG).then(setGithubOrg)
  }, [])

  // TODO: DRY this
  // Search PRs
  useEffect(() => {
      if(!githubToken || !githubOrg) {
        setError("Token is missing, click on the extension icon to set your Github Token")
        return
      }
      new Promise(async () => {
        try {
          const client = githubClient(githubToken)
          const response: PRSearchQueryResponse = await client.graphql<PRSearchQueryResponse>(QUERY_OWNER_PRS(githubOrg))
          const allPrs = response.search.edges.map(v => v.node)
          if (!allPrs.length) {
            setError("No PRs found, your token might not have the correct scope. Please add `repo` scope and re-enable SSO")
            return
          }

          setError("")
          setPullRequests(allPrs)
        } catch (error) {
          setError("Github:" + error.message)
        }
      })
  }, [githubToken, githubOrg])

  // Search Issues
  useEffect(()=>{

      if(!githubToken || !githubOrg) {
        setError("Token is missing, click on the extension icon to set your Github Token")
        return
      }
      new Promise(async () => {
        try {
          const client = githubClient(githubToken)
          const response: IssueSearchQueryResponse = await client.graphql<IssueSearchQueryResponse>(QUERY_OWNER_ISSUES(githubOrg))
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
  }, [githubToken, githubOrg])

  return (
    <>
      <Box
        sx={{padding: "16px"}}
      >
        <h2>your pull requests</h2>
        <Box sx={{display: "flex", width: "100%", gap: "8px"}}>
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

