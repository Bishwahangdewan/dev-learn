import React from 'react';

import { Link } from 'react-router-dom';

import { Container } from '@mui/material';

const Header = () => {
    return (
        <div className="header-container">
            <Container>
                <div className="flex">
                    <h2>&#60;/Devlearn&#62;</h2>

                    <nav>
                        <Link className="nav-links" to="/login">Login</Link>
                        <Link className="nav-links" to="/signup">SignUp</Link>
                    </nav>
                </div>
            </Container>
        </div>
    )
}

export default Header;