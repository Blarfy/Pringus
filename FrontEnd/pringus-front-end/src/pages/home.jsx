/** @jsxImportSource @emotion/react */
//Customer user homepage
import React from 'react';
import Box from '@mui/material/Box';
import Card from '../components/card';
import ObjectList from '../components/ObjectList';

import { redirect } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';

import { Buffer } from 'buffer';

import Login from './login';

function Home() {
    const [user, setUser] = useOutletContext();
    console.log("BOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
    

    React.useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")));
    }, []);

    const homeData = useLoaderData();


    const [flights, setFlights] = React.useState([]);

    return (
        <>
            {user === null ? (<Login />) : 
            (<>
                <ObjectList type="Flight" json={homeData.flights} />
                <ObjectList type="Suggested" json={homeData.suggested} maxShown={3}/>
            </>)}
        </>
    );
}

export default Home;

export async function loadHomeData() {
    let homeData = {
        "flights": [],
        "suggested": []
    }

    let user = JSON.parse(localStorage.getItem("user"));
    let tickets = user.tickets;
    console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOGHHHHHHHHHHHHHHHH")
    console.log(tickets)

    for (let i = 0; i < tickets.length; i++) {
        let ticket = await getTicket(tickets[i]); 
        console.log(ticket)
        let flight = await getFlight(ticket.flight.flightID); //---------------------- ticket api not returning flightID
        // let flight = await getFlight("PR" + tickets[i].substring(2));
        console.log(flight)
        homeData.flights.push(flight);
    }

    homeData.suggested.push(await getFlight("PR0420"));
    homeData.suggested.push(await getFlight("PR0069"));
    homeData.suggested.push(await getFlight("PR0196"));
    homeData.suggested.push(await getFlight("PR0117"));
    homeData.suggested.push(await getFlight("PR0003"));

    return homeData;
}

async function getFlight(id) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Basic " + Buffer.from("bob:spingleton").toString("base64"));
    myHeaders.append("Access-Control-Allow-Origin", "http://localhost:3000");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    let response = await fetch(`http://localhost:8080/Flights/getByFlightID/${id}`, requestOptions);
    let flight = await response.json();
    
    // console.log(flight);
    return flight;
}

async function getTicket(id) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Basic " + Buffer.from("bob:spingleton").toString("base64"));
    myHeaders.append("Access-Control-Allow-Origin", "http://localhost:3000");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    let response = await fetch(`http://localhost:8080/tickets/getTicket/${id}`, requestOptions);
    let ticket = await response.json();

    return ticket;
}