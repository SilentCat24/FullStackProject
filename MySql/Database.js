import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool=mysql.createPool({
    host:process.env.host,
    port:process.env.port,
    user:process.env.user,
    database:process.env.DBName,
    password:process.env.password,
})




export default pool