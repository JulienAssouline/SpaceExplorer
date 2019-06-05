import React from "react"
import NavBar from "./NavBar"


function Home(props) {
  return (
    <div className = "get-started">
    <NavBar data = {props} />
    <h1> Home </h1>
    </div>
  )
}

export default Home