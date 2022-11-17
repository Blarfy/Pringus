/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';


function Card({children, style}) {
    let theme = useTheme();
    let staticStyle = {
        backgroundColor: `${theme.palette.card.background}`,
        borderRadius: "7px",
        border: `1px solid ${theme.palette.card.border}`,
        padding: "20px",
        width: "300px",
    }
    let cardStyle = {...staticStyle, ...style};
    return (<Box className="addForm" 
    sx={cardStyle}>
        {children}
    </Box>);
};

export default Card;