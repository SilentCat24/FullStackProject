import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import books from '../assets/books.webp';
import { useHooks } from './customHooks/Hooks';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


export default function Books() {
const {data,myBooks}=useHooks();

useEffect(()=>{
  myBooks();
},[])

return (
    <>
<div style={{
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  gap:"1rem",
  flexWrap:"wrap"
}}>
  {
    data.map((item,index)=>(
    <Card   key={index} sx={{ maxWidth: 210,height:300,marginTop:"2rem",border:"1px solid black" }}>
      <CardMedia
        sx={{ height: 150 }}
        image={books}
                title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" index={index} style={{
               whiteSpace:"noWrap",
          overflow:"hidden",
          WebkitLineClamp:2,
          textOverflow:"ellipsis"
        }} >
{item.bookname}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} style={{
          whiteSpace:"noWrap",
          overflow:"hidden",
          WebkitLineClamp:2,
          textOverflow:"ellipsis"
        }}>
     
        {item.description}
   
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        {/* <Button size="small" component={Link} to={`/mybooks/${item.id}`} >Learn More</Button> */}
        <Button size='small' component={Link} to={`/getMy/${item.id}`}> Learn More</Button>
      </CardActions>
    </Card>
    ))
  }

</div>

        </>
  );
}