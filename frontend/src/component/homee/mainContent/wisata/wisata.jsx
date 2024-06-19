import React from "react"
import Slider from "react-slick"
import { Wisata } from "../../../../dummyData"
import Heading from "../../../heading/Heading"
import { Link } from "react-router-dom"

import "../Ppost/ppost.css"
//copy ppost code
const wisata = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  }
  return (
    <>
      <section className='popularPost life' id="wisata">
        <Heading title='wisata' />
        <div className='content'>
          <Slider {...settings}>
            {Wisata.map((val) => {
              return (
                <div className='items'>
                  <div className='box shadow'>
                    <div className='images'>
                      <div className='img'>
                        <img src={val.cover} alt='' />
                      </div>
                      <div class='category category1'>
                        <span>{val.catgeory}</span>
                      </div>
                    </div>
                    <div className='text'>
                      <Link to={`/wisata/${val.id}`}><h1 className='title'>{val.title.slice(0, 40)}...</h1></Link>
                      <div className='date'>
                        <i class='fas fa-calendar-days'></i>
                        <label>{val.date}</label>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </Slider>
        </div>
      </section>
    </>
  )
}

export default wisata
