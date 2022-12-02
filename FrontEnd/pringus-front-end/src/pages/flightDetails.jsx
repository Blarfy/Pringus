//Flight detail page
import React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '../components/card';

function FlightDetails() {
    let cardStyle = {
        width: "800px",
        height: "500px",
    }

    let flight = {
        "_id":{"$oid":"6386b98ea8a99f64acbd25cc"},
        "FlightID":"PR0", //Flight Number
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
        <Card style={cardStyle}>
            <Typography variant='h4'>Flight Details</Typography>
            <Grid container spacing={2} sx={{mt:"5px"}}>
                <Grid item xs={12} md={4}>
                    <Typography>Flight Number: {flight.FlightID}</Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Typography>Departure Airport: {flight.Origin}</Typography>
                    <Typography>Arrival Airport: {flight.Destination}</Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Typography>Price:</Typography>
                    <Typography>{flight.Price}</Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Typography>Airline:</Typography>
                    <Typography>{flight.Airline}</Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Typography>Aircraft:</Typography>
                    <Typography>{flight["Flight Info"].Airplane}</Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Typography>Departure Time: {flight["Flight Info"]["Departure Time"]}</Typography>
                    <Typography>Arrival Time: {flight["Flight Info"]["Arrival Time"]}</Typography>
                </Grid>
            </Grid>
        </Card>
        </>
    );
}

export default FlightDetails;