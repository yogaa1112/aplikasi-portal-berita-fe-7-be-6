import React from 'react'
import './Navbar.css'
import search_icon from '../../assets/search-w.png'
import logo from '../../assets/logo.jpg'


const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={logo} alt="" className='logo'/>

      <ul>
        <li>News</li>
        <li>Olahraga</li> 
        <li>Gaya Hidup</li>
        <li>Ekonomi</li>
        <li>Wisata</li>
        <li>Otomotif</li>
        <li>Kuliner</li>
      </ul>

      <div className="search-box">
        <input type="text" placeholder='Search' />
        <img src={search_icon} alt="" />
      </div>
    </div>
  )
}

export default Navbar;