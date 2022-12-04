/** @jsxImportSource @emotion/react */
//Edit flight page
import React from 'react';

import { useLoaderData } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

import { Buffer } from 'buffer';

import Login from './login';
import Home from './home';

import FlightForm from '../components/flightForm';

function EditFlight() {
    const [user, setUser] = useOutletContext();

    const flight = useLoaderData();

    return (
        <>
            {user.role === "ADMIN" ? <FlightForm json={flight} isEdit /> : user === null ? (<Login />) : (<Home />)}
             
        </>
    );
}

export default EditFlight;

export async function getFlight(id) {
    // let xhr = new XMLHttpRequest();
    // xhr.open('GET', `http://localhost:8080/Flights/getByFlightID/${id}`, true);
    // console.log(Buffer.from("bob:spingleton").toString("base64"))
    // xhr.setRequestHeader("Content-Type", "application/json");
    // xhr.setRequestHeader("Authorization", "Basic " + Buffer.from("bob:spingleton").toString("base64"));
    //

    // xhr.onreadystatechange = () => {
    //     if (xhr.readyState === 4) {
    //         if (xhr.status === 200) {
    //             let flight = JSON.parse(xhr.responseText);
    //             console.log(flight);
    //             return flight;
    //         }
    //     }
    // }
    // xhr.send();

    // let response = await fetch(`http://localhost:8080/Flights/getByFlightID/${id}`, {
    //     method: 'GET',
    //     headers: [
    //         ['Content-Type', 'application/json'],
    //         ["Authorization", "Basic " + Buffer.from("bob:spingleton").toString("base64")],
    //         //"Access-Control-Allow-Origin": "http://localhost:3000"
    //     ]
    // });
    // let flight = await response.json();
    // console.log(response.status);
    // console.log(flight);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Basic " + Buffer.from("bob:spingleton").toString("base64"));
    myHeaders.append("Access-Control-Allow-Origin", "http://localhost:3000");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    let response = await fetch(`http://localhost:8080/Flights/getByFlightID/${id.params.flightId}`, requestOptions);
    let flight = await response.json();
    // console.log(flight);
    return flight;

}