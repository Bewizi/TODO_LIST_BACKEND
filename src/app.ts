import express from 'express'
import rootRoutes from "./rootRoutes";
import appConfig from './shared/config/index_config'
import database from "./shared/config/database_config";
import dotenv from "dotenv";
import cors from 'cors'

dotenv.config()

const app = express()

const crs = cors({
    origin: ["http://localhost:5173", "https://todolistbackend-production-ac6e.up.railway.app/"],
    // origin: (_, callback) => {
    //     return callback(null, true)
    // },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(crs)


app.use('/api/', rootRoutes)

app.listen(appConfig.app.port, appConfig.app.host, async () => {
    await database.sync({alter: true})
    console.log(`app listening on ${appConfig.app.port} and on ${appConfig.app.host}`)
})