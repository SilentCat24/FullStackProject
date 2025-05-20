import React,{useState} from 'react';
import CustomField from './cutomField/Custom';
import Box from '@mui/material/Box';
import bgcc from '../assets/book.jpg'
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useHooks } from './customHooks/Hooks';



const Login = () => {
  const {userDetails,errors}=useHooks();

const [data,setData]=useState({
  email:"",
  password:""
})

const [error,setError]=useState('');

const handleChange=(e)=>{
  const {name,value}=e.target;
setData((prev)=>({
  ...prev,
  [name]:value,
}))

}


const handleSubmit=(e)=>{
  e.preventDefault();
  if(Object.values(data).some(val=>!val.trim())){
    console.log("all fields are required")
  }else{
 userDetails(data)
  }

  
}

  return (
    <div
    style={{
         backgroundImage:`url(${bgcc})`,
         backgroundRepeat:'no-repeat',
         backgroundSize: 'cover',
         backgroundPosition: 'center',
         height: '100vh'
      }}
    >
<Box>
  <div
  style={{
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    minHeight:"90vh",
  }}
  >
    <div
    style={{
      display:"flex",
      flexDirection:"column",
      gap:"2rem"
    }}
    >
<CustomField label="Email" type='email' onChange={handleChange} value={data.email} name='email' required/>
<CustomField label="Password" onChange={handleChange} value={data.password} type='password' name='password' required/>
{
  errors
}



<Button variant="contained" onClick={handleSubmit}>
      Login
    </Button>


   
</div>

<div style={{
  display:"flex",
 
}}>
  <p style={{
    color:"white"
  }}>Not Register yet? </p>


  <Button variant="contained"
  component={Link}
  to="/register"
  style={{
 height:"1.4rem",
 margin:"1rem 0.5rem"
}}

>
      register
    </Button>

    </div>
</div>

</Box>
 
    </div>
  )
}

export default Login