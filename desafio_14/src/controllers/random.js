const {log4js} = require('../middlewares/logger');
const logger = log4js.getLogger();

const random = (req, res) => {
    logger.info(`Ruta: /api/randoms${req.url} - Método: ${req.method}`);

    const {cant} = req.query;

    let numeros = [];
    
    function createObj(number) {
        let numObj = {};
        
        for (let i = 0; i < number; i++) {
            let num = Math.floor(Math.random() * 1000) + 1;
            numeros.push(num);
        };
    
        for (let n of numeros) {
            if (numObj[n]) {
                numObj[n] += 1
            } else {
                numObj[n] = 1
            };
        };
        return numObj
    };

    try {
        const createNums = () => {
            if (Number(cant) > 0) {
                return createObj(cant);
            } else {
                return createObj(100000000);
            };  
        }

        res.status(200).json({"Números": createNums()})
    } catch (error) {
        res.status(500).send(`
            <h1>Ocurrió un error:</h1>
            <h2>${error}</h2>
        `);
    };    
};

module.exports = {random}