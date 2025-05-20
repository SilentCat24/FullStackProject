import mongoose from 'mongoose';

const registerSchema=new mongoose.Schema({
    fullname:String,
    age:Number,
    address:String,
    email:{type:String,unique:true},
    password:String,
    city:String,
    gender:String
    
});

const registerBooks=new mongoose.Schema({
    id:Number,
    personId:Number,
    bookname:String,
    description:String,
    price:Number,
    author:String,
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Book=mongoose.model('books',registerBooks)


const register=mongoose.model('register',registerSchema);
export  {register,Book};