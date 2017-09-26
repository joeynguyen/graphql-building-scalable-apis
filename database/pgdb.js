const humps = require('humps');

module.exports = pgPool => (
  {
    getUser(apiKey) {
      return pgPool.query(`
        select * from users
        where api_key = $1
      `, [apiKey]).then(res => humps.camelizeKeys(res.rows[0]));
    },
    getContests(user) {
      return pgPool.query(`
        select * from contests
        where created_by = $1
      `, [user.id]).then(res => humps.camelizeKeys(res.rows));
    },
  }
);
