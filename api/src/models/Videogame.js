const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false ,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    relaseDate: {
      type: DataTypes.STRING,
     
      validate: {
        isDate: true,
      }
    },
    rating: {
      type: DataTypes.DECIMAL
    },
    platform: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    
  });
};
