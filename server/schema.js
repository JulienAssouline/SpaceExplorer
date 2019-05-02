const { gql } = require('apollo-server-express')

module.exports = gql`

  scalar Date


  type Query {
    getUser: User,
    getLaunch(flight_number: Int): Launch,
    getAllLaunches: [Launch!]
  }

  type User {
    id: Int,
    email: String,
    fullname: String,
    username: String,
    status: String,
    country: String,
    launches: [Launch]!,
  }

  type Launch {
    flight_number: Int,
    mission_name: String,
    launch_year: Int,
    launch_date_utc: Date,

  }

  type Mutation {
    signUp(email: String!, password: String!, fullname: String, username: String, status: String, country: String, date_created: Date): SignupResponse!
    logIn(email: String!, password: String!): LoginResponse!
    Bookings(flight_number: Int!, amount: Int): BookingsResponse!
  }

  type SignupResponse {
    message: String
  }

  type LoginResponse {
    message: String
  }

  type BookingsResponse {
    message: String
  }

`

