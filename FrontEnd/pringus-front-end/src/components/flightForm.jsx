/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react';
import { Button, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Buffer } from 'buffer';

import Card from './card';


function FlightForm({json, isAdd, isEdit}) {
    let theme = useTheme();
    let navigate = useNavigate();

    let initialForm; 

    if (isEdit) {
        initialForm = {...json};
    } else if (isAdd) {
        initialForm = {
            flightID: "",
            airline: "",
            status: "",
            origin: "",
            destination: "",
            price: "",
            flightInfo: {
                plane: {
                    code: "",
                },
                departureTime: "",
                arrivalTime: "",
            }

        }
    }

    const [form, setForm] = React.useState(initialForm);
    console.log("SSSSSSSSSSSSSSSSSSSSSSSSSUUUUUUUUUUUUUUUUHHHHHHHHHHHHHHHHHHHHH")
    console.log(json);
    console.log(initialForm);

    let [aircraft, setAircraft] = React.useState(); //wait on api

    React.useEffect(() => {
        getAircraft().then((data) => { setAircraft(data) });
        console.log(aircraft);
    }, []);

    const handleFlightCodeChange = (event) => {
        let newForm = {...form};
        newForm.dlightID = event.target.value;
        setForm(newForm);
    }

    const handleAircraftChange = (event) => {
        let newForm = {...form};
        newForm.flightInfo.plane.code = event.target.value;
        setForm(newForm);
    }

    const handleAirlineChange = (event) => {
        let newForm = {...form};
        newForm.airline = event.target.value;
        setForm(newForm);
    }

    const handlePriceChange = (event) => {
        let newForm = {...form};
        newForm.price = event.target.value;
        setForm(newForm);
    }

    const handleStatusChange = (event) => {
        let newForm = {...form};
        newForm.status = event.target.value;
        setForm(newForm);
    }

    const handleOriginChange = (event) => {
        let newForm = {...form};
        newForm.origin = event.target.value;
        setForm(newForm);
    }

    const handleDestinationChange = (event) => {
        let newForm = {...form};
        newForm.destination = event.target.value;
        setForm(newForm);
    }

    const handleDepartureChange = (event) => {
        let newForm = {...form};
        newForm.flightInfo.departureTime = event.target.value;
        setForm(newForm);
    }

    const handleArrivalChange = (event) => {
        let newForm = {...form};
        newForm.flightInfo.arrivalTime = event.target.value;
        setForm(newForm);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(form);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Basic " + Buffer.from("bob:spingleton").toString("base64"));

        var raw = JSON.stringify(form);

        var requestOptions = {
            method: isAdd ? "POST" : "PUT",
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        let url = `http://localhost:8080/Flights/${isAdd ? "addFlight" : "updateFlight/" + form.flightID}`;
        console.log(url);

        fetch(url, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .then(navigate("/a/dashboard"))
            .catch(error => console.log('error', error));
    }

    const handleCancel = (event) => {
        navigate("/a/dashboard");
    }

    return (
        <Card style={{width: "500px"}}>
            <Typography variant='h5'>{isAdd ? "Create" : "Edit"} Flight</Typography>
            {/* Fill form in with actual data ----------------------------------------------------------------------- */}
            {/* Rig up to 2 way bind -> Then rig up to backend */}
            <Grid container spacing={2} sx={{mt:"5px"}}>
                <Grid item xs={6} md={6}>
                    <Typography>Flight Code</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography>Aircraft</Typography>
                </Grid>
                <Grid item xs={6} md={6}>
                    {console.log("GONGONGONGONGONGONGGONGONGOGNGONGONGOGN")}
                    {console.log(form)}
                    <TextField fullWidth size='small' placeholder="Flight Code" variant='outlined' value={form.flightID} onChange={handleFlightCodeChange} disabled/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Select fullWidth value={form.flightInfo.plane.code} onChange={handleAircraftChange} disabled={!isAdd}> 
                        {aircraft ? aircraft.map((plane) => <MenuItem value={plane.code}>{plane.code}</MenuItem>) : <MenuItem value="Loading...">Loading...</MenuItem>}
                    </Select>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography>Airline</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography>Price</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth size='small' placeholder="Airline" value={form.airline} onChange={handleAirlineChange}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth size='small' placeholder="Price" value={form.price} onChange={handlePriceChange}/>
                </Grid>
                {isEdit ? (
                    <>
                        <Grid item xs={12} md={1.5}>
                            <Typography>Status</Typography>
                        </Grid>
                        <Grid item xs={12} md={10.5}>
                            <TextField fullWidth size='small' placeholder="Status" value={form.status} onChange={handleStatusChange} />
                        </Grid>
                    </>
                ) : null}
                <Grid item xs={12} md={6}>
                    <Typography>Departure Airport Code</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography>Arrival Airport Code</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth size='small' placeholder="Departure Airport" value={form.origin} onChange={handleOriginChange}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth size='small' placeholder="Arrival Airport" value={form.destination} onChange={handleDestinationChange}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography>Estimated Departure Time</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography>Estimated Arrival Time</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth size='small' placeholder="Departure Time" value={form.flightInfo.departureTime} onChange={handleDepartureChange}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth size='small' placeholder="Arrival Time" value={form.flightInfo.arrivalTime} onChange={handleArrivalChange}/>
                </Grid>
                <Grid item xs={0} md={6}></Grid>
                <Grid item xs={12} md={3}>
                    <Button variant='contained' color='secondary' fullwidth onClick={handleCancel}>Cancel</Button>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>Submit</Button>
                </Grid>
            </Grid>
        </Card>
    );
}

export default FlightForm;

const getAircraft = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Basic " + Buffer.from("bob:spingleton").toString("base64"));
    myHeaders.append("Access-Control-Allow-Origin", "http://localhost:3000");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    
    let response = await fetch(`http://localhost:8080/Planes/getAll`, requestOptions);
        
    let planes = await response.json();

    return planes;
}