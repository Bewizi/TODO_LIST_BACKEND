import {Sequelize} from "sequelize";
import config from "./index_config";


const database = new Sequelize(
    config.database.name,
    config.database.username,
    config.database.password,
    {
        dialect: "mysql",
        // port: config.database.port,
        logging: console.log,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
)

const testDatabase = async () => {
    try {
        await database.authenticate()
        console.log("database connection establish")
    } catch (e) {

    }
}

testDatabase()

export default database;