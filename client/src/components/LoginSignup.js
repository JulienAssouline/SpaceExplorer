import React  from "react"
import Button from '@material-ui/core/Button'

function LoginSignup(props){
  console.log(props)
  // let toggle_button_class = props.data.location.pathname === "/login" ? "active.toggle.button" : "inactive.toggle.button";
  // let toggle_button_class = props.data.location.pathname === "/login" ? "active.toggle.button" : "inactive.toggle.button";
  let login_class = props.data.location.pathname === "/login" ? "active" : "inactive";
  let signup_class = props.data.location.pathname === "/signup" ? "active" : "inactive";
  return (
      <div className = "form-button-container" >
        <Button
          variant="contained"
          color="primary"
          className={`login button ${login_class}`}
          onClick = {() => props.data.history.push("/login")}
          margin = "normal"> Login </Button>
        <Button
          variant="contained"
          color="primary"
          className={`signup button ${signup_class}`}
          onClick = {() => props.data.history.push("/signup")}
          margin = "normal"> Sign Up </Button>

      </div>
    )
}

export default LoginSignup