/** @jsxImportSource @emotion/react */
import React from 'react';
import { Fragment } from 'react';

import { Outlet } from 'react-router-dom';

import { Box } from '@mui/system';
import { useTheme } from '@emotion/react';

import Nav from './nav';

function Root() {
    const theme = useTheme();
    const [user, setUser] = React.useState(localStorage.getItem("user"));
    // let userOBJ = {
    //     user: "BUTTS",
    //     role: "ADMIN"
    // }
    // const [user, setUser] = React.useState(userOBJ);
    
    console.log("AHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
    console.log(user)
    return (
        <Box sx={{
            minHeight: "100vh",
            maxWidth: "100%",
            padding: 0,
            margin: 0,
            backgroundColor: `${theme.palette.canvas.main}`,
        }}>
            <Nav user={user} setUser={setUser} />
            <div css={{paddingTop: "100px", display: "flex", flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap", alignItems: "flex-start", width: "100%"}}>
            <Outlet context={[user, setUser]} />
            </div>
        </Box>
    );
}

export default Root;

