import React from "react"
import { Query } from "react-apollo"
import gql from "graphql-tag";
import TextField from '@material-ui/core/TextField'



// import { timeFormat } from "d3-time-format"

// let formatTime = timeFormat("%Y-%m-%d")


function LandingPage(props) {

  return (
    <div className = "landing-page">
    <h1> hello</h1>
    <Query query = {gql`
        query {
           getAllLaunches{
             flight_number
             mission_name
             launch_year
             launch_date_utc
             mission_patch_small
           }
         }
      `}>
      {
         ({loading, errors, data}) => {
          if(loading) return <div> Loading</div>
          if(errors) return <div> Errors {JSON.stringify(errors)} </div>
          console.log(data)
            return (
              <div>
                <TextField
                          id= "email"
                          label= {"Search"}
                          value = {"value"}
                          className = "search app"
                          // onChange={handleChange}
                          // onBlur = {handleBlur}
                          type = "text"
                          margin="normal"
                          />

               {
                data.getAllLaunches.map((d,i) =>
                                 <div onClick = {() => {
                                   props.history.push("/launch-details"+d.flight_number)
                                 }}
                                 key = {i}
                                 className = "all-launches"
                                 >
                                 <img src={d.mission_patch_small} alt = "logo" width="100%" height="100%"/>
                                 </div>
                               )
             }
                </div>
              )

         }
      }

    </Query>
    </div>
  )
}

export default LandingPage