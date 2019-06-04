import gql from "graphql-tag";

export const GET_USER = gql`
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
          `

 export const GET_LAUNCH = gql`
          query getLaunchByFlightNumber($flight_number: Int) {
            getLaunch(flight_number: $flight_number) {
              flight_number
              mission_name
              launch_year
              launch_date_utc
              mission_patch_small
              details
              }
            }
          `

  export const GET_ALL_LAUNCHES = gql`
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