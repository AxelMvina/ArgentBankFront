import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Header } from './Components/Header/index.jsx'
import { Home } from './Pages/Home/Index.jsx'
import { Footer } from './Components/Footer/index.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <>
      <Header />
      <Home />
      <Footer/>
    </>
  </React.StrictMode>,
)
