import React from 'react';

import { Link } from 'react-router-dom';

import { Container } from '@mui/material';

import { connect } from 'react-redux';

import { logoutUser } from '../../redux/auth/auth.action';

const Header = ({ auth, logoutUser }) => {

    const { isAuthenticated } = auth;

    const guestLink = (
        <nav>
            <Link className="nav-links" to="/login">Login</Link>
            <Link className="nav-links" to="/signup">SignUp</Link>
        </nav>
    )

    const authLink = (
        <nav>
            <a className="nav-links" onClick={logoutUser}>Logout</a>
        </nav>
    )

    return (
        <div className="header-container">
            <Container>
                <div className="flex">
                    <h2>&#60;/Devlearn&#62;</h2>

                    {isAuthenticated ? authLink : guestLink}
                </div>
            </Container>
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(Header);