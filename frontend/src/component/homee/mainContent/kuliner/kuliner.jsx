import React from "react"
import Slider from "react-slick"
import { Kuliner } from "../../../../dummyData"
import Heading from "../../../heading/Heading"
import "../Ppost/ppost.css"
import { Link } from "react-router-dom"

// copy same code of popular
const kuliner = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  }
  return (
    <>
      <section className='popularPost' id="kuliner">
        <Heading title='kuliner' />
        <div className='content'>
          <Slider {...settings}>
            {Kuliner.map((val) => {
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
                    <Link to={`/kuliner/${val.id}`}><div className='text'>
                      <h1 className='title'>{val.title.slice(0, 40)}...</h1>
                      <div className='date'>
                        <i class='fas fa-calendar-days'></i>
                        <label>{val.date}</label>
                      </div>
                    </div></Link>
                    
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

export default kuliner