/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react';
import { Button, Grid, TextField, Typography } from '@mui/material';

import Card from './card';

function LoginMenu({style}) {
    let staticStyle = {
        padding: "30px",
    }
    let cardStyle = {...staticStyle, ...style};
    return (
        <Card style={cardStyle}>
            <h1>Login</h1>
            <Grid container spacing={2} sx={{mt:"5px"}}>
                <Grid item xs={12} md={3.5}>
                    <Typography sx={{mt: "8px"}} >Username</Typography>
                </Grid>
                <Grid item xs={12} md={8.5}>
                    <TextField fullWidth size='small' placeholder="Username" />
                </Grid>
                <Grid item xs={12} md={3.5}>
                    <Typography sx={{mt: "8px"}} >Password</Typography>
                </Grid>
                <Grid item xs={12} md={8.5}>
                    <TextField fullWidth size='small' placeholder="Password" type="password" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Button 
                        fullWidth 
                        variant="contained"
                        onClick={{}} //handleLogin - > redirect to home
                        >Login</Button>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Button 
                        fullWidth 
                        variant="contained" 
                        color="secondary"
                        onClick={{}} //HandleRegister - Create a new user
                        >Register</Button>
                </Grid>
            </Grid>
        </Card>
    )
}

export default LoginMenu;