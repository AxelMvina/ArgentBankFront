import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from './Components/Header/index.jsx';
import { Home } from './Pages/Home/Index.jsx';
import { Footer } from './Components/Footer/index.jsx';
import { SignIn } from './Pages/Sign-In/Index.jsx';

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/Login' element={<SignIn />} />
    </Routes>
    <Footer />
  </Router>
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
