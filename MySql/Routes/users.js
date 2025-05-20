import express from 'express';
import mysql from 'mysql2';
import bcrypt from 'bcrypt';
import pool from '../Database.js';
import jwt from 'jsonwebtoken';
import { decrypt } from 'dotenv';


const router=express.Router();


router.get('/users',(req,res)=>{
    const table='select * from register';
    pool.query(table,(err,results)=>{
        if(err){
            console.log("err",err)
            res.send("error while fetching data")
        }
        res.send(results)
        console.log(results)
    })
})

router.get('/mybooks/:personId', (req, res) => {
  const { personId } = req.params; // 🔥 read from URL
  pool.query(
    `SELECT * FROM books WHERE personId = ?`,
    [personId],
    (err, results) => {
      if (err) {
        console.error("DB error:", err);
        return res.status(500).send({ error: "Internal Server Error" });
      }

      if (results.length === 0) {
        return res.send({ data: "No Books Found" });
      } else {
        return res.send({results}); // or { data: results } if you want
      }
    }
  );
});


router.get('/books',(req,res)=>{
    const books='select * from books';
    pool.query(books,(err,results)=>{
        if(err){
            console.log("err",err)
            res.send("error while fetching data")
        }
        res.send(results)
        console.log(results)
    })
})

router.get('/books/:id',(req,res)=>{
    const {id}=req.params;
    pool.query(
        `select * from books where id=?`,
        [id],
        (error,results)=>{
            if(results){
                res.send({"results":results})
            }else{
               res.send({"results":error})
            }
        }



    )
    
})



router.post('/login',async function (req,res) {
try{
    const {email,password}=req.body;
    pool.query('select * from register where email = ?',[email],
        async(error,results)=>{
            console.log(results);
            if(results<=0){
                return res.send({
                    msg:"user not registered"
                })
            }else if(!(await bcrypt.compare(password,results[0].password))){
                return res.send({
                    msg:"password is wrong",
                })
            }else{
                const userData=results[0];
                const token=jwt.sign({userData:userData},process.env.SecretKey,{
                    expiresIn:process.env.JWT_EXPIRES_IN,
                });
                console.log("the token is "+token)
                res.send(
                    {token:token,data:results,msg:"your loggedIn"}
                )
            }
        }


    )
}catch{
    console.log(error)
}
})


router.post('/addbooks',async function (req,res) {
    const {id,personId,bookname,description,price,written}=req.body;
pool.query('select bookname from books where bookname=?',[bookname],
async (error,result)=>{
    if(error){
        console.log("error",error)
    }
    if(result.length>0){
        return res.send({
            msg:"book already registered",
            mgs_type:"error"
        })
    }
    pool.query('insert into books set ?',
        {id:id,personId:personId,bookname:bookname,description:description,price:price,written:written},
        (error,result)=>{
                if(result){
                    res.send({result:"books added successfully"})
                }else{
                    res.send(error)
                }
        }
    )
}
)
})


router.post('/register',async function(req,res){
const {fullname,age,address,email,password,gender}=req.body;
pool.query('select email from register where email=?',[email],
async(error,result)=>{
    if(error){
        console.log(error);
    }
    if(result.length>0){
        return res.send({
            msg:"email already registered",
            msg_type:"error"
        })
    }
    let hashedPassword=await bcrypt.hash(password,1);
    pool.query(
        'insert into register set ?',
        {fullname:fullname,age:age,address:address,email:email,password:hashedPassword,gender:gender},
        (error,result)=>{
            if(error){
                console.log("error",error)
            }else{
                return res.send({
                    msg:"user resgistration success",
                    msg_type:"success"
                })
            }
        }
    )
}

)

})


export default router;