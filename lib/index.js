const { nodeEnv } = require('./util');

console.log(`Running in ${nodeEnv} mode...`);

const pg = require('pg');
const pgConfig = require('../config/pg')[nodeEnv];
const app = require('express')();

const pgPool = new pg.Pool(pgConfig);

const ncSchema = require('../schema');
// helper library to read GraphQL query, execute against schema, and respond with result
const graphqlHTTP = require('express-graphql');

app.use('/graphql', graphqlHTTP({
  schema: ncSchema,
  graphiql: true,
  context: { pgPool },
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
