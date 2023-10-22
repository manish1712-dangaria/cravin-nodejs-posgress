require('dotenv').config();
module.exports = {
  development: {
    username: process.env.DB_USER || 'your_dev_username',
    password: process.env.DB_PASSWORD || 'your_dev_password',
    database: process.env.DB_NAME || 'your_dev_database',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres', // Use PostgreSQL
  },
  test: {
    username: process.env.DB_USER || 'your_test_username',
    password: process.env.DB_PASSWORD || 'your_test_password',
    database: process.env.DB_NAME || 'your_test_database',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres', // Use PostgreSQL
  },
  production: {
    use_env_variable: 'DATABASE_URL', // Heroku-style environment variable
    dialect: 'postgres', // Use PostgreSQL
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false, // Set to false if you're using self-signed certificates
      },
    },
  },
};
