/** @jsxImportSource @emotion/react */
import React from 'react';
import { Fragment } from 'react';

import { Outlet } from 'react-router-dom';

import { Box } from '@mui/system';
import { useTheme } from '@emotion/react';

import Nav from './nav';

function Root() {
    const theme = useTheme();
    return (
        <Box sx={{
            minHeight: "100vh",
            backgroundColor: `${theme.palette.canvas.main}`,
        }}>
            <Nav />
            <div css={{paddingTop: "100px", display: "flex", flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap"}}>
            <Outlet />
            </div>
        </Box>
    );
}

export default Root;

