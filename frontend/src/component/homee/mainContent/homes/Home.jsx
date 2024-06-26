import React from "react"
import Life from "../life/Life"
import Music from "../musics/Music"
import Popular from "../popular/Popular"
import Ppost from "../Ppost/Ppost"
import Side from '../../sideContent/side/Side'
import Wisata from "../wisata/wisata"
import Otomotif from "../otomotif/otomotif"
import Kuliner from "../kuliner/kuliner"
import "./style.css"

const Homes = () => {
  return (
    <>
      <main>
        <div className='container'>
          <section className='mainContent'>
            <Popular />
            <Ppost />
            <Life />
            <Wisata />
            <Otomotif />
            <Kuliner />
          </section>
          <section className='sideContent'>
            <Side />
          </section>
        </div>
      </main>
    </>
  )
}

export default Homes
