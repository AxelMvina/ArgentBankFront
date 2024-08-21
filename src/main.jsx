import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from './Components/Header/index.jsx';
import { Home } from './Pages/Home/Index.jsx';
import { Footer } from './Components/Footer/index.jsx';
import { SignIn } from './Pages/Sign-In/Index.jsx';
import { UserPage } from './Pages/User/Index.jsx';
import ProtectedRoute from './Components/ProtectedRoute'; // Importer le composant ProtectedRoute
import Error from './Pages/Error/Index.jsx';

// Redux
import { Provider } from 'react-redux';
import store from './Redux/stores/UserStore.js';

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/Login' element={<SignIn />} />
      <Route 
        path='/User' 
        element={
          <ProtectedRoute>
            <UserPage />
          </ProtectedRoute>
        } 
      />
      <Route path='*' element={<Error/>} />
    </Routes>
    <Footer />
  </Router>
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
