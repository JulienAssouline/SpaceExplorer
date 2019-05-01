const { gql } = require('apollo-server-express')

module.exports = gql`

  scalar Date

  type User {
    id: ID!,
    fullname: String
  }
  type Query {
    getAllUsers: [User],
    user(id : ID): User,
    test: String!
  }

  type Mutation {
    signUp(email: String!, password: String!, fullname: String, username: String, status: String, country: String, date_created: Date): SignupResponse!
    logIn(email: String!, password: String!): LoginResponse!
    Bookings(amount: Int): BookingsResponse!
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

