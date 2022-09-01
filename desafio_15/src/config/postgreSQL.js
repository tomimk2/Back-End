const options = {
    client: process.env.DATABASE_CLIENT || "pg",
    connection: process.env.DATABASE_URL
};

module.exports = { options }