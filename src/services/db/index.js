import { Sequelize } from "sequelize";

export const initDB = () => {
    return new Sequelize({
        dialect: "sqlite",
        storage: "./storage/database.sqlite",
    });
};
