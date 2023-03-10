

// TODO: Find a proper way to do this and auto generate graphql types maybe
export const QUERY_OWNER_PRS = (githubOrg: string) => `{
    search(query: "is:open is:pr archived:false sort:updated-desc author:@me user:${githubOrg}", type: ISSUE, first: 100) {
        issueCount
        edges {
            node {
            ... on PullRequest {
                number
                title
                repository {
                    nameWithOwner
                    name
                }
                createdAt
                mergedAt
                url
                changedFiles
                additions
                deletions

                author {
                    login
                }
                isDraft
                labels(last: 15) {
                    nodes {
                        id
                        name
                    }
                }
                permalink
                totalCommentsCount
                reviewDecision 
            }
            }
        }
    }
}`
export const QUERY_OWNER_ISSUES = (githubOrg: string) => `{
  search(query: "user:${githubOrg} assignee:@me state:open sort:updated-desc", type: ISSUE, first: 100) {
    issueCount
      edges {
          node {
          ... on Issue {
              number
              title
              repository {
                  nameWithOwner
                  name
              }
              createdAt
              url
  
              labels(last: 15) {
                  nodes {
                      id
                      name
                  }
              }
          }
          }
      }
  }
}`