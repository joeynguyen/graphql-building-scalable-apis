// Import type helpers from graphql-js
const {
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const pgdb = require('../database/pgdb');
const MeType = require('./types/me');

// The root query type is where in the data graph
// we can start asking questions
const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    me: {
      type: MeType,
      description: 'The current user identified by an API key',
      args: {
        key: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (obj, args, ctx) => (
        // Read user info from database
        // using args.key as the API key
        pgdb(ctx.pgPool).getUser(args.key)
      ),
    },
    hello: {
      type: GraphQLString,
      description: 'The *mandatory* hello world example, GraphQL style',
      resolve: () => 'world',
    },
  },
});

// nc == 'name-contests'
const ncSchema = new GraphQLSchema({
  query: RootQueryType,
  // mutation: ...
});

module.exports = ncSchema;
