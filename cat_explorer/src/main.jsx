import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CatDetails from './components/CatDetails'; // Import CatDetails component


ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/catDetails/:catname" element={<CatDetails />} />
      </Routes>
    </Router>
)

