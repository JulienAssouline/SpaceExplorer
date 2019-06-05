import React from "react"
import { useQuery } from 'react-apollo-hooks';
// import ACTIONS from "../module/actions"
// import { connect } from "react-redux"
import {GET_ALL_LAUNCHES} from "../gql/queries"
import LoginSignup from "./LoginSignup"


  // const mapStateToProps = state => ({
  //   userEmail: state.userEmail,
  //   username: state.username
  // })

  // const mapDispatchToProps = dispatch => ({
  //   textInputChange: data => dispatch(ACTIONS.textInputChange(data))
  // })

function LandingPage(props) {

  const {data, error, loading} = useQuery(GET_ALL_LAUNCHES)

  if (loading) {
      return <div>Loading...</div>;
    };
    if (error) {
      return <div>Error! {error.message}</div>;
    };

  return (
    <div className = "landing-page">
    <LoginSignup data = {props}  />
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

// export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)
export default LandingPage