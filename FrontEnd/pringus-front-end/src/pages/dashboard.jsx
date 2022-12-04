/** @jsxImportSource @emotion/react */
//Elevated User Dashboard
import { VolunteerActivismOutlined } from '@mui/icons-material';
import { Typography } from '@mui/material';
import React from 'react';

import { useOutletContext } from 'react-router-dom';

import ObjectList from '../components/ObjectList';

import Login from './login';
import Home from './home';


function Dashboard() {
    const [user, setUser] = useOutletContext();
    console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC")
    console.log(user)
    

    let list = [
        {
            "id": 1,
            "username": "Bruce",
            "email": "email@gmail.com",
            "password": "password",
            "role": "customer",
            "tickets": []
        },
        {
            "id": 2,
            "username": "Bob",
            "email": "email2@gmail.com",
            "password": "passwordAgain",
            "role": "admin",
            "tickets": []
        },
        {
            "id": 3,
            "username": "Jerry",
            "email": "gorp@foo.bar",
            "password": "passwordOnceMore",
            "role": "associate",
            "tickets": []
        },
        {
            "id": 4,
            "username": "Skoo",
            "email": "goobough@shmail.com",
            "password": "passEl",
            "role": "customer",
            "tickets": ["AF-1234", "AF-1235"]
        },
    ];

    let flight = [
        {
            "_id":{"$oid":"6386b98ea8a99f64acbd25cc"},
            "FlightID":"PR0001",
            "Origin":"PEK",
            "Destination":"LXA",
            "Price":"339.56",
            "Airline":"Pringus Air",
            "status": "on time",
            "Flight Info": {
                "Departure Time":"n/a",
                "Arrival Time":"n/a",
                "Airplane":"319",
                "Seating": {
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
        },
        {
            "_id":{"$oid":"6386b98ea8a99f64acbd25cc"},
            "FlightID":"PR0",
            "Origin":"PEK",
            "Destination":"LXA",
            "Price":"339.56",
            "Airline":"Pringus Air",
            "Flight Info": {
                "Departure Time":"n/a",
                "Arrival Time":"n/a",
                "Airplane":"319",
                "Seating": {
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
    ];

    return (
        <>
            {user.role === "ADMIN" ? 
            (<>
                <ObjectList type="User" json={list} addButton isAdminPage />
                <ObjectList type="Flight" json={flight} addButton isAdminPage />
            </>) : user === null ? (<Login />) : (<Home />)}
            
        </>
    );
}

export default Dashboard;