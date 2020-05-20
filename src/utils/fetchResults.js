import buildQuery from './query';
import buildResults from './buildResults';

function fetchResults(){
  const username = document.getElementById("username").value;
  if (!username){
    // maybe some "please provide a username" message
    return;
  } 

  const query = buildQuery(username);

  fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `bearer ${process.env.REACT_APP_GH_TOKEN}`,
      'Accept': 'application/json',
    },
    body: JSON.stringify({query})
  }).then(r => r.json())
  .then( data => {
    console.log(data);
    // username does not exist
    if(!data['data']['user']){
      // make some "error: user not found" result
      return;
    }
    const issueComments = data['data']['user']['issueComments']['nodes'];
    const prs = data['data']['user']['pullRequests']['nodes'];
    const issues = data['data']['user']['issues']['nodes'];


    let results = {
        'comments': buildResults('comment', issueComments),
        'issues': buildResults('issue', issues),
        'prs': buildResults('pr', prs),
    }
    console.log(results);
    return results;
  },
  error => {
    console.error(`Error getting reaction stats: ${error}`);
  });

}

export default fetchResults;
