import React from "react"
import LoginSignup from "./LoginSignup"


function Home(props) {
  return (
    <div className = "get-started">
    <LoginSignup data = {props} />
    <h1> Home </h1>
    </div>
  )
}

export default Home