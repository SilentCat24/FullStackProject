import express from "express";
import bcrypt from 'bcrypt';
import {register,Book} from "../Schema/users.js";
import jwt from 'jsonwebtoken';

const Router =express.Router();

Router.get('/users',async(req,res)=>{
try{
    const users=await register.find({},'-password');
    res.send({
        msg:"data fetched succesfully",
        data:users
    });
}catch(error){
    console.log("error",error)
    res.send("Internal server error")
}
})


Router.get('/books',async(req,res)=>{
  try{
    const books=await Book.find({});
    res.send({
      msg:"Books Fetched Successfully",
      data:books
    })
  }catch(error){
    console.log("error",error)
    res.send("internal server error")
  }



})



Router.post('/login', async (req, res) => {
    const { email, password } = req.body;  
    try {
      const user = await register.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ msg: "Email is not registered" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ msg: "Invalid credentials" });
      }
  
      const token = jwt.sign(
        { userId: user._id },
        process.env.SecretKey,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
  
      res.status(200).json({
        msg: "Login successful",
        token: token,
        user: user
      });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ msg: "Server error" });
    }
  });

Router.post('/addbooks',async(req,res)=>{
  const {id,personId,bookname,description,price,author}=req.body;
  try{
    const existBook=await Book.findOne({bookname});
    if(existBook){
      res.send("book already registered in this name")
    }

const newBook=new Book({
id,
personId,
bookname,
description,
price,
author
}) 

await newBook.save();
return res.send({
  msg:"book saved succesfully",
  msg_Type:"succcess"
})


  }catch(errr){
    console.log("error",errr)
  }
 
})








Router.post('/register',async(req,res)=>{
    const {fullname,age,address,email,password,city,gender}=req.body;

    try{
        const existingEmail=await register.findOne({email});
        if(existingEmail){
            return res.send({
                msg:'email already exists',

            })
        }

        const hashedPassword=await bcrypt.hash(password,8);
        const newUser=new register({
            fullname,
            age,
            address,
            email,
            password:hashedPassword,
            city,
            gender,

        });
        await newUser.save();
        return res.send({
            msg:"user added successfully",
            msg_type:"success"
        })
    }catch(error){
        console.log("error",error)
            return  res.send({msg:"server error"})
    }
});



export default Router;
