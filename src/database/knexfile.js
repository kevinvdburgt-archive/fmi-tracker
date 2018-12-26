require('dotenv').config();

module.exports = {
  client: 'mysql',
  connection: {
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_HOSTNAME,
    port: process.env.MYSQL_PORT,
    encoding: 'utf8',
    charset: 'utf8',
  },
  dialectOptions: {
    charset: 'utf8',
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'migrations',
    directory: __dirname + '/migrations/',
  },
  debug: false,
};
