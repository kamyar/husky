import { Octokit } from "octokit"

export default function githubClient(token: string) {
  return new Octokit({
    auth: token,
  })
}
