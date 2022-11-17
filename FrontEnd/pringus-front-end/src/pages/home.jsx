/** @jsxImportSource @emotion/react */
//Customer user homepage
import React from 'react';
import Box from '@mui/material/Box';
import Card from '../components/card';

function Home() {
    return (
        <>
            <Card style={{height: "500px"}}>Your flights</Card>
            <Card>Suggested Flights</Card>
        </>
    );
}

export default Home;