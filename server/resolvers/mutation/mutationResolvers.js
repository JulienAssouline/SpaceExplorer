const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const saltRounds = 12
const crypto = require('crypto')
const Promise = require('bluebird')
const authenticate = require('../authenticate')

/* For Emergencies only */
const emergencysignup = require('./signup')  /* <-- Use Me for emergencies */
/* For Emergencies only */


module.exports = {
  Mutation: {
    async signUp(parent, input, { req, app, postgres }) {
      let email = input.email.toLowerCase();
      let hashedpassword = await bcrypt.hash(input.password, saltRounds);
      let fullname = input.fullname
      let username = input.username
      let status = "active"
      let country = input.country

      console.log(input)

      const newUserInsert = {
        text: "INSERT INTO space_explorer.users (email, password, fullname, username, status, country) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        values: [email, hashedpassword, fullname, username, status, country]
      }

     let result = await postgres.query(newUserInsert)

     return {
      message: "yes"
     }

    },

    async logIn(parent, input, { req, app, postgres }) {

      let loginEmail = input.email
      let password = input.password

      const userPassword = {
           text: "SELECT id, email, date_created, password FROM space_explorer.users WHERE email = $1",
           values: [loginEmail]
         }
        const loggedIn = await postgres.query(userPassword)

        console.log(loggedIn.rows)

        return {
          message: "logged in"
        }

      },

      async Bookings(parent, input, { req, app, postgres }) {

        const user_id = authenticate(app, req)
        let amount = input.amount

       ////// BONUS:

       //  const getUser = {
       //    text: "SELECT id, fullname, email, username, status, country FROM space_explorer.users WHERE id = $1",
       //    values: [user_id]
       //  }

       // const user = await postgres.query(getUser)



       // console.log(user.rows[0])

       const insertUser = {
        text: "INSERT INTO space_explorer.bookings (user_id, amount) VALUES ($1, $2) RETURNING *",
        values: [user_id, amount]
       }

        const result = await postgres.query(insertUser)

       return {
        message: "booked user"
       }

      }

  },
}



