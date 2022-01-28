import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//import pages and components
import LandingPage from './pages/landing-page/LandingPage.pages';
import Header from './components/Header/Header.component';
import Login from './pages/login-page/login.pages';
import SignUp from './pages/signup-page/signup.pages';
import Footer from './components/Footer/footer.component';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
