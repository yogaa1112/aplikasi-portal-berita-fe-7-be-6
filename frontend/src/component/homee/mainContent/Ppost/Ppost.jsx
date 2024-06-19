import React from "react"
import Slider from "react-slick"
import { ppost } from "../../../../dummyData"
import Heading from "../../../heading/Heading"
import { Link } from "react-router-dom"
import "./ppost.css"

// copy same code of popular
const Ppost = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  }
  return (
    <>
      <section className='popularPost' id="olahraga">
        <Heading title='Olahraga' />
        <div className='content'>
          <Slider {...settings}>
            {ppost.map((val) => {
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
                      <Link to={`/olahraga/${val.id}`}><h1 className='title'>{val.title.slice(0, 40)}...</h1></Link>
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

export default Ppost
