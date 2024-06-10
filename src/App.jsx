import react from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import NewsPage from './pages/News/NewsPage';
import ProfilPage from './pages/Profil/ProfilPage';
import Homepages from "./pages/Home/Homepages"
import LoginPage from './pages/LoginRegister/LoginPage'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Homepages />} />
        <Route path='/Login' element={<LoginPage />} />
        <Route path="/profil" element={<ProfilPage />}/>
      </Routes>
    </Router>
  )
}

export default App
