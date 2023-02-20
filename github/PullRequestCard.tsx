import * as React from "react"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import { PullRequest, ReviewDecision } from "./types"
import { CardActionArea, Chip, Fab } from "@mui/material"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import ChatIcon from "@mui/icons-material/Chat"
import LockClockIcon from "@mui/icons-material/LockClock"

interface PullRequestCardProps {
  pr: PullRequest
}

export default function PullRequestCard({pr}: PullRequestCardProps) {
  let statusComp = <CheckCircleIcon color="success" sx={{marginLeft: "auto"}}/>
  if(pr.reviewDecision == ReviewDecision.CHANGES_REQUESTED) {
    statusComp = <ChatIcon color="info" sx={{marginLeft: "auto"}}/>
  } else if (pr.reviewDecision == ReviewDecision.REVIEW_REQUIRED) {
    statusComp = <LockClockIcon color="secondary" sx={{marginLeft: "auto"}}/>
  }
  
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" >
        <CardActionArea href={pr.url}>
          <React.Fragment>
            <CardContent>
              <Typography sx={{
                fontSize: 20, fontWeight: 400, display: "flex", width: "100%", gap: "18px",
                padding: "6px", alignItems: "center",
              }} color="text.secondary" gutterBottom>
                PR #{pr.number} in {pr.repository.name}
                {/* <Chip label={pr.repository.name} size="small"/> */}
                by {pr.author.login}
                {statusComp}
              </Typography>
              <Typography variant="h5" component="div">
                {pr.title}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                +{pr.additions} -{pr.deletions} in {pr.changedFiles} {pr.changedFiles == 1 ? "file" :  "files"}
              </Typography>
            </CardContent>
          </React.Fragment>
        </CardActionArea>
      </Card>
    </Box>
  )
}