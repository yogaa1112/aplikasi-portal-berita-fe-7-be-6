import React from 'react'
import './Navbar.css'
import search_icon from '../../assets/search-w.png'
import logo from '../../assets/logo.jpg'


const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={logo} alt="" className='logo'/>

      <ul>
        <a href="#"><li>News</li></a>
        <a href="#olahraga"><li>Olahraga</li></a>
        <a href="#gayahidup"><li>Gaya Hidup</li></a>
        <a href="#ekonomi"><li>Ekonomi</li></a>
        <a href="#"><li>Wisata</li></a>
        <a href="#"><li>Otomotif</li></a>
        <a href="#"><li>Kuliner</li></a>
      </ul>

      <div className="search-box">
        <input type="text" placeholder='Search' />
        <img src={search_icon} alt="" />
      </div>
    </div>
  )
}

export default Navbar;