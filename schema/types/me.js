const {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'MeType',
  fields: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    fullName: {
      type: GraphQLString,
      resolve: obj => `${obj.firstName} ${obj.lastName}`,
    },
    createdAt: { type: GraphQLString },
    id: { type: GraphQLID },
  },
});
