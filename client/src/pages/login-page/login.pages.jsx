import React, { useState } from 'react';

import { Container, Card, Typography, TextField, Button } from "@mui/material";

import { loginUser } from '../../redux/auth/auth.action';

import { connect } from 'react-redux';

const Login = ({ loginUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            email,
            password
        }

        loginUser(data);
    }

    return (
        <div className="body-container">
            <Container sx={{ mt: 15, width: '75.%', mb: 5 }}>
                <Card sx={{ p: 5 }}>
                    <Typography sx={{ fontSize: 25, fontWeight: 'bold' }}>Login</Typography>

                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className='form-group'>
                            <TextField required id="email" label="Enter your email" variant="standard" fullWidth onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className='form-group'>
                            <TextField required id="password" type="password" label="Enter your password" variant="standard" fullWidth onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div className='form-group'>
                            <Button type="submit" variant="contained" color="secondary">Login</Button>
                        </div>
                    </form>

                </Card>
            </Container>
        </div>
    )
}

export default connect(null, { loginUser })(Login);