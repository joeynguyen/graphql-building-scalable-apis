module.exports = mPool => (
  {
    getCounts(user, countsField) {
      return mPool.collection('users')
        .findOne({ userId: user.id })
        .then(userCounts => userCounts[countsField]);
    },
  }
);
