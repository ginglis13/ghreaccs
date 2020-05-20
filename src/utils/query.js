function buildQuery(username) {
    const query = `{\
    user(login: "${username}") {\
      issueComments(last: 100) {\
        nodes {\
          reactions(last: 100){nodes{content}}\
         }\
      }\
      pullRequests(last: 100) {\
        nodes{\
          reactions(last: 100){nodes{content}}\
        }\
      }\
      issues(last: 100) {\
        nodes{\
          reactions(last: 100){nodes{content}}\
        }\
      }\
    }\
  }`

  return query;
}

export default buildQuery;
