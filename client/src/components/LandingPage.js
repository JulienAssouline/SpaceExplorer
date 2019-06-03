import React from "react"
import gql from "graphql-tag";
import TextField from '@material-ui/core/TextField'
import { useQuery } from 'react-apollo-hooks';


import ACTIONS from "../module/actions"
import { connect } from "react-redux"


  const mapStateToProps = state => ({
    userEmail: state.userEmail,
    username: state.username
  })

  const mapDispatchToProps = dispatch => ({
    textInputChange: data => dispatch(ACTIONS.textInputChange(data))
  })

  const GET_ALL_LAUNCHES = gql`
        query {
           getAllLaunches{
             flight_number
             mission_name
             launch_year
             launch_date_utc
             mission_patch_small
             details
           }
         }`;



function LandingPage(props) {

  console.log("checking signup props", props)

  const {data, error, loading} = useQuery(GET_ALL_LAUNCHES)

  if (loading) {
      return <div>Loading...</div>;
    };
    if (error) {
      return <div>Error! {error.message}</div>;
    };

  return (
    <div className = "landing-page">
      <div>
        <h1 className = "header"> View launch details </h1>
         {
          data.getAllLaunches.map((d,i) =>
               <div onClick = {() => {
                 props.history.push("/launch-details"+d.flight_number)
               }}
               key = {i}
               className = "all-launches"
               >
               <img className ="image" src={d.mission_patch_small} alt = "logo" width="10%" height="10%"/>
                   <h2 className = "mission_name"> {d.mission_name} </h2>
               </div>
             )
          }
        </div>
      </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)