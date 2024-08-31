import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Create from './create.jsx';
import Gallery from './gallery.jsx';
import SideBar from './sidebar.jsx';
import DetailedView from './detailedView.jsx';
import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://cgnuiixssbxzdyxmbqwk.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnbnVpaXhzc2J4emR5eG1icXdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM1OTAxMjYsImV4cCI6MjAyOTE2NjEyNn0.czaviUauiV-Az20MIlHFRFXXP2viRqiLsskQvg_i7qk");


function App() {
  return (
    <BrowserRouter>
      <div className="app-container"> {/* Wrap everything in a container */}
        <SideBar />
        <main>
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/create-post" element={<Create supabase={supabase}/>} />
            <Route path="/post-gallery" element={<Gallery supabase={supabase}/>} />
            <Route path="/post-gallery/:name-:magic-:description" element={<DetailedView/>} />
            <Route path="/post-gallery/HINDZ" element={<DetailedView/>} />
            <Route path="*" element={<div>404: Not Found</div>} />
          </Routes>
          <Outlet /> {/* Outlet for nested routes */}
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

