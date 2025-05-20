import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import bgcc from '../assets/book.jpg'
import CustomField from './cutomField/Custom';
import './Books.css'
import { Link, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';



const Register = () => {
  const navigate=useNavigate();
const [password,setPassword]=useState('');
const [email,setEmail]=useState('');
const PasswordRegex=/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const [formData,setFormData]=useState({
  fullname:"",
  age:"",
  address:"",
  email:"",
  password:"",
  gender:""
})

const [error,setError]=useState({
  email:"",
  password:""
})



const handleChange=(e)=>{
const {name,value}=e.target;
setFormData((prev)=>({
  ...prev,
 [name]:value,
}))
console.log("form data",FormData)
}


// registering User
const handleSubmit =async (e) => {
  e.preventDefault();
  let validForm=true;
  let error={};
  if(Object.values(formData).some(val=>!val.trim())){
    console.log("all fields are required")
  }else
if(formData){
  if(!PasswordRegex.test(formData.password)){
    error.password="passord match should happen"
  }else
  if(!EmailRegex.test(formData.email)){
    error.email="email is not valid"
  }else{
    console.log("data is valid")
try{
const response=await fetch("http://localhost:3000/user/register",{
  method:"POST",
  headers:{
   'Content-Type': 'application/json',
  },
  body:JSON.stringify(formData)
})

const result=await response.json();
if(response.ok){
  console.log("result",result)
setFormData(Object.fromEntries(Object.keys(formData).map(key=>[key,''])))
}else{
console.error("error",result)
}
}catch(error){
console.log("error",error)
}
  }
  setError(error)
  setInterval(()=>{
    setError({})
  },3000)

  // const jsonParse=JSON.stringify(formData)
  // console.log("jsonParse",jsonParse)
}else{
  console.log("form data is not valid")

}





  // Do form validation or API call here
};


  return (
    <div
    style={{
       backgroundImage:`url(${bgcc})`,
       backgroundRepeat:'no-repeat',
       backgroundSize: 'cover',
       backgroundPosition: 'center',
       height: '100vh',
      
    }}
    >
    
    <div style={{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      minHeight:"110vh"
    }}>

<Box
component="form"
sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
noValidate
autoComplete="off"
>


<div className='inputFields'>
<CustomField  name="fullname" label="Full Name" required value={formData.fullname} onChange={handleChange}  />
<CustomField    name="email" label="email"  value={formData.email} onChange={handleChange} required  helperText={error.email}/>
</div>



<div  className='inputFields'>
<CustomField   name="password" label="Password" helperText={error.password} value={formData.password} onChange={handleChange} type='password' required />
<CustomField  name="address" label="address"  value={formData.address} onChange={handleChange} required />
</div>

<div  className='inputFields'>
<CustomField   name="gender" label="gender"  value={formData.gender} onChange={handleChange} required  />
<CustomField  name="age"  label="age"  value={formData.age} onChange={handleChange} required  type='Number'/>
</div>

<div style={{
  display:"flex",
  justifyContent:"space-between"
}}>
<Button variant="contained" onClick={handleSubmit}>
      Submit
    </Button>


    <Button variant="contained" component={Link} to="/">     
      login
    </Button>
</div>
  
</Box>
      
 
</div>
    </div>
  )
}

export default Register