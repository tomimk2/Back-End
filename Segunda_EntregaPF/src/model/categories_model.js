const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize('mariadb://root:@localhost:3306/ecommerce');
const queryInterface = sequelize.getQueryInterface();

const categoriasModel = sequelize.define('Categorias',
    {
        id: {type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
        categoria: {type: DataTypes.STRING(), allowNull:false},
        habilitado: {type: DataTypes.BOOLEAN, defaultValue: true}
    }, 
    {timestamps: false}
);

queryInterface.createTable('categorias', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    categoria: {type: DataTypes.STRING(30), allowNull:false},
    habilitado: {type: DataTypes.BOOLEAN, defaultValue: true}
});

module.exports = {categoriasModel};