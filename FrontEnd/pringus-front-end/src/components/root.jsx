/** @jsxImportSource @emotion/react */
import React from 'react';
import { Fragment } from 'react';

import { Outlet } from 'react-router-dom';

import { Box } from '@mui/system';
import { useTheme } from '@emotion/react';

import Nav from './nav';
import Card from './card';
import { useEffect } from 'react';
import { Typography } from '@mui/material';



function Root() {
    const theme = useTheme();
    const [isLoading, setIsLoading] = React.useState(false);
    const [user, setUser] = React.useState(localStorage.getItem("user"));
    // let userOBJ = {
    //     user: "BUTTS",
    //     role: "ADMIN"
    // }
    // const [user, setUser] = React.useState(userOBJ);
    console.log("AHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
    console.log(isLoading);
    console.log(user)
    

    const contextTree = [];
    contextTree.user = user;
    contextTree.setUser = setUser;
    contextTree.isLoading = isLoading;
    contextTree.setIsLoading = setIsLoading;
    console.log(contextTree);


    return (
        <Box sx={{
            minHeight: "100vh",
            maxWidth: "100%",
            padding: 0,
            margin: 0,
            backgroundColor: `${theme.palette.canvas.main}`,
        }}>
            <Nav context={contextTree} />
            <div css={{paddingTop: "100px", display: "flex", flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap", alignItems: "flex-start", width: "100%"}}>
                {/* Dev window */}
                {/* <Card>
                    <p>Info</p>
                    <p>isLoading: {isLoading ? "true" : "false"}</p>
                    <p>user: {contextTree.user ? JSON.stringify(contextTree.user) : "null"}</p>
                    { user ? (
                    <p>role: {contextTree.user}</p>
                    ) : null}
                    
                </Card> */}
                {/* Scrapped */}
                {/* { isLoading ? (
                    <Card>
                        <Typography variant="h4">Loading...</Typography>
                    </Card>
                        ) : <Outlet context={contextTree} />} */}
                <Outlet context={contextTree} />
            </div>
        </Box>
    );
}

export default Root;