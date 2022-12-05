/** @jsxImportSource @emotion/react */
//Login page
import React from 'react';
import LoginMenu from '../components/loginMenu';
import { useOutletContext } from 'react-router-dom';

function Login() {
    return (
        <div 
            className="Login" 
            css={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "100vh",
                marginTop: "-100px"
            }}
        >
            <LoginMenu />
        </div>
    );
}

export default Login;