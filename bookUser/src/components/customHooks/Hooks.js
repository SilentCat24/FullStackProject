import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

export const useHooks=()=>{
  const apiUrl="http://localhost:3000/user"
const [data,setData]=useState([]);
const [name,setName]=useState('');
const [personId,setPersonId]=useState('')
const navigate=useNavigate();
const [book,setBook]=useState([]);
const [bookId,setBookId]=useState('');
const [selectedBook,setSelectedBook]=useState([])
const [errors,setErrors]=useState([])

// fetching users Data
async function userDetails(data){
  try{
    const response=await fetch(`${apiUrl}/login`,{
      method:"POST",
      headers:{
        'Content-Type':"application/json",
      },
     body:JSON.stringify(data)
    })
const result= await response.json();
if(response.ok){
  if(result.msg==="your loggedIn"){
     
      const data=JSON.stringify(result.token)
      localStorage.setItem("data",data)
      navigate('/home')
  }else{
    
 setErrors(result.msg)

   
     console.log("result",result.msg)
    console.log("error")
  }

}else{

  console.log("error",error)
}
  }catch(error){
    console.log("error",error)
  }

  setTimeout(()=>{
    setErrors([])
  },3000)
}


// fetching Books
async function myBooks(){
  try{
    const response=await fetch(`${apiUrl}/books`,{
      method:"Get",
      headers:{
        'Content-Type':"application/json",
      },
    })
    const result=await response.json();
    if(response.ok){
      console.log("result from my book",result)
      setData(result)
    }
    console.log("result",response)
  }catch(error){
    console.error("errors",error)
  }
}




// decoding a localstorage data
const decode=()=>{
  const token=JSON.parse(localStorage.getItem('data'));
  const Decodes=jwtDecode(token)
  const userData=Decodes.userData;
  
  console.log("userid",userData)

setName(userData.fullname)
  setPersonId(userData.personId)
}


// adding new Book
async function addBook (formdata){
  try{
    const response=await fetch(`${apiUrl}/addbooks`,{
       method:"POST",
      headers:{
        'Content-Type':"application/json",
      },
        body:JSON.stringify(formdata)
    })

const result=await response.json();
if(response.ok){
  //  const data=JSON.stringify(result)
  console.log("data",result)
}else{
  console.log("error",error)
}
  }catch(error){
    console.log("error",error)
  }
}


// fetching books based on user
async function getBook(personId){
  try{
     const response=await fetch(`${apiUrl}/myBooks/${personId}`,{
     method:"Get",
     headers:{
        'Content-Type':"application/json",
      },      
    })
    const result=await response.json();
    if(response.ok){
      console.log("result",result.results)
      const bookResults=result.results;
      if(bookResults) {
setBook(result.results)
      }else{
        setBook([])
      } 
    }else{
      console.log("error")
    }
  }catch(error){
    console.log("error")
  }
}


// getting book based on id
async function getMyBook(id){
  try{
    const response=await fetch(`${apiUrl}/books/${id}`)
    const result=await response.json();
    if(response){
      console.log("result",result)
      setSelectedBook(result.results)
    }
    console.log("response from book component",response)
  }catch(error){
    console.log("eroor",err)
  }
}




  return {data,errors,myBooks,userDetails,decode,name,personId,addBook,getBook,book,getMyBook,selectedBook}
}