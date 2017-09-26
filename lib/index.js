const { nodeEnv } = require('./util');

console.log(`Running in ${nodeEnv} mode...`);

const pg = require('pg');
const pgConfig = require('../config/pg')[nodeEnv];
const app = require('express')();

const pgPool = new pg.Pool(pgConfig);

const ncSchema = require('../schema');
// helper library to read GraphQL query, execute against schema, and respond with result
const graphqlHTTP = require('express-graphql');

const { MongoClient } = require('mongodb');
const assert = require('assert');
const mConfig = require('../config/mongo')[nodeEnv];

MongoClient.connect(mConfig.url, (err, mPool) => {
  // assert that we don't have an error or raise one if we do
  assert.equal(err, null);

  app.use('/graphql', graphqlHTTP({
    schema: ncSchema,
    graphiql: true,
    context: { pgPool, mPool },
  }));

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
  });
});
