import React from 'react';

import { Container, Card, Typography, TextField, Button } from "@mui/material";

const SignUp = () => {
    return (
        <div className="body-container">
            <Container sx={{ mt: 15, width: '75.%', mb: 5 }}>
                <Card sx={{ p: 5 }}>
                    <Typography sx={{ fontSize: 25, fontWeight: 'bold' }}>SignUp</Typography>

                    <form>
                        <div className='form-group'>
                            <TextField required id="name" label="Enter your name" variant="standard" fullWidth />
                        </div>

                        <div className='form-group'>
                            <TextField required id="email" label="Enter your email" variant="standard" fullWidth />
                        </div>

                        <div className='form-group'>
                            <TextField required id="password" type="password" label="Enter your password" variant="standard" fullWidth />
                        </div>

                        <div className='form-group'>
                            <TextField required id="confirmpassword" type="password" label="Confirm Password" variant="standard" fullWidth />
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

export default SignUp;