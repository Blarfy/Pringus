/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react';
import { Button, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

import Card from './card';


function FlightForm({mode}) {
    let theme = useTheme();
    return (
        <Card style={{width: "500px"}}>
            <h1>{mode} Flight</h1>
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
                    <TextField fullWidth size='small' placeholder="Flight Code" variant='outlined' />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Select fullWidth>
                        <MenuItem value="A320">A320</MenuItem>
                        <MenuItem value="A321">A321</MenuItem>
                        <MenuItem value="A330">A330</MenuItem>
                        <MenuItem value="A350">A350</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography>Airline</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography>Price</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth size='small' placeholder="Airline" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth size='small' placeholder="Price" />
                </Grid>
                {mode === "Edit" ? (
                    <>
                        <Grid item xs={12} md={1.5}>
                            <Typography>Status</Typography>
                        </Grid>
                        <Grid item xs={12} md={10.5}>
                            <TextField fullWidth size='small' placeholder="Status" />
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
                    <TextField fullWidth size='small' placeholder="Departure Airport" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth size='small' placeholder="Arrival Airport" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography>Estimated Departure Time</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography>Estimated Arrival Time</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth size='small' placeholder="Departure Time" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth size='small' placeholder="Arrival Time" />
                </Grid>
                <Grid item xs={0} md={8}></Grid>
                <Grid item xs={12} md={3}>
                    <Button variant="contained" color="primary" fullWidth>Submit</Button>
                </Grid>
            </Grid>
        </Card>
    );
}

export default FlightForm;