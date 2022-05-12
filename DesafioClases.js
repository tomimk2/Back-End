class Usuario {
    constructor (name, lastName){
        this.name = name;
        this.lastName = lastName;
        this.books = [];
        this.pets = [] ;
    }

    getFullName = () => `El nombre del Usuario es ${this.name} ${this.lastName}`;

    addPet = (pet) => this.pets.push(pet);
    
    countPets = () => this.pets.length ;

    addBook = (book) =>this.books.push(book);


    getBookNames(){
        let namesBooks =this.books.map(book=>{return book.name;});
        return namesBooks}

getPets = () => this.pets.map((pet) => pet.name);

}

let books = [
{name: "don quijote de la mancha", autor:"Miguel de Cervantes"},
{name:"Martin Fierro", autor:"José Hernández"},
{name:"padre rico padre pobre", autor:"Robert Kiyosaki & Sharon Lechter"}

];

let pets = ["homer", "coco", "biscuit"];

let usuario1 = new Usuario("Pedro", "Pascal", books, pets);
let usuario2 = new Usuario("Ezequiel", "Perez", books, pets)

usuario1.addBook ({name: "don quijote de la mancha", autor:"Miguel de Cervantes"});
usuario1.addBook ({name:"Martin Fierro", autor:"José Hernández"});
usuario1.addPet ("biscuit");

usuario2.addBook({name:"padre rico padre pobre", autor:"Robert Kiyosaki & Sharon Lechter"});
usuario2.addPet ("coco");
usuario2.addPet ("homer");


console.log (usuario1.getFullName());
console.log (pets);
console.log(books);
console.log(usuario1.countPets());
console.log(usuario2.getBookNames());