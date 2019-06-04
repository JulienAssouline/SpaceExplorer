import React from "react"
import Button from '@material-ui/core/Button'
import { useQuery, useMutation } from 'react-apollo-hooks';
import {GET_USER, GET_LAUNCH} from "../gql/queries"
import {BOOKINGS_MUTATION} from "../gql/mutations"

function LaunchDetails(props) {
  let flight_number = props.match.params.flightnumber
  flight_number = +flight_number

  const {data: user_data} = useQuery(GET_USER);
  const {data: launch_data, error, loading} = useQuery(GET_LAUNCH, {variables: { flight_number: flight_number } });

  const makeBooking = useMutation(BOOKINGS_MUTATION);

   if (loading) {
      return <div>Loading...</div>;
    };
    if (error) {
      return <div>Error! {error.message}</div>;
    };

  return (
    <div className="get-started">
    <h1> LaunchDetails </h1>
      <div className = "form">
        <p> {launch_data.getLaunch.flight_number} </p>
        <p> {launch_data.getLaunch.launch_year} </p>
        <p> {launch_data.getLaunch.mission_name} </p>
        <p className = "details"> {launch_data.getLaunch.details} </p>
        <Button
           onClick = {() => {
            makeBooking({ variables: {flight_number: launch_data.getLaunch.flight_number}})
           if (user_data === undefined) props.history.push("/login")
            }
          }
           variant="contained"
           type="submit"
           color="primary"
           className = "buy item button"> Book Trip </Button>
      </div>
    </div>
  )
}

export default LaunchDetails