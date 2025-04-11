import dotenv from 'dotenv'
import {ServerConfig} from "../types/server_types";


dotenv.config()

const getEnv = (name: string) => {
    return process.env[name] ?? "";
}

const config: ServerConfig = {
    app: {
        name: getEnv("APP_NAME") ?? "TASK TODOS",
        host: getEnv("APP_HOST") ?? "0.0.0.0",
        port: Number(getEnv("APP_PORT")) ?? "5000",
    },
    database: {
        name: getEnv("DATABASE_NAME") ?? "tasks_todo",
        port: Number(getEnv("DATABASE_PORT")) ?? "3306",
        username: getEnv("DATABASE_USERNAME") ?? "root",
        password: getEnv("DATABASE_PASSWORD") ?? "",
        url: getEnv("DATABASE_URL") ?? "",
    }
}

export default config