import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import NewBooks from './components/NewBooks';
import MyBooks from './components/MyBooks';
import GetMy from './components/GetMy';




const App = () => {
  return (
    <div >

<BrowserRouter>
<Routes>
<Route path="/register" element={<Register/>}/>
<Route path="/" element={<Login/>}/>
<Route path="/home" element={<Home/>}/>
<Route path="/addBook" element={<NewBooks/>}/>
<Route path="/myBooks/:personId" element={<MyBooks/>}/>
<Route path="/getMy/:id" element={<GetMy/>}/>


</Routes>
</BrowserRouter>

    </div>
  )
}

export default App