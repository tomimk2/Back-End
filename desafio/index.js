const fs = require('fs');

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName;
        this.arr = [];
    }
 
    async generateId() {
        try {
            this.arr = await this.getAll() || [];
            
            let maxId = this.arr.length;
        
            this.arr.forEach(el => {
                el.id > maxId ? maxId = el.id : maxId
            })

            return maxId + 1;
        } catch (err) {
            console.log(err);
        }
    }

    async save(obj) {
        try {
            const readFile = await this.getAll();
        
            if (!readFile) {
                obj.id = await this.generateId();
                
                this.arr.push(obj);
                
                fs.promises.writeFile(this.fileName, JSON.stringify(this.arr, null, 2));
                return obj.id;
            }
            this.arr = readFile;
            
            obj.id = await this.generateId();
    
            this.arr.push(obj);
            
            fs.promises.writeFile(this.fileName, JSON.stringify(this.arr, null, 2));
            return obj.id;
        } catch (err) {
            console.log(err);
        }
    }
    
    async getById(id) {
        try {
            this.arr = await this.getAll();
            
            const obj = this.arr.find(el => el.id === Number(id));
            
            return obj ? obj : null;
        } catch (err) {
            console.log(err);
        }
    }
   
    async getAll() {
        try {
            const arr = await fs.promises.readFile(this.fileName, 'utf-8');
            
            const arrParsed = JSON.parse(arr);
            
            return arrParsed;
        } catch (err) {
            console.log(err);
        }
    }
    
    async deleteById(id) {
        try {
            this.arr = await this.getAll();
            
            this.arr = this.arr.filter(el => el.id != Number(id));
            
            fs.promises.writeFile(this.fileName, JSON.stringify(this.arr, null, 2));
        } catch (err) {
            console.log(err);
        }
    }
    async deleteAll() {
        try {
            this.arr = await this.getAll();
            
            this.arr = [];
            fs.promises.writeFile(this.fileName, JSON.stringify(this.arr, null, 2));
            
        } catch (err) {
            console.log(err);
        }
    }
}
module.exports = Contenedor;