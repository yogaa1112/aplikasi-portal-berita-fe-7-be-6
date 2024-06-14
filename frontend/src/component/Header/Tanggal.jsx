import React from 'react'
import './Header.css'
import profil from '../../assets/profil.png'

const Tanggal = () => {
    const today = new Date();
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const months = ["Januari", "Februari", "Maret", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const menu = ["Login"];

    const dayName = days[today.getDay()];
    const date = today.getDate();
    const monthName = months[today.getMonth()];
    const year = today.getFullYear();

    const fullDate = `${dayName}, ${date} ${monthName} ${year}`;

    return (
        <div className='header'>
            <p className='date'>{fullDate}</p>

            <h1 className="tittle">Jejak Nusantara</h1>

            <div className='icon-profil'>
            <a href="/profil"><img src={profil} alt="profil" /></a>
            
            </div>
            
        </div>
    );
};

export default Tanggal;