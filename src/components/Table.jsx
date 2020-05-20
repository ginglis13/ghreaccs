import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import buildResults from '../utils/buildResults';
import buildQuery from '../utils/query';
import { Input, Button } from '@material-ui/core';


const useStyles = makeStyles({
  table: {
    minWidth: 300,
    maxWidth: 480,
  },
});


function createData(name, heart, hooray, thumbsup, thumbsdown, rocket, eyes, confused, laugh) {
  return { name, heart, hooray, thumbsup, thumbsdown, rocket, eyes, confused, laugh };
}


export default function SimpleTable() {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState([]);

  const loadMoreData = () => {
    setPage(page + 1);
  };

  useEffect(() => {
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
          'total': {'heart':0, 'hooray':0, 'thumbsup':0, 'thumbsdown':0, 'rockets':0,
                    'eyes':0, 'confused':0, 'laugh':0},
      }
    
      for (var key in results){
        if (key === 'total') break;
        for (var key2 in results[key]){
          results.total[key2] += results[key][key2];
        }
      }

      console.log(results);

      // gross
      setRows(
        [createData('TOTAL', results.total.heart, results.total.hooray, results.total.thumbsup,
          results.total.thumbsdown, results.total.rockets, results.total.eyes, results.total.confused, 
          results.total.laugh),
        createData('PRs', results.prs.heart, results.prs.hooray, results.prs.thumbsup,
          results.prs.thumbsdown, results.prs.rockets, results.prs.eyes, results.prs.confused, 
          results.prs.laugh),
        createData('Issues', results.issues.heart, results.issues.hooray, results.issues.thumbsup,
          results.issues.thumbsdown, results.issues.rockets, results.issues.eyes, results.issues.confused, 
          results.issues.laugh),
        createData('Comments', results.comments.heart, results.comments.hooray, results.comments.thumbsup,
          results.comments.thumbsdown, results.comments.rockets, results.comments.eyes, results.comments.confused, 
          results.comments.laugh),
        ]);
    },
    error => {
      console.error(`Error getting reaction stats: ${error}`);
    });

    }, [page]);

  return (
    <div text-align="center">
      <center>
    Username: <Input  id="username"></Input> <Button variant="contained" id="thebuttonyo" onClick={loadMoreData}>Go</Button>
    <br>
    </br>
    <br>
    </br>
    <div>
    {page === 1 ? <div></div>: <TableContainer >
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right"><span aria-label='heart' role='img'>♥️</span></TableCell>
            <TableCell align="right"><span aria-label='hooray' role='img'>🎉</span></TableCell>
            <TableCell align="right"><span aria-label='thumbsup' role='img'>👍</span></TableCell>
            <TableCell align="right"><span aria-label='thumbsdown' role='img'>👎</span></TableCell>
            <TableCell align="right"><span aria-label='rocket' role='img'>🚀</span></TableCell>
            <TableCell align="right"><span aria-label='eyes' role='img'>👀</span></TableCell>
            <TableCell align="right"><span aria-label='confused' role='img'>😕</span></TableCell>
            <TableCell align="right"><span aria-label='laugh' role='img'>😄</span></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.heart}</TableCell>
              <TableCell align="right">{row.hooray}</TableCell>
              <TableCell align="right">{row.thumbsup}</TableCell>
              <TableCell align="right">{row.thumbsdown}</TableCell>
              <TableCell align="right">{row.rocket}</TableCell>
              <TableCell align="right">{row.eyes}</TableCell>
              <TableCell align="right">{row.confused}</TableCell>
              <TableCell align="right">{row.laugh}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    }
    </div>
  </center>
    </div>
  );
}
