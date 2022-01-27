import React from 'react';

//import assets
import HeroImage from '../../assets/hero-image.png';

//import material ui
import { Container, Button } from '@mui/material';

const LandingPage = () => {
    return (
        <div className='landing-page-container'>
            <Container>
                <div className="flex">
                    <div className="landing-content-container">
                        <h1>Learn , Teach , Grow</h1>
                        <p>Welcome to Devlearn. Devlearn is a platform where you can post articles related to programming. You can also post your problems and get answers from the community. </p>
                        <Button color="secondary" variant="contained">Read Posts</Button>
                    </div>
                    <div className="landing-img-container" alt="hero">
                        <img src={HeroImage} />
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default LandingPage;