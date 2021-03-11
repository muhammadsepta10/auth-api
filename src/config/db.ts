import { config } from 'dotenv';
config()
import { Pool } from "pg"
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT || "") || 5432
})

pool.on("error", (err, client) => {
    if (err) {
        console.log(`Failed to connect DB ${process.env.DB_NAME}`)
    } else {
        console.log(`DB ${process.env.DB_NAME} Connected`)
    }
})
pool.on("connect", (client) => {
    if (client) {
        console.log(`DB ${process.env.DB_NAME} Connected`)        
    } else {
        console.log(`Failed to connect DB ${process.env.DB_NAME}`)        
    }
})

export default pool