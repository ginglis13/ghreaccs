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
  //backgroundColor: "#F8F8F8",
  backgroundColor: "#282c34",
  color: "white",
  borderTop: "1px solid #E7E7E7",
  textAlign: "center",
  position: "fixed",
  fontSize: ".7em",
  height: "50px",
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
                For more info, see <a href='/about'>About</a> for rate limitations.
                <p>
                © <a href="https://github.com/ginglis13"> Gavin Inglis</a>, 2020
                </p>
              { children }
          </div>
      </div>
  )
}

export default Footer