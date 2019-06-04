import gql from "graphql-tag";

export const BOOKINGS_MUTATION = gql`
  mutation bookLaunchMutation($flight_number: Int, $amount: Int) {
    Bookings(flight_number: $flight_number, amount: $amount) {
      message
    }
  }
`
export const SIGN_UP_MUTATION = gql`
  mutation signUpMutation($email: String!, $fullname: String!, $username: String!, $password: String!, $country: String!) {
     signUp(email: $email, fullname: $fullname username: $username, password: $password, country: $country) {
      message
     }
   }
`

export const LOG_IN_MUTATION = gql`
  mutation loginMutation($email: String!, $password: String!) {
    logIn(email: $email, password: $password) {
      message
    }
  }
`
