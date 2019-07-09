import React from "react"
import NavBar from "./NavBar"
import { useQuery } from 'react-apollo-hooks';
import {GET_MY_BOOKINGS} from "../gql/queries"



function Home(props) {

  const {data, error, loading} = useQuery(GET_MY_BOOKINGS)

  if (loading) {
      return <div>Loading...</div>;
    };
    if (error) {
      return <div>Error! {error.message}</div>;
    };

  return (
    <div className = "get-started">
    <NavBar data = {props} />
    <h1> Home </h1>
    <div className = "user-bookings-page">
      {
        data.getUserBookings.map((d,i) =>
          <div key = {i} className = "form-user-bookings">
            <p className = "user-bookings-text"> {d.flight_number} </p>
            <p className = "user-bookings-text"> {d.launch_year} </p>
            <p className = "user-bookings-text"> {d.mission_name} </p>
            <p className = "user-bookings-text"> {d.details} </p>
          </div>
          )
      }
      </div>
    </div>
  )
}

export default Home