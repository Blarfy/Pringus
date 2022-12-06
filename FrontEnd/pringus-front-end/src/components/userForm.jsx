/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react';
import { Button, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Buffer } from 'buffer';

import Card from './card';

function UserForm({json, isAdd, isEdit}) {
    let theme = useTheme();
    let navigate = useNavigate();

    let initialForm; 
    let initialTickets;

    if (isEdit) {
        console.log("___________________________________________________________")
        console.log(json);
        initialForm = {...json};
        if (initialForm.tickets) {
            initialTickets = initialForm.tickets.map((ticket) => {
                let ticketList = [];
                ticketList.push(ticket.id);
                return ticketList;
            });
            delete initialForm.tickets;
        }
        if (initialForm.password) {
            delete initialForm.password;
        }
        console.log(initialForm);
    } else if (isAdd) {
        initialForm = {
                "email": "",
                "firstName": "",
                "lastName": "",
                "username": "",
                "password": "",
                "role": "CUSTOMER",
                "tickets": [],
                "userID": ""
        }
    }

    const [form, setForm] = React.useState(initialForm);
    const [tickets, setTickets] = React.useState(initialTickets);


    const handleSubmit = (event) => {
        event.preventDefault();
        if (isAdd) {
            addNewUser(form);
        } else if (isEdit) {
            editUser(form);
        }
        //navigate('/a/dashboard');
    }

    const addNewUser = (form) => {
        let url = 'http://localhost:8080/users/createUser';
        let auth = "Basic " + Buffer.from("bob:spingleton").toString("base64");
        let body = JSON.stringify(form);
        console.log(body);
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": auth
            },
            body: body
        }
        fetch(url, options)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));
    }

    const editUser = (form) => {
        console.log(form);
        let url = 'http://localhost:8080/users/updateUser/' + form.userID;
        let auth = "Basic " + Buffer.from("bob:spingleton").toString("base64");
        console.log(tickets);
        let body = {
            user : {...form},
            tickets : tickets
        }
        console.log(body);
        let options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": auth
            },
            body: JSON.stringify(body)
        }
        fetch(url, options).catch(error => console.log(error));
    }

    const handleUsernameChange = (event) => {
        let newForm = {...form};
        newForm.username = event.target.value;
        setForm(newForm);
    }

    const handleFirstNameChange = (event) => {
        let newForm = {...form};
        newForm.firstName = event.target.value;
        setForm(newForm);
    }

    const handleLastNameChange = (event) => {
        let newForm = {...form};
        newForm.lastName = event.target.value;
        setForm(newForm);
    }

    const handleEmailChange = (event) => {
        let newForm = {...form};
        newForm.email = event.target.value;
        setForm(newForm);
    }

    const handlePasswordChange = (event) => {
        let newForm = {...form};
        newForm.password = event.target.value;
        setForm(newForm);
    }

    const handleRoleChange = (event) => {
        let newForm = {...form};
        newForm.role = event.target.value;
        setForm(newForm);
    }

    return (
        <Card style={{width: "400px"}}>
            <Typography variant="h6" sx={{padding: "10px"}}>{isAdd ? "Add User" : "Edit User"}</Typography>
            <Grid container spacing={2} sx={{padding: "10px"}}>
                <Grid item xs={12}>
                    {isEdit ? (<>
                        <Typography>Username: {form.username}</Typography>
                    </>) : (
                        <TextField
                        required
                        label="Username"
                        variant="outlined"
                        fullWidth
                        value={form.username}
                        onChange={handleUsernameChange}
                    />
                    )}
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        value={form.firstName}
                        onChange={handleFirstNameChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        value={form.lastName}
                        onChange={handleLastNameChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={form.email}
                        onChange={handleEmailChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        label="Password"
                        variant="outlined"
                        fullWidth
                        value={form.password}
                        onChange={handlePasswordChange}
                    />
                </Grid>
                {isEdit ? (
                <Grid item xs={12}>
                    <Typography>User's Tickets</Typography>
                    {console.log("PRINT")}
                    {console.log(form)}
                    {/* MAP THROUGH TICKETS ----------------------------------------------- */}
                </Grid>
                ) : null}
                <Grid item xs={12}>
                    <Select
                        label="ROLE"
                        variant="standard"
                        fullWidth
                        value={form.role}
                        onChange={handleRoleChange}
                    >
                        <MenuItem value="ADMIN">Admin</MenuItem>
                        <MenuItem value="ASSOCIATE">Associate</MenuItem>
                        <MenuItem value="CUSTOMER">Customer</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            backgroundColor: `${theme.palette.primary.main}`,
                            color: `${theme.palette.primary.contrastText}`
                        }}
                        onClick={handleSubmit}
                    >
                        {isAdd ? "Add User" : "Edit User"}
                    </Button>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            backgroundColor: `${theme.palette.secondary.main}`,
                            color: `${theme.palette.secondary.contrastText}`,
                            marginTop: "10px"
                        }}
                        onClick={() => {
                            setForm(initialForm);
                            navigate("/a/dashboard")
                        }}
                    >
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </Card>
    );
}

export default UserForm;