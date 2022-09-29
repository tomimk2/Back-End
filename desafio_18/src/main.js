const { app } = require('./server');
const PORT = parseInt(process.argv[2]) || process.env.PORT;


app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
});