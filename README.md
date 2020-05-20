# ghreaccs

a simple react app that finds reactions to your GitHub issues, PRs, and comments using GitHub's GraphQL APIv4. [https://www.ghreaccs.com](https://www.ghreaccs.com)

![https://yld.me/raw/ceKu.png](https://yld.me/raw/ceKu.png)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Motivation

My friends and I who are active in the open source community are big on reacting w/ the :rocket: emoji. A few weeks ago I thought it would be fun
to write a program in Go that compiles all reactions a user has received on GitHub. This was using the v3 REST API, which proved to be difficult to use
for this purpose as it required a lot of dependent, consecutive requests. Recently, I found out about GraphQL, and shortly after GitHub's API v4, which
is implemented in GraphQL. This made finding the info I wanted much easier - in fact, this project involves only a single GraphQL query:

```graphql
user(login: "${username}") {
    issueComments(last: 100) {
        nodes {
            reactions(last: 100){
                nodes{
                    content
                    }
            }
        }
    }
    pullRequests(last: 100) {
        nodes{
            reactions(last: 100){
                nodes{
                    content
                }
            }
        }
    }
    issues(last: 100) {
        nodes{
            reactions(last: 100){
                nodes{
                    content
                }
            }
        }
    }
}
```

If you don't want to use my site, you can run the query yourself in GitHub's query builder: [https://developer.github.com/v4/explorer/](https://developer.github.com/v4/explorer/) (You'll need to create an application oauth token).

This was a fun intro to GraphQL and React for me, as I had very minimal experience with both prior to this.

## Contributing

Since it's probably obvious I'm not the best frontend developer, feel free to make this site better by opening an issue or PR ( I'll probably react to your issue/pr and you can see it update here 😄). There is definitely room for improvement with the CSS of the site.
