const {fork} = require('child_process');

const random = (req, res) => {
    const {cant} = req.query;
    const childProcess = fork("./src/utils/random.js");
    childProcess.send({"number": cant})
    childProcess.on("message", result => res.status(200).json({"Números": result}))
};

module.exports = {random}