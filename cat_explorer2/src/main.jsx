import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Layout from './routes/Layout';
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailView from './routes/DetailView';
import CatDetails from './components/CatDetails'; // Import CatDetails component


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index={true} element={<App />} />
        <Route index={false} path="/catDetails/:catid" element={<DetailView />} />
        <Route index={true} path = "*" element={<h1>Page Not Found</h1>} />
      </Route>
    </Routes>
  </BrowserRouter>
)

