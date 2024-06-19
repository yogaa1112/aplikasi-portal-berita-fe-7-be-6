import react from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfilPage from './pages/Profil/ProfilPage';
import Homepages from "./pages/Home/Homepages"
import LoginPage from './pages/LoginRegister/LoginPage'
import SinglePage from './component/singlePage/SinglePage';
import KulinerPage from './component/singlePage/kulinerpage/KulinerPage';
import PopulerPage from './component/singlePage/populerpage/PopulerPage';
import OlahragaPage from './component/singlePage/olahragapage/OlahragaPage';
import LifePage from './component/singlePage/lifepage/LifePage';
import OtomotifPage from './component/singlePage/otomotifpage/OtomotifPage';
import WisataPage from './component/singlePage/wisatapage/WisataPage'
import TpostPage from './component/singlePage/tpostpage/TpostPage'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Homepages />} />
        <Route path='/Login' element={<LoginPage />} />
        <Route path="/profil" element={<ProfilPage />}/>
        <Route path='/news/:id' element={<SinglePage />}/>
        <Route path='/kuliner/:id' element={<KulinerPage />}/>
        <Route path='/popular/:id' element={<PopulerPage />}/>
        <Route path='/olahraga/:id' element={<OlahragaPage />}/>
        <Route path='/gayahidup/:id' element={<LifePage />}/>
        <Route path='/otomotif/:id' element={<OtomotifPage />}/>
        <Route path='/Wisata/:id' element={<WisataPage />}/>
        <Route path='/terkini/:id' element={<TpostPage />}/>
      </Routes>
    </Router>
  )
}

export default App;
