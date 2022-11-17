/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

import Card from './card';


function AddForm() {
    let theme = useTheme();
    return (
        <Card style={{width: "500px"}}>
            <h1>Add Flight</h1>
            {/* Fill form in with actual data ----------------------------------------------------------------------- */}
            {/* Rig up to 2 way bind -> Then rig up to backend */}
            <Grid container spacing={2} sx={{mt:"5px"}}>
                <Grid item xs={12} md={5}>
                    <Typography>Flight Number</Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                    <TextField fullWidth size='small' placeholder="Flight Number" />
                </Grid>
                <Grid item xs={12} md={5}>
                    <Typography>Departure Airport</Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                    <TextField fullWidth size='small' placeholder="Departure Airport" />
                </Grid>
                <Grid item xs={12} md={5}>
                    <Typography>Arrival Airport</Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                    <TextField fullWidth size='small' placeholder="Arrival Airport" />
                </Grid>
                <Grid item xs={12} md={5}>
                    <Typography>Departure Airport</Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                    <TextField fullWidth size='small' placeholder="Departure Airport" />
                </Grid>
                <Grid item xs={12} md={5}>
                    <Typography>Arrival Airport</Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                    <TextField fullWidth size='small' placeholder="Arrival Airport" />
                </Grid>
                <Grid item xs={12} md={5}>
                    <Typography>Departure Airport</Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                    <TextField fullWidth size='small' placeholder="Departure Airport" />
                </Grid>
                <Grid item xs={12} md={5}>
                    <Typography>Arrival Airport</Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                    <TextField fullWidth size='small' placeholder="Arrival Airport" />
                </Grid>
                <Grid item xs={12} md={5}>
                    <Typography>Arrival Airport</Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                    <TextField fullWidth size='small' placeholder="Arrival Airport" />
                </Grid>

                <Grid item xs={0} md={8}></Grid>
                <Grid item xs={12} md={3}>
                    <Button variant="contained" color="primary" fullWidth>Submit</Button>
                </Grid>
            </Grid>
        </Card>
    );
}

export default AddForm;