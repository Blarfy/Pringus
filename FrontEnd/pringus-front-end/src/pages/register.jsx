/** @jsxImportSource @emotion/react */
//Login page
import React from 'react';
import LoginMenu from '../components/loginMenu';

function Register() {
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
            <LoginMenu isRegister/>
        </div>
    );
}

export default Register;