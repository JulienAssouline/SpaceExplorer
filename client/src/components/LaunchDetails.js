import React from "react"
import Button from '@material-ui/core/Button'
import { useQuery, useMutation } from 'react-apollo-hooks';
import {GET_USER, GET_LAUNCH} from "../gql/queries"
import {BOOKINGS_MUTATION} from "../gql/mutations"
import NavBar from "./NavBar"


function LaunchDetails(props) {
  let flight_number = props.match.params.flightnumber
  flight_number = +flight_number

  const {data: user_data} = useQuery(GET_USER);
  const {data: launch_data, error, loading} = useQuery(GET_LAUNCH, {variables: { flight_number: flight_number } });

  const makeBooking = useMutation(BOOKINGS_MUTATION);

   if (loading) {
      return <div className = "get-started">Loading...</div>;
    };
    if (error) {
      return <div>Error! {error.message}</div>;
    };

  return (
    <div className="get-started">
    <NavBar data = {props} />
      <div className = "form-details-container">
        <div className = "form-details">
          <div className = "image-title-container">
            <h3 className = "details-headers"> {launch_data.getLaunch.mission_name} </h3>
            <img className ="image-details" src={launch_data.getLaunch.mission_patch_small} alt = "logo" width="10%" height="10%"/>
            <h3 className = "details-headers"> {launch_data.getLaunch.launch_year} </h3>
          </div>
          <div className = "launch-details-container">
            <h2 className = "mission-headers"> {`${launch_data.getLaunch.rocket_name} Rocket`} </h2>
            <p className = "rocket-type-text"> {`Rocket type: ${launch_data.getLaunch.rocket_type}`} </p>
            <p className = "site-name-text"> {`Location: ${launch_data.getLaunch.site_name}`} </p>
            <p className = "details-text"> {`Details: ${launch_data.getLaunch.details}`} </p>
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
      </div>
    </div>
  )
}

export default LaunchDetails