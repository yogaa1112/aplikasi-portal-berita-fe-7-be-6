import React from "react"
import Tanggal from '../../component/Header/Tanggal'
import Navbar from '../../component/Navbar/Navbar'
import Hero from "../../component/homee/hero/Hero"
import Homes from "../../component/homee/mainContent/homes/Home"
import Footer from "../../component/Footer/Footer"


const Homepages = () => {
  return (
    <>
      
      <Navbar />
      <Hero />
      <Homes />
      <Footer />
    </>
  )
}

export default Homepages
