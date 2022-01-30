import React, { useState } from 'react';

import { Container, Card, Typography, TextField, Button } from "@mui/material";

//import actions
import { registerUser } from '../../redux/auth/auth.action';

//import connect
import { connect } from 'react-redux';

//import useNavigate hook
import { useNavigate } from 'react-router-dom';

const SignUp = ({ registerUser }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    //handleSubmit
    const handleSubmit = (e) => {
        e.preventDefault();

        const registerData = {
            name,
            email,
            password,
            confirmPassword
        }

        console.log(registerData)

        registerUser(registerData, navigate);
    }


    return (
        <div className="body-container">
            <Container sx={{ mt: 15, width: '75.%', mb: 5 }}>
                <Card sx={{ p: 5 }}>
                    <Typography sx={{ fontSize: 25, fontWeight: 'bold' }}>SignUp</Typography>

                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className='form-group'>
                            <TextField required id="name" label="Enter your name" variant="standard" onChange={(e) => setName(e.target.value)} value={name} fullWidth />
                        </div>

                        <div className='form-group'>
                            <TextField required id="email" label="Enter your email" variant="standard" onChange={(e) => setEmail(e.target.value)} value={email} fullWidth />
                        </div>

                        <div className='form-group'>
                            <TextField required id="password" type="password" label="Enter your password" variant="standard" onChange={(e) => setPassword(e.target.value)} value={password} fullWidth />
                        </div>

                        <div className='form-group'>
                            <TextField required id="confirmpassword" type="password" label="Confirm Password" variant="standard" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} fullWidth />
                        </div>

                        <div className='form-group'>
                            <Button type="submit" variant="contained" color="secondary">Sign Up</Button>
                        </div>
                    </form>

                </Card>
            </Container>
        </div>
    )
}

export default connect(null, { registerUser })(SignUp);