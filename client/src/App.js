import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//import pages and components
import LandingPage from './pages/landing-page/LandingPage.pages';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
