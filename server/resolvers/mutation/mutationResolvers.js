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

      try {
        let loginEmail = input.email
        let password = input.password

        const userPassword = {
             text: "SELECT id, email, date_created, password FROM space_explorer.users WHERE email = $1",
             values: [loginEmail]
           }
          const loggedIn = await postgres.query(userPassword)

          console.log(loggedIn.rows)

          let myjwttoken = await jwt.sign({
            email: loggedIn.rows[0].email,
            id: loggedIn.rows[0].id,
            exp: Math.floor(Date.now() / 1000) + (1000*1000),

          }, "secret");
          // console.log("my jwt", myjwttoken)

          req.res.cookie("bazaar_app", myjwttoken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
          })

          console.log(loggedIn.rows)

          if (loggedIn.rows.length === 0) throw "email or password is incorrect"


          return {
            message: "logged in"
          }
      }
      catch(error) {
        console.log(error)
        throw "email or password is incorrect"
      }


      },

      async Bookings(parent, input, { req, app, postgres }) {

        const user_id = authenticate(app, req)
        let amount = input.amount
        let flight_number = input.flight_number
        let status = "booked"

       ////// BONUS:

       //  const getUser = {
       //    text: "SELECT id, fullname, email, username, status, country FROM space_explorer.users WHERE id = $1",
       //    values: [user_id]
       //  }

       // const user = await postgres.query(getUser)



       // console.log(user.rows[0])

       const insertUser = {
        text: "INSERT INTO space_explorer.bookings (user_id, amount, flight_number, status) VALUES ($1, $2, $3, $4) RETURNING *",
        values: [user_id, amount, flight_number, status]
       }

        const result = await postgres.query(insertUser)

       return {
        message: "booked user"
       }

      }

  },
}



