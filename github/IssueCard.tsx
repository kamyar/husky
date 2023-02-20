import * as React from "react"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import type { Issue } from "./types"
import { CardActionArea } from "@mui/material"

interface IssueCardProps {
  issue: Issue
}

export default function IssueCard({issue}: IssueCardProps) {

  
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" >
        <CardActionArea href={issue.url}>
          <React.Fragment>
            <CardContent>
              <Typography sx={{
                fontSize: 20, fontWeight: 400, display: "flex", width: "100%", gap: "18px",
                padding: "6px", alignItems: "center",
              }} color="text.secondary" gutterBottom>
                Issue #{issue.number} in {issue.repository.name} 
              </Typography>
              <Typography variant="h5" component="div">
                {issue.title}
              </Typography>
            </CardContent>
          </React.Fragment>
        </CardActionArea>
      </Card>
    </Box>
  )
}