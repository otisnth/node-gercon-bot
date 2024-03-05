import { DataTypes } from "sequelize";
import sequelize from "./../services/db/index.js";
const TypeInjury = sequelize.define("TypeInjury", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default TypeInjury;
