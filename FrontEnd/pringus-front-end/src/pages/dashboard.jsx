/** @jsxImportSource @emotion/react */
//Elevated User Dashboard
import { VolunteerActivismOutlined } from '@mui/icons-material';
import { Typography } from '@mui/material';
import React from 'react';

import { useOutletContext } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import { Buffer } from 'buffer';


import ObjectList from '../components/ObjectList';

import Login from './login';
import Home from './home';

export async function getTopFlights() {
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

export async function getUsers() {
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

export async function getData() {
    let data = {
        "topFlights": await getTopFlights(),
        "users": await getUsers()
    }

    return data;
}


function Dashboard() {
    const [user, setUser] = useOutletContext();
    let data = useLoaderData();
    console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC")
    console.log(user)

    // const [list, setList] = React.useState([]);

    // let userList = getUsers();
    // userList.then((data) => {
    //     console.log("GET USERS")
    //     console.log(data)
    //     setList(data);
    // })

    //let flight = [];
    //const [flight, setFlight] = React.useState();

    // //get the array from our promise
    // let topFlights = getTopFlights();
    // topFlights.then((data) => {
    //     console.log("TOP FLIGHTS")
    //     console.log(data)
    //     // flight = data;
    //     // console.log(flight);
    //     setFlight(data);
    // })

    // const flightList = async () => {
    //     let flights = await getTopFlights();
    //     flights.then((data) => {
    //         console.log("TOP FLIGHTS")
    //         console.log(data)
    //     })

    //     if (flights === null) {
    //         return <Typography>Loading</Typography>
    //     } else if (flights.length === 0) {
    //         return <Typography>No flights found</Typography>
    //     } else {
    //         return <ObjectList type="User" json={flights} addButton isAdminPage />
    //     }
    // }

    // const userList = async () => {
    //     let users = await getUsers();

    //     if (users === null) {
    //         return <Typography>Loading</Typography>
    //     } else if (users.length === 0) {
    //         return <Typography>No users found</Typography>
    //     } else {
    //         return <ObjectList type="User" json={users} addButton isAdminPage />
    //     }
    // }


    return (
        <>
            {user === null ? 
            (<Login />)
             : user.role === "ADMIN" ? (<>
            <ObjectList type="User" json={data.users} addButton isAdminPage />
            <ObjectList type="Flight" json={data.topFlights} addButton isAdminPage />
                
            </>) : (<Home />)}
            
        </>
    );
}

export default Dashboard;