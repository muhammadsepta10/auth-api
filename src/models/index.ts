import * as sequelize from 'sequelize';
import { UserFactory } from "./user-model";

export const dbConfig = new sequelize.Sequelize(
    (process.env.DB_NAME = "rest_resume_api"),
    (process.env.DB_USER = "john"),
    (process.env.DB_PASSWORD = "password"),
    {
        port: Number(process.env.DB_PORT) || 54320,
        host: process.env.DB_HOST || "localhost",
        dialect: "postgres",
        pool: {
            min: 0,
            max: 5,
            acquire: 30000,
            idle: 10000,
        },
    }
);
// THIS ONES ARE THE ONES YOU NEED TO USE ON YOUR CONTROLLERS
export const User = UserFactory(dbConfig)