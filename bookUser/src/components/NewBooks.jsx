import React, { useState } from 'react';
import bgcc from '../assets/book.jpg';
import Button from '@mui/material/Button';
import NavBar from './Navbar';
import CustomField from './cutomField/Custom';
import { Box, TextField } from '@mui/material';
import './Books.css';
import { useHooks } from './customHooks/Hooks';
import { useEffect } from 'react';




const NewBooks = () => {
  const {name,personId,decode,addBook}=useHooks();

useEffect(()=>{
  decode();
},[])


const [data,setData]=useState({
  bookname:"",
  price:"",
  description:""
})

const handleChange=(e)=>{
  const {name,value}=e.target;
setData((prev)=>({
  ...prev,
  [name]:value
}))

}

const handleSubmit=(e)=>{
  e.preventDefault();
 if(Object.values(data).some(val=>!val.trim())){
    console.log("all fields are required")
  }else{
  const finalData={
    ...data,
    personId:personId,
    written:name
  }
addBook(finalData)
  console.log("final data",finalData)
}
}




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
      
      <div
      style={{
        display:"flex",
        justifyContent:"center",
        alignItems:'center',
  
      }}
      >
        <NavBar/>
      </div>
      <div      style={{
        display:"flex",
        justifyContent:"center",
        alignItems:'center',
        margin:"1rem 2rem"
  
      }}>

      <Box 
      component="form"
sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
noValidate
autoComplete="off">


  <div className='inputFields'>
    <div style={{
      display:'flex',
      flexDirection:"column"
    }}>
<CustomField  name="bookname" label="Book name"  onChange={handleChange} />
<CustomField  name="price" label="Price" type='Number' onChange={handleChange}/>
    </div>

<CustomField  name="description" label="description" multiline  minRows={4} onChange={handleChange}/>




</div>
<Button variant="contained" onClick={handleSubmit}>
      Submit
    </Button>



      </Box>





      </div>



    </div>
  )
}

export default NewBooks