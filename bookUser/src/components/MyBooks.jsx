import React, { useEffect } from 'react'
import NavBar from './Navbar'
import { Link, useParams } from 'react-router-dom';
import { useHooks } from './customHooks/Hooks';
import books from '../assets/books.webp';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const MyBooks = () => {
    const {personId}=useParams();
  const {getBook,book}=useHooks();

    useEffect(()=>{
     getBook(personId)
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
    book.map((item,index)=>(
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
        <Typography variant="body2" sx={{ color: 'text.secondary' }}
        style={{
           whiteSpace:"noWrap",
          overflow:"hidden",
          WebkitLineClamp:2,
          textOverflow:"ellipsis"
        }}
        
        >
        {item.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small"  component={Link} to={`/getMy/${item.id}`}>Learn More</Button>
      </CardActions>
    </Card>
    ))
  }

</div>



        </div>

    </div>
  )
}

export default MyBooks