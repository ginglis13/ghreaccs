import React from 'react';

/*class Footer extends React.Component {
    render() {
      return (
      )
    }
  }

export default Footer;
*/
var style = {
  backgroundColor: "#282c34",
  color: "white",
  borderTop: "1px solid #E7E7E7",
  textAlign: "center",
  position: "fixed",
  left: "0",
  bottom: "0",
  width: "100%",
}

var phantom = {
display: 'block',
width: '100%',
}

function Footer({ children }) {
  return (
      <div>
          <div style={phantom} />
          <div style={style}>
                * Due to rate limitations 
                from the <a href='https://developer.github.com/v4/guides/resource-limitations/'>GitHub API V4</a>, 
                only the
                last 100 Comments, 100 Issues, and 100 PRs can be found. 
                <br></br>
                On each of those, only the last 100 reactions can be found. For more info, see <a href='/about'>About</a>.
                <p>
                © <a href="https://github.com/ginglis13"> Gavin Inglis</a>, 2020
                </p>
              { children }
          </div>
      </div>
  )
}

export default Footer