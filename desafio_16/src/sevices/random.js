function createObj(number) {
    let numeros = [];
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

const createNums = (cant) => {
    if (Number(cant) > 0) {
        return createObj(cant);
    } else {
        return createObj(100000000);
    };  
};

module.exports = {
    createNums
}
