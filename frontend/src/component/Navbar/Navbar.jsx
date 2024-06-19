import React, { useState } from 'react';
import './Navbar.css';
import search_icon from '../../assets/search-w.png';
import logo from '../../assets/logo.jpg';
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='navbar'>
      <Link to='/'><img src={logo} alt="" className='logo'/></Link>

      <div className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="hamburger"></div>
      </div>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <a href="#"><li>News</li></a>
        <a href="#olahraga"><li>Olahraga</li></a>
        <a href="#gayahidup"><li>Gaya Hidup</li></a>
        <a href="#ekonomi"><li>Ekonomi</li></a>
        <a href="#wisata"><li>Wisata</li></a>
        <a href="#otomotif"><li>Otomotif</li></a>
        <a href="#kuliner"><li>Kuliner</li></a>
      </ul>

      <div className="search-box">
        <input type="text" placeholder='Search' />
        <img src={search_icon} alt="" />
      </div>
    </div>
  );
};

export default Navbar;
