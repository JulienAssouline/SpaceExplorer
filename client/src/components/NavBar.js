import React  from "react"
import Button from '@material-ui/core/Button'

function NavBar(props){

  const data = props.data


  let login_class;
  let signup_class;

  if (data.location) {
      login_class = data.location.pathname === "/login" ? "active" : "inactive";
      signup_class = data.location.pathname === "/signup" ? "active" : "inactive";
  }
  else {
      signup_class = "inactive";
      login_class = "inactive";
  }



  return (
    <div className = "nav-bar">
        <h3
          className = "space-explorer-text"
          onClick = {() => data.history.push("/landing-page")}> Space Explorer </h3>
        <h3
          className = "my-trips"
          onClick = {() => data.history.push("/home")}> My Trips </h3>
      <div className = "form-button-container">
        <Button
          variant="contained"
          color="primary"
          className={`login button ${login_class}`}
          onClick = {() => data.history.push("/login")}
          margin = "normal"> Login </Button>
        <Button
          variant="contained"
          color="primary"
          className={`signup button ${signup_class}`}
          onClick = {() => data.history.push("/signup")}
          margin = "normal"> Sign Up </Button>

      </div>
      </div>
    )
}

export default NavBar