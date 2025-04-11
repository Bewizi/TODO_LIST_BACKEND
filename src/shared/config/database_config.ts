import {Sequelize} from "sequelize";
import config from "./index_config";

// Create a Sequelize instance using the DATABASE_URL
const database = new Sequelize(config.database.url, {
    dialect: "mysql",
    logging: console.log,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

// Function to test database connection
const testDatabase = async () => {
    try {
        await database.authenticate();
        console.log("✅ Database connection established");
    } catch (error) {
        console.error("❌ Unable to connect to the database:", error);
        process.exit(1); // Optional: Exit the process if DB connection fails
    }
};

testDatabase();

export default database;
