module.exports = (() => {
  const port = process.env.PORT || 3000,
    dbUrl = 'mongodb://127.0.0.1:27017',
    dbName = 'todos';
  return {
    port,
    dbUrl,
    dbName,
  };
})();