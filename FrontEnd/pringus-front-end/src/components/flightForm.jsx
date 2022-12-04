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
        initialForm = {...json[0]};
    } else if (isAdd) {
        initialForm = {
            FlightID: "",
            Airline: "",
            Status: "",
            Origin: "",
            Destination: "",
            Price: "",
            FlightInfo: {
                Airplane: "",
                "Departure Time": "",
                "Arrival Time": "",
            }

        }
    }

    const [form, setForm] = React.useState(initialForm);

    let [aircraft, setAircraft] = React.useState(); //wait on api

    React.useEffect(() => {
        getAircraft().then((data) => { setAircraft(data) });
        console.log(aircraft);
    }, []);

    const handleFlightCodeChange = (event) => {
        let newForm = {...form};
        newForm.FlightID = event.target.value;
        setForm(newForm);
    }

    const handleAircraftChange = (event) => {
        let newForm = {...form};
        newForm.FlightInfo.Airplane = event.target.value;
        setForm(newForm);
    }

    const handleAirlineChange = (event) => {
        let newForm = {...form};
        newForm.Airline = event.target.value;
        setForm(newForm);
    }

    const handlePriceChange = (event) => {
        let newForm = {...form};
        newForm.Price = event.target.value;
        setForm(newForm);
    }

    const handleStatusChange = (event) => {
        let newForm = {...form};
        newForm.Status = event.target.value;
        setForm(newForm);
    }

    const handleOriginChange = (event) => {
        let newForm = {...form};
        newForm.Origin = event.target.value;
        setForm(newForm);
    }

    const handleDestinationChange = (event) => {
        let newForm = {...form};
        newForm.Destination = event.target.value;
        setForm(newForm);
    }

    const handleDepartureChange = (event) => {
        let newForm = {...form};
        newForm.FlightInfo["Departure Time"] = event.target.value;
        setForm(newForm);
    }

    const handleArrivalChange = (event) => {
        let newForm = {...form};
        newForm.FlightInfo["Arrival Time"] = event.target.value;
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

        fetch(`http://localhost:8080/Flights/` + isAdd ? "create" : "update", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
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
                    <TextField fullWidth size='small' placeholder="Flight Code" variant='outlined' value={form.FlightID} onChange={handleFlightCodeChange}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Select fullWidth value={form.FlightInfo.Airplane} onChange={handleAircraftChange}> 
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
                    <TextField fullWidth size='small' placeholder="Airline" value={form.Airline} onChange={handleAirlineChange}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth size='small' placeholder="Price" value={form.Price} onChange={handlePriceChange}/>
                </Grid>
                {isEdit ? (
                    <>
                        <Grid item xs={12} md={1.5}>
                            <Typography>Status</Typography>
                        </Grid>
                        <Grid item xs={12} md={10.5}>
                            <TextField fullWidth size='small' placeholder="Status" value={form.Status} onChange={handleStatusChange} />
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
                    <TextField fullWidth size='small' placeholder="Departure Airport" value={form.Origin} onChange={handleOriginChange}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth size='small' placeholder="Arrival Airport" value={form.Destination} onChange={handleDestinationChange}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography>Estimated Departure Time</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography>Estimated Arrival Time</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth size='small' placeholder="Departure Time" value={form.FlightInfo["Departure Time"]} onChange={handleDepartureChange}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth size='small' placeholder="Arrival Time" value={form.FlightInfo["Arrival Time"]} onChange={handleArrivalChange}/>
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