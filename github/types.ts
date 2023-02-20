
export interface PullRequest {
  number: number,
  title: string,
  repository: {
      nameWithOwner: string
      name: string
  },
  createdAt: string,
  mergedAt?: string,
  url: string,
  changedFiles: number,
  additions: number,
  deletions: number,

  author: {login: string}, 
  labels: string[], 
  permalink: string,  
  totalCommentsCount: number, 
  isDraft: boolean,    
  reviewDecision: ReviewDecision,  
}

export interface PRSearchQueryResponse {
    search: {
        edges: {node: PullRequest}[]
    }
}

export enum ReviewDecision {
    CHANGES_REQUESTED = "CHANGES_REQUESTED",
    APPROVED = "APPROVED",
    REVIEW_REQUIRED = "REVIEW_REQUIRED",
}


export interface Issue {
  number: number,
  title: string,
  repository: {
      nameWithOwner: string
      name: string
  },
  createdAt: string,

  url: string,
  changedFiles: number,
  additions: number,
  deletions: number,
  //   TODO: Labels
}

export interface IssueSearchQueryResponse {
    search: {
        edges: {node: Issue}[]
    }
}