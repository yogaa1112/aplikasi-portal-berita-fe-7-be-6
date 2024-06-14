import React from 'react'
import './Footer.css';
import LOGO from '../../assets/logo1.jpg'



const Footer = () => {
    return (
        
    <footer className="footer">
        <div className="container-footer">
            <div className="row-footer">
                <div className="footer-col">
                    <img src={LOGO} className="gambar" alt="logo" height={250}/>
                </div>
                <div className="footer-col">
                    <h4>Kategori:</h4>
                    <ul className='ul-footer'>
                        <li><a href="#olahraga">Olahraga</a></li>
                        <li><a href="#gayahidup">Gaya Hidup</a></li>
                        <li><a href="#ekonomi">Ekonomi</a></li>
                        <li><a href="#">Wisata</a></li>
                        <li><a href="#">Otomotif</a></li>
                        <li><a href="#">Kuliner</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>follow us</h4>
                    <div className="social-links">
                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
            </div>
            <div className="copyright"><p>Copyright @ 2024 Jejak Nusantara</p></div>
        </div>
    </footer>
    
    );
}

export default Footer
