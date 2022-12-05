/** @jsxImportSource @emotion/react */
//Elevated User Dashboard
import { VolunteerActivismOutlined } from '@mui/icons-material';
import { Typography } from '@mui/material';
import React from 'react';

import { useOutletContext } from 'react-router-dom';
import { Buffer } from 'buffer';


import ObjectList from '../components/ObjectList';

import Login from './login';
import Home from './home';

async function getTopFlights() {
    console.log("Get top flights")
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Basic " + Buffer.from("bob:spingleton").toString("base64"));

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    let response = await fetch("http://localhost:8080/Flights/getTopFlights", requestOptions);
    let data = await response.json();
    console.log("ATTEMPING TOP FLIGHTS")
    return data.content;
}

async function getUsers() {
    console.log("Get users")
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Basic " + Buffer.from("bob:spingleton").toString("base64"));

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    let response = await fetch("http://localhost:8080/users/getAll", requestOptions);
    let data = await response.json();
    console.log("ATTEMPING USERS")
    console.log(data)
    return data;
}


function Dashboard() {
    const [user, setUser] = useOutletContext();
    console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC")
    console.log(user)

    const [list, setList] = React.useState([]);

    let userList = getUsers();
    userList.then((data) => {
        console.log("GET USERS")
        console.log(data)
        setList(data);
    })

    //let flight = [];
    const [flight, setFlight] = React.useState();

    //get the array from our promise
    let topFlights = getTopFlights();
    topFlights.then((data) => {
        console.log("TOP FLIGHTS")
        console.log(data)
        // flight = data;
        // console.log(flight);
        setFlight(data);
    })


    return (
        <>
            {user === null ? 
            (<Login />)
             : user.role === "ADMIN" ? (<>
                <ObjectList type="User" json={list} addButton isAdminPage />
                <ObjectList type="Flight" json={flight} addButton isAdminPage />
            </>) : (<Home />)}
            
        </>
    );
}

export default Dashboard;