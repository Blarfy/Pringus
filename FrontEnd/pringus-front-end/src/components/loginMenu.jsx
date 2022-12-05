/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react';
import { Button, Grid, TextField, Typography } from '@mui/material';

import React from 'react';

import { useNavigate } from 'react-router-dom';

import { Buffer } from 'buffer';

import Card from './card';

function LoginMenu({style, isRegister}) {
    let theme = useTheme();
    let navigate = useNavigate();

    let staticStyle = {
        padding: "30px",
    }
    let cardStyle = {...staticStyle, ...style};

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [user, setUser] = React.useState(localStorage.getItem("user"));

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleLogin = async (event) => {
        if (isRegister) {
            navigate("/login")
        } else {
            event.preventDefault();
            let userObj = {
                username: username,
                password: password,
            }

            let response = await fetch("http://localhost:8080/login/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic " + Buffer.from(`${userObj.username}:${userObj.password}`).toString("base64")
                },
            }).then((response) => {
                if (response.status === 200) {
                    console.log("Login successful");
                    return response.json();
                } else {
                    return null;
                }
            }).then((data) => {
                setUser(data)
                localStorage.setItem("user", JSON.stringify(data));
                navigate("/home");
            }).catch((error) => {
                console.log(error);
            });

            
        }
    }

    const handleRegister = () => {
        if (isRegister) {
            //do register stuff
        } else {
            navigate('/register');
        }
    }

    //https://www.freecodecamp.org/news/how-to-persist-a-logged-in-user-in-react/

    return (
        <Card style={cardStyle}>
            <Typography>{isRegister ? "Register" : "Login"}</Typography>
            <Grid container spacing={2} sx={{mt:"5px"}}>
                {isRegister ? 
                (<>
                    <Grid item xs={12} md={3.5}>
                        <Typography sx={{mt: "8px"}} >Email</Typography>
                    </Grid>
                    <Grid item xs={12} md={8.5}>
                        <TextField fullWidth size="small" placeholder="Email"  />
                    </Grid>
                </>) : null}
                <Grid item xs={12} md={3.5}>
                    <Typography sx={{mt: "8px"}} >Username</Typography>
                </Grid>
                <Grid item xs={12} md={8.5}>
                    <TextField fullWidth size='small' placeholder="Username" value={username} onChange={handleUsernameChange} />
                </Grid>
                {isRegister ? (
                    <>
                        <Grid item xs={12} md={4}>
                            <Typography sx={{mt: "8px"}} >First Name</Typography>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <TextField fullWidth size="small" placeholder="First Name"  />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography sx={{mt: "8px"}} >Last Name</Typography>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <TextField fullWidth size="small" placeholder="Last Name"  />
                        </Grid>
                    </>
                ) : null}
                <Grid item xs={12} md={3.5}>
                    <Typography sx={{mt: "8px"}} >Password</Typography>
                </Grid>
                <Grid item xs={12} md={8.5}>
                    <TextField fullWidth size='small' placeholder="Password" type="password" value={password} onChange={handlePasswordChange} />
                </Grid>
                {isRegister ? 
                (<>
                    <Grid item xs={12} md={3.5}>
                        <Typography sx={{mt: "8px"}} >Confirm Password</Typography>
                    </Grid>
                    <Grid item xs={12} md={8.5}>
                        <TextField fullWidth size='small' placeholder="Confirm Password" type="password" />
                    </Grid>
                </>) : null}
                {isRegister ? 
                (<>
                    <Grid item xs={12} md={6}>
                    <Button 
                        fullWidth 
                        variant="contained" 
                        color="primary"
                        onClick={handleRegister} //HandleRegister - Create a new user
                        >Register</Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Button 
                            fullWidth 
                            variant="contained"
                            color="secondary"
                            onClick={handleLogin} //handleLogin - > redirect to home
                            >Login</Button>
                    </Grid>
                </>) : (
                <>
                    <Grid item xs={12} md={6}>
                        <Button 
                            fullWidth 
                            variant="contained"
                            color="primary"
                            onClick={handleLogin} //handleLogin - > redirect to home
                            >Login</Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Button 
                            fullWidth 
                            variant="contained" 
                            color="secondary"
                            onClick={handleRegister} //HandleRegister - Create a new user
                            >Register</Button>
                    </Grid>
                </>)}
                
                
            </Grid>
        </Card>
    )
}

export default LoginMenu;