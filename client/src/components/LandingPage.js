import React from "react"
import { Query } from "react-apollo"
import gql from "graphql-tag";
import TextField from '@material-ui/core/TextField'

import ACTIONS from "../module/actions"
import { connect } from "react-redux"


  const mapStateToProps = state => ({
    userEmail: state.userEmail,
    username: state.username
  })

  const mapDispatchToProps = dispatch => ({
    textInputChange: data => dispatch(ACTIONS.textInputChange(data))
  })


function LandingPage(props) {

  console.log("checking signup props", props)

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
            return (
              <div>
{
  <TextField
                          id= "email"
                          label= {"Search"}
                          value = {props.userEmail}
                          className = "search app"
                          onChange={(e) => props.textInputChange(e.target.value)}
                          // onBlur = {handleBlur}
                          type = "text"
                          margin="normal"
                          variant="outlined"
                          />
                        }

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

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)