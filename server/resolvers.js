const queryResolvers = require('./resolvers/query/queryResolvers')
const mutationResolvers = require('./resolvers/mutation/mutationResolvers')
const userResolvers = require('./resolvers/User/userResolvers')



module.exports = () => {
  return {
    ...queryResolvers,
    ...mutationResolvers,
    ...userResolvers,
  }
}
