const options = {
    client: process.env.MARIADB_CLIENT,
    connection: {
        host: process.env.MARIADB_HOST,
        user: process.env.MARIADB_USER,
        pass: process.env.MARIADB_PASS,
        database: process.env.MARIADB_DATABASE
    }
};

module.exports = { options }