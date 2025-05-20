import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import routes from './Routes/users.js'
import pool from './Database.js'


import dotenv from 'dotenv';
dotenv.config();
const app=express();
app.use(express.json());

const port =3000;
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use('/user',routes)



pool.getConnection((err,connection)=>{
    if(err){
        console.log(err,"err")
    }else{
        console.log("data base connected",connection.threadId)
    }
})




app.get('/',(req,res)=>{
    res.send("server has started")
})

app.listen(port,()=>{
    console.log("server has started at http://localhost:3000")
})