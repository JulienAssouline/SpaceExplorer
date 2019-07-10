import React from "react"
import NavBar from "./NavBar"
import { useQuery } from 'react-apollo-hooks';
import {GET_MY_BOOKINGS} from "../gql/queries"



function Home(props) {

  const {data, error, loading} = useQuery(GET_MY_BOOKINGS)

  console.log(data)

  if (loading) {
      return <div>Loading...</div>;
    };
    if (error) {
      return <div>Error! {error.message}</div>;
    };



  return (
    <div className = "get-started">
    <NavBar data = {props} />
    <div className = "user-bookings-page">
      {
        data.getUserBookings.map((d,i) =>
          <div className = "home-form-details">
            <div className = "image-title-container">
              <h3 className = "details-headers"> {d.mission_name} </h3>
              <img className ="image-details" src={d.mission_patch_small} alt = "logo" width="10%" height="10%"/>
              <h3 className = "details-headers"> {d.launch_year} </h3>
            </div>
            <div className = "launch-details-container">
              <h2 className = "mission-headers"> {`${d.rocket_name} Rocket`} </h2>
              <p className = "rocket-type-text"> {`Rocket type: ${d.rocket_type}`} </p>
              <p className = "site-name-text"> {`Location: ${d.site_name}`} </p>
              <p className = "details-text"> {`Details: ${d.details}`} </p>
            </div>
          </div>
          )
      }
      </div>
    </div>
  )
}

export default Home