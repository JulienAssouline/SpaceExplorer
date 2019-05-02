const authenticate = require('../authenticate')
const axios = require("axios")


module.exports = {
  User: {
    async launches(parent, input, {app, req, postgres}) {
        let user_id = parent.id

        const getLaunches = {
          text: "SELECT flight_number FROM space_explorer.bookings WHERE user_id = $1",
          values: [user_id]
        }

        const results = await postgres.query(getLaunches)

        const array_flights = results.rows.map(d => {
            return axios.get("https://api.spacexdata.com/v2/launches?flight_number="+d.flight_number)
          }
        )

       const allResults = await Promise.all(array_flights)

        return allResults.map(d => d.data[0])

    }
  },
}
