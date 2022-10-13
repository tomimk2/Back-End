import { Controller, Body, Get, Post, Param, Put, Delete } from '@nestjs/common';
import { createPeliculaDTO } from 'src/dto/create-pelicula.dto';
import { PeliculasService } from './peliculas.service';

@Controller('peliculas')
export class PeliculasController {
    constructor(private readonly peliculasService: PeliculasService){}

    @Get("/")
    async findAll() {
        const peliculas = this.peliculasService.findAll();

        if (peliculas != undefined) {
            return peliculas;
        } else {
            return `Todavía no existen películas`;
        };       
    };

    @Get("/:id")
    async findOne(@Param('id') id) {
        const pelicula = this.peliculasService.findOne(id);
        if (pelicula != undefined) {
            return pelicula
        } else {
            return `No existe película con id ${id}`;
        };
    };

    @Post("/new")
    async create(@Body() createPeliculaDTO: createPeliculaDTO) {
        return this.peliculasService.create(createPeliculaDTO);
    };

    @Put("/:id/modify")
    async modify(@Body() createPeliculaDTO: createPeliculaDTO, @Param('id') id) {
        const pelicula = this.peliculasService.modify(createPeliculaDTO, id);

        if (pelicula != undefined) {
            return pelicula
        } else {
            return `No existe película con id ${id}`;
        };
    };

    @Delete("/:id/delete")
    async del(@Param('id') id) {
        const peliculas = this.peliculasService.del(id);
        if (peliculas != undefined) {
            return `Se eliminó la película con id ${id}`
        } else {
            return `No existe película con id ${id}`;
        };
    };
};
