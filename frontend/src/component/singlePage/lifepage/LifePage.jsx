import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { lifestyle } from "../../../dummyData"
import Side from "../../homee/sideContent/Tpost/Tpost"
import "../../homee/mainContent/homes/style.css"
import "../singlepage.css"
import "../../homee/sideContent/side/side.css"
import Navbar from "../../Navbar/Navbar"
import Tanggal from "../../Header/Tanggal"
import Footer from "../../Footer/Footer"


const LifePage = () => {
  const { id } = useParams()
  const [item, setItem] = useState(null)

  useEffect(() => {
    const item = lifestyle.find((item) => item.id === parseInt(id))
    window.scrollTo(0, 0)
    if (item) {
      setItem(item)
    }
  }, [id])

  return (
    <>
      {item ? (
        <main>
         
          <Navbar />
          <div className='container'>
            <section className='mainContent details'>
              <h1 className='title'>{item.title}</h1>

              <div className='desctop'>
                {item.desc.map((val) => {
                  return (
                    <>
                      <p>{val.para1}</p>
                      <p>{val.para2}</p>
                    </>
                  )
                })}
              </div>
              <img src={item.cover} alt='' />
              {item.desc.map((val) => (
                <p>{val.para3}</p>
              ))}

              <div className='descbot'>
                {item.details.map((data) => {
                  return (
                    <>
                      <p>{data.para1}</p>
                    </>
                  )
                })}
              </div>

              <div className='desctop'>
                {item.details.map((data) => {
                  return (
                    <>
                      <p>{data.para2}</p>
                      <p>{data.para3}</p>
                    </>
                  )
                })}
              </div>
            <h2>Komentar</h2>
            <textarea placeholder='Komentar disini...'></textarea>
            <button>Submit</button>
            </section>
            <section className='sideContent'>
              <Side />
            </section>
          </div>
          <Footer/>
        </main>
      ) : (
        <h1>not found</h1>
      )}
    </>
  )
}

export default LifePage
