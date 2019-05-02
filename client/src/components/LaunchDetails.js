import React from "react"
import { Query, Mutation } from "react-apollo"
import gql from "graphql-tag";
import Button from '@material-ui/core/Button'

const BOOKINGS_MUTATION = gql`
  mutation bookLaunchMutation($flight_number: Int, $amount: Int) {
    Bookings(flight_number: $flight_number, amount: $amount) {
      message
    }
  }
`

let loggedin;

function LaunchDetails(props) {
  let flight_number = props.match.params.flightnumber

  return (
    <div>
    <h1> LaunchDetails </h1>
    <Mutation
      mutation = {BOOKINGS_MUTATION}
      onError = {(error) => {
        console.log(error)
      }}
      onCompleted = {(data) => {
        console.log("Data: ", data)
        alert("booked!")
      }}
    >
    {
      (Bookings, {dataMutation}) => (
      <div>
      <Query query = {gql`
            query {
               getUser {
                 id
                 email
                 fullname
                 username
                 status
                 country
               }
             }
          `}>
          {
            ({loading, errors, data}) => {
              if(loading) return <div> Loading</div>
              if(errors) return <div> Errors {JSON.stringify(errors)} </div>

                loggedin = data
              console.log(data)

              return (
                null
                )
            }
          }
        </Query>
        <Query query = {gql`
          query {
            getLaunch(flight_number: ${flight_number}) {
              flight_number
              mission_name
              launch_year
              }
            }
          `}
        >
        {
          ({loading, errors, data}) =>  {
            if(loading) return <div> Loading</div>
            if(errors) return <div> Errors {JSON.stringify(errors)} </div>
            console.log(data.getLaunch)
            return (
                <div>
                  <p> {data.getLaunch.flight_number} </p>
                  <p> {data.getLaunch.launch_year} </p>
                  <p> {data.getLaunch.mission_name} </p>
                  <Button
                     onClick = {() => {
                      Bookings({variables: { flight_number: data.getLaunch.flight_number} })
                      if (loggedin === undefined) props.history.push("/login")
                      }
                    }
                     variant="contained"
                     type="submit"
                     color="primary"
                     className = "buy item button"> Book Trip </Button>
                </div>
              )
          }
        }
        </Query>
        </div>
        )
      }
    </Mutation>
    </div>


  )
}

export default LaunchDetails