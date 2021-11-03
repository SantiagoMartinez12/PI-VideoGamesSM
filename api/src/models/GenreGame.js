const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('genreGame', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false ,
        primaryKey: true,
      },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    });
};
