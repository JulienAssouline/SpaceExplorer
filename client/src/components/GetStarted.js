import React from "react"
import Button from '@material-ui/core/Button'
import { ReactComponent as Logo } from './project.svg';


function GetStarted(props) {
  return (
  <div className = "first-wrapper">
  <div className="wrapper">
    <div className = "form-started">
      <Logo />
      <h1 className = "header"> Get Ready For Your Next Great Journey With SpaceX </h1>
      <Button
        onClick = {() => props.history.push("/landing-page")}
         variant="contained"
         type="submit"
         color="primary"
         className = "buy item button"> Get Started </Button>
    </div>
   </div>
   </div>
  )
}

export default GetStarted