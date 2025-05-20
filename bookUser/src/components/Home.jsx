import React from 'react'
import NavBar from './Navbar'
import Books from './Books'
const Home = () => {
  return (
    <div>
      <div  style={{ position: 'sticky', top: 0, zIndex: 1000, background: 'white' }}>
<NavBar />
</div>
<Books/>
    </div>
  )
}

export default Home