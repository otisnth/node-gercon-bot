import { DataTypes } from "sequelize";
import TypeInjury from "./TypeInjury.js";
import Room from "./Room.js";
import Order from "./Order.js";
import sequelize from "./../services/db/index.js";
const Incident = sequelize.define("Incident", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    injury: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: TypeInjury,
            key: "id",
        },
    },
    room: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Room,
            key: "id",
        },
    },
    order: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Order,
            key: "id",
        },
    },
});

export default Incident;
