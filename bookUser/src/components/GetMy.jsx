import React, { useEffect } from 'react';
import NavBar from './Navbar';
import { useHooks } from './customHooks/Hooks';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import books from '../assets/books.webp';

const GetMy = () => {
const {id}=useParams();
    const {getMyBook,selectedBook}=useHooks();

  useEffect(()=>{
    getMyBook(id)
    console.log("component rendered")
    },[])

  return (


           <div>
        <NavBar/>
        <div>
        
<div style={{
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  gap:"1rem",
  flexWrap:"wrap"
}}>
  {
    selectedBook.map((item,index)=>(
    <Card   key={index} sx={{ maxWidth: 245,marginTop:"2rem",border:"1px solid black" }}>
      <CardMedia
        sx={{ height: 150 }}
        image={books}
                title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" index={index} >
{item.bookname}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {item.description}
        </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary',marginTop:"1rem" }} >
        <span style={{
          fontSize:"1rem",
          fontWeight:'bold'
        }}>writtenBy:</span>{item.written}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Purchase</Button>
    
      </CardActions>
    </Card>
    ))
  }

</div>



        </div>

    </div>
        
        
  )
}

export default GetMy