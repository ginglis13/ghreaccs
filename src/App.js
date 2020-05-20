import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
//import buildQuery from './query'
import fetchResults from './utils/fetchResults';
import About from './components/About';
import Footer from './components/Footer';
import SimpleTable from './components/Table';

import './App.css';


function App() {
  return (
    <div>
    <Router>
      <div>
        <nav className="primary-aside">
          <ul>
            <li>
              <NavLink to="/">GHReaccs</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <a href="https://github.com/ginglis13/ghreaccs">Code</a>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
          <div className="App">
            <h2><span role="img" aria-label="GitHub Reaccs">🚀GitHub Reaccs🚀</span></h2>
            <h4>Find out how people have been reacting to your PRs, Issues, and Comments on GitHub!*</h4>
              {/*oliviertassinari*/}
              {/*<p>note: some requests will take a few seconds depending on the total number of reactions...</p>*/}
              <SimpleTable data={fetchResults}/>
          </div>
          </Route>
        </Switch>
      </div>
    </Router>
        <Footer />
        </div>
  );
}

export default App;
