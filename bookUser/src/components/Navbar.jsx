import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import { useHooks } from './customHooks/Hooks';
import { useEffect } from 'react';


export default function NavBar() {

  const {decode,name,personId}=useHooks();
    useEffect(()=>{
  decode();
},[])
  return (
  
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Link to="/home" style={{ cursor: 'pointer',textDecoration: 'none', color: 'inherit' }}>
               <HomeIcon/> 
            </Link>
            

     
   
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
     {name}
          </Typography>


          <Button color="inherit" component={Link} to="/register">Register </Button>
          <Button color="inherit" component={Link} to="/addBook">Add Book</Button>
          <Button color="inherit" component={Link} to={`/myBooks/${personId}`}>My Books</Button>
      
        </Toolbar>
      </AppBar>
    </Box>
  );
}