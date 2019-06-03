const authenticate = require('../authenticate')
const axios = require("axios")

module.exports = {
  Query: {
    async getUser(parent, input, { req, app, postgres }){
        const userId = authenticate(app, req);

          const user = {
          text: "SELECT * FROM space_explorer.users WHERE id = $1",
          values: [userId]
        }

        const userGotten = await postgres.query(user)

        return userGotten.rows[0]
    },
    async getAllLaunches(parent, input, { req, app, postgres }) {
       const allLaunches = await axios.get("https://api.spacexdata.com/v2/launches?limit=50&filter=flight_number,mission_name,launch_year,launch_date_utc,links,details")
       // console.log(allLaunches.data[0].links.mission_patch_small)\


       allLaunches.data.forEach(d => {
           d.mission_patch_small = d.links.mission_patch_small
       })

       return allLaunches.data

    },

    async getLaunch(parent, input, { req, app, postgres }) {

        let flight_number = input.flight_number

        const oneLaunch = await axios.get("https://api.spacexdata.com/v2/launches?flight_number="+flight_number+"&filter=flight_number,mission_name,launch_year,launch_date_utc,details")

        console.log(oneLaunch.data)

       return oneLaunch.data[0]
    }
  },
}
