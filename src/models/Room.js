import { initDB } from "./services/db/index.js";
const sequelize = initDB();
const Room = sequelize.define("Room", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default Room;
