const path = require('path');

const home = (req, res) => {
    res.status(200).sendFile(path.join(process.cwd(), "/public/main.html"));
};

module.exports = {home}