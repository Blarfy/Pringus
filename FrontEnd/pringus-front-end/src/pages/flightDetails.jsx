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
        minHeight: "300px",
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

    // const getAirportName = async (airportCode) => {
    //     var myHeaders = new Headers();
    //     myHeaders.append("Content-Type", "application/json");
    //     myHeaders.append("Authorization", "Basic " + Buffer.from("bob:spingleton").toString("base64"));
    //     myHeaders.append("Access-Control-Allow-Origin", "http://localhost:3000");

    //     var requestOptions = {
    //         method: 'GET',
    //         headers: myHeaders,
    //         redirect: 'follow'
    //     };

    //     let response = await fetch(`http://localhost:8080/Planes/getByFlightID/${id.params.flightId}`, requestOptions);
    //     let flight = await response.json();
    //     // console.log(flight);
    //     return flight;
    // }


    const getDate = (date) => {
        let d = new Date(date);
        return d.toDateString();
    }

    const getTime = (date) => {
        let d = new Date(date);
        return d.toLocaleTimeString();
    }

    return (
        <>
        {user !== null ? (
        <Card style={cardStyle}>
            {console.log("AAHAHAHHAHAHAHAHAHHAHA")}
            {console.log(flight)}
            <Typography variant='h4'>Flight Details</Typography>
            <Grid container spacing={1} sx={{mt:"5px"}}>
                {/* <Grid item xs={12} md={12}>
                    <Typography variant='h3'>Salt Lake City to Boston</Typography>
                </Grid> */}
                <Grid item xs={12} md={3}>
                    <Typography>Flight Code:</Typography>
                    <Typography>{flight.flightID}</Typography>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Typography>Price:</Typography>
                    <Typography>{flight.price}</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography>Airline:</Typography>
                    <Typography>{flight.airline}</Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Typography>Departure Airport: {flight.origin}</Typography>
                    <Typography>Arrival Airport: {flight.destination}</Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Typography>Aircraft:</Typography>
                    <Typography>{flight.flightInfo.plane.code}</Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                    
                    <Typography>Departure: </Typography>
                    <Typography>{getDate(flight.flightInfo.departureTime)} {getTime(flight.flightInfo.departureTime)}</Typography>
                    <Typography>Arrival:</Typography>
                    <Typography>{getDate(flight.flightInfo.arrivalTime)} {getTime(flight.flightInfo.arrivalTime)}</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                </Grid>
                <Grid item xs={12} md={3}>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Button variant='contained' color='secondary' onClick={(event) => navigate(-1)} fullWidth>Go Back</Button>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Button variant='contained' onClick={(event) => navigate("/somewhere")} disabled fullWidth>Choose seat and book flight</Button> {/* UPDATE LINK */}
                </Grid>
            </Grid>
        </Card>) : (<Login />)}
        </>
    );
}

export default FlightDetails;