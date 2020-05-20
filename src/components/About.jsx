import React from 'react';

class About extends React.Component {
    render() {
      return (
          <div className="about">
          <h1>About</h1>

          <p>
              A few weeks ago, I wanted a way to agreggate all of the reactions
              that any of my PRs, Issues, or Comments on GitHub had received. I initially
              attempted a solution in Go with GitHub's API v3, which is a REST API. This led to many dependent
              calls, and made the simple act of getting all reactions quite complex. Recently, I found GitHub's 
              API v4, which is built on <a href='https://graphql.org/'>GraphQL</a>. After some playing around,
              I was able to get this information in one query:
          </p>

          <pre>{`
            user(login: "\${username}") {
                issueComments(last: 100) {
                    nodes {
                        reactions(last: 100){nodes{content}}
                    }
                }
                pullRequests(last: 100) {
                    nodes{
                        reactions(last: 100){nodes{content}}
                    }
                }
                issues(last: 100) {
                    nodes{
                        reactions(last: 100){nodes{content}}
                    }
                }
            }
          `}</pre>
          <p>
              Since it's probably obvious I'm not the best frontend developer,
              feel free to make this site better by opening a PR over at <a href='https://github.com/ginglis13'>the repo</a> (
              I'll probably react to your issue/pr and you can see it update here 😄).
              A more detailed post about this can be found at my <a href='https://ginglis.me'>blog</a>.
          </p>
          </div>
      )
    }
  }

export default About;