import { Injectable } from '@nestjs/common';
import { Pelicula } from 'src/interfaces/pelicula.interface';

@Injectable()
export class PeliculasService {
    private peliculas: Pelicula[] = [];

    findAll (): Pelicula[] {
        if (this.peliculas.length > 0) {
            return this.peliculas;
        } else {
            return undefined;
        };
    };

    findOne (id: number) {
        const pelicula = this.peliculas.find(peli => peli.id == id);

        if (pelicula) {
            return pelicula;
        } else {
            return undefined;
        };
    };
    
    create (pelicula: Pelicula) {
        let id: number;
        
        if (this.peliculas.length === 0) {
            id = 1;
            pelicula.id = id;
        } else {
            this.peliculas.map(peli => id = peli.id + 1);
            pelicula.id = id;
        };

        this.peliculas.push(pelicula);
        return pelicula;
    };

    modify (pelicula: Pelicula, id: number) {
        let movie = this.peliculas.find(peli => peli.id == id);
        
        if (movie) {
            if (pelicula.title != undefined) movie.title = pelicula.title;
            if (pelicula.genre != undefined) movie.genre = pelicula.genre;
            if (pelicula.year != undefined) movie.year = pelicula.year;
            
            return movie;
        } else {
            return undefined;
        };
    };

    del (id: number) {
        const pelicula = this.peliculas.find(peli => peli.id == id);

        if (pelicula) {
            const newArray = this.peliculas.filter(peli => peli != pelicula);
            this.peliculas = newArray;
            return this.peliculas;
        } else {
            return undefined;
        };
    };
}
