//Flight detail page
import React from 'react';

import { useNavigate } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import Card from '../components/card';
import Login from './login';

function FlightDetails() {
    let navigate = useNavigate();
    const flight = useLoaderData();
    const [user, setUser] = useOutletContext();

    let cardStyle = {
        width: "600px",
        height: "500px",
    }

    let flight1 = {
        "_id":{"$oid":"6386b98ea8a99f64acbd25cc"},
        "FlightID":"PR001", //Flight Number
        "Origin":"PEK", //Origin Airport
        "Destination":"LXA", //Destination Airport
        "Price":"339.56", //Price
        "Airline":"Pringus Air", //Airline
        "Flight Info": {
            "Departure Time":"n/a", //Departure Time
            "Arrival Time":"n/a", //Arrival Time
            "Airplane":"319", //Airplane
            "Seating": { //Seating
                "First Class": { 
                    "$numberInt":"12"
                },
                "Business Class": {
                    "$numberInt":"36"
                },
                "Economy Class": {
                    "$numberInt":"78"
                }
            }
        }
    }

    return (
        <>
        {user === null ? (
        <Card style={cardStyle}>
            <Typography variant='h4'>Flight Details</Typography>
            <Grid container spacing={1} sx={{mt:"5px"}}>
                <Grid item xs={12} md={12}>
                    <Typography variant='h3'>Salt Lake City to Boston</Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Typography>Flight Code:</Typography>
                    <Typography>{flight.FlightID}</Typography>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Typography>Price:</Typography>
                    <Typography>{flight.Price}</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography>Airline:</Typography>
                    <Typography>{flight.Airline}</Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Typography>Departure Airport: {flight.Origin}</Typography>
                    <Typography>Arrival Airport: {flight.Destination}</Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Typography>Aircraft:</Typography>
                    <Typography>{flight["Flight Info"].Airplane}</Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Typography>Departure Time: {flight["Flight Info"]["Departure Time"]}</Typography>
                    <Typography>Arrival Time: {flight["Flight Info"]["Arrival Time"]}</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                </Grid>
                <Grid item xs={12} md={12}>
                </Grid>
                <Grid item xs={12} md={6}>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Button variant='contained' onClick={(event) => navigate("/somewhere")} >Choose seat and book flight</Button> {/* UPDATE LINK */}
                </Grid>
            </Grid>
        </Card>) : (<Login />)}
        </>
    );
}

export default FlightDetails;