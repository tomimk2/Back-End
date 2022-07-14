const classC = require("../lib/categories_class");
const classCategories = new classC;

const getCategories = async (req, res) => {
    try {
        const all = await classCategories.getAll();
        res.status(200).json({
            "Categorias": all
        });
    } catch (error) {
        res.status(500).json({
            "Ocurrió un error": error
        });
    };
};

const getCategoryById = async (req, res) => {
    const id = Number(req.params.id);

    try {
        const cat = await classCategories.getById(id);
        
        if (cat != undefined) {
            res.status(200).json({
                "Categoría": cat
            });
        } else {
            res.status(404).json(`No se encontró categoría con el id ${id}`);
        };
    } catch (error) {
        res.status(500).json({
            "Ocurrió un error": error
        });
    };
};

const createCategory = async (req, res) => {
    const categoria = req.body;

    if (categoria.categoria !== undefined) {
        const save = await classCategories.save(categoria);

        try {
            res.status(200).json({
                "Estado": `Categoría con id ${save.id} fue añadida correctamente`,
                "Categoría": save
            });
        } catch (error) {
            res.status(500).json({
                "Ocurrió un error": error
            });
        };   
    } else {
        res.status(206).json("Todos los campos son obligatorios, volvé a intentarlo");
    };    
};

const modifyCategory = async (req, res) => {
    let {categoria} = req.body;
    const id = Number(req.params.id);
    const cat = await classCategories.getById(id);

    if (cat != undefined) {

        if(categoria != undefined) {
            const modify = await classCategories.modify(categoria, id);
    
            try {
                res.status(200).json({
                    "Estado": `La categoría con id ${id} se modificó correctamente`,
                    "Categoría": modify
                });
            } catch (error) {
                res.status(500).json({
                    "Ocurrió un error": error
                });
            };
        } else {
            res.status(206).json("Todos los campos son obligatorios, volvé a intentarlo");
        }        
    } else {
        res.status(404).json(`No se encontró categoría con el id ${id}`);
    }; 
};

const delCategory = async (req, res) => {
    const id = Number(req.params.id);
    const del = await classCategories.deleteById(id);

    if (del[0] !== 0) {
        try {
            res.status(200).json({
                "Estado": `Categoría con id ${id} eliminada correctamente`
            });
        } catch (error) {
            res.status(500).json({
                "Ocurrió un error": error
            });
        };
    } else {
        res.status(404).json(`No se encontró categoría con el id ${id}`);
    };
};

module.exports = {getCategories, getCategoryById, createCategory, modifyCategory, delCategory};