interface App {
    name: string,
    host: string,
    port: number,

}

interface Database {
    name: string,
    port: number,
    username: string,
    password: string
}

export interface ServerConfig {
    app: App
    database: Database
}