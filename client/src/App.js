import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//import pages and components
import LandingPage from './pages/landing-page/LandingPage.pages';
import Header from './components/Header/Header.component';
import Login from './pages/login-page/login.pages';
import SignUp from './pages/signup-page/signup.pages';
import Footer from './components/Footer/footer.component';

//import connect
import { connect } from 'react-redux';
import setAuthToken from './utils/setAuthToken';
import Store from './redux/Store';
import { setCurrentUser } from './redux/auth/auth.action';
import jwtDecode from 'jwt-decode';

import { logoutUser } from './redux/auth/auth.action';

function App({ logoutUser }) {

  useEffect(() => {
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);

      const decoded = jwtDecode(localStorage.jwtToken);

      console.log(decoded)

      Store.dispatch(setCurrentUser(decoded));

      const currentTime = Date.now() / 1000;
      const exp = decoded.exp;

      if (exp < currentTime) {
        //token expired
        Store.dispatch(logoutUser());

        window.location.href = "/login";
      }

    }
  }, [])

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

const mapStateToProps = (state) => ({
  test: state.test
})

export default connect(mapStateToProps, { logoutUser })(App);
