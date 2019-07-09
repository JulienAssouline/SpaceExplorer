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

        const oneLaunch = await axios.get("https://api.spacexdata.com/v2/launches?flight_number="+flight_number+"&filter=flight_number,mission_name,launch_year,launch_date_utc,links,launch_site,rocket,details")

      const oneLaunchData = oneLaunch.data[0]

      oneLaunchData.mission_patch_small = oneLaunchData.links.mission_patch_small
      oneLaunchData.video_link = oneLaunchData.links.video_link
      oneLaunchData.site_name = oneLaunchData.launch_site.site_name
      oneLaunchData.rocket_name = oneLaunchData.rocket.rocket_name
      oneLaunchData.rocket_type = oneLaunchData.rocket.rocket_type

       return oneLaunchData
    },
    async getUserBookings(parent, input, { req, app, postgres }) {
      const userId = authenticate(app, req);

      const user_booking = {
          text: "SELECT * FROM space_explorer.bookings WHERE user_id = $1",
          values: [userId]
        }

        const result = await postgres.query(user_booking)

        let promises = [];

        result.rows.forEach((d,i) => {
          let urls = "https://api.spacexdata.com/v2/launches?flight_number="+d.flight_number+"&filter=flight_number,mission_name,launch_year,launch_date_utc,links,details"
          promises.push(axios.get(urls))
        })

       const allPromises = await Promise.all(promises)

       const results = allPromises.map((values) => { return values.data[0] })

       results.forEach(d => {
           d.mission_patch_small = d.links.mission_patch_small
           d.site_name = d.launch_site.site_name
       })

       return results

    },
  },
}
