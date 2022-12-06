/** @jsxImportSource @emotion/react */
//Elevated User Dashboard
import React from 'react';

import { redirect } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';

import { Buffer } from 'buffer';

import Login from './login';

import ObjectList from '../components/ObjectList';

function SearchResults () {
    const context = useOutletContext();
    const resultData = useLoaderData();
    console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOGGGGGGGGGGGGGGGHHHHHHHHHHHHHHHHHHHHHH");
    console.log(resultData);

    // let flights = [
    //     {
    //         "_id":{"$oid":"6386b98ea8a99f64acbd25cc"},
    //         "FlightID":"PR0",
    //         "Origin":"PEK",
    //         "Destination":"LXA",
    //         "Price":"339.56",
    //         "Airline":"Pringus Air",
    //         "Flight Info": {
    //             "Departure Time":"n/a",
    //             "Arrival Time":"n/a",
    //             "Airplane":"319",
    //             "Seating": {
    //                 "First Class": { 
    //                     "$numberInt":"12"
    //                 },
    //                 "Business Class": {
    //                     "$numberInt":"36"
    //                 },
    //                 "Economy Class": {
    //                     "$numberInt":"78"
    //                 }
    //             }
    //         }
    //     },
    //     {
    //         "_id":{"$oid":"6386b98ea8a99f64acbd25cc"},
    //         "FlightID":"PR0",
    //         "Origin":"PEK",
    //         "Destination":"LXA",
    //         "Price":"339.56",
    //         "Airline":"Pringus Air",
    //         "Flight Info": {
    //             "Departure Time":"n/a",
    //             "Arrival Time":"n/a",
    //             "Airplane":"319",
    //             "Seating": {
    //                 "First Class": { 
    //                     "$numberInt":"12"
    //                 },
    //                 "Business Class": {
    //                     "$numberInt":"36"
    //                 },
    //                 "Economy Class": {
    //                     "$numberInt":"78"
    //                 }
    //             }
    //         }
    //     }
    // ];
    return (
        <>
            {context.user === null ? (<Login />) : (
                <>  
                    {resultData !== undefined && resultData.byOrigin !== undefined && resultData.byOrigin.content.length > 0 ? 
                        (<ObjectList 
                            type="Flight" 
                            json={resultData.byOrigin.content} 
                            isSearchResult 
                            isAdminPage={ context.user.role === "ADMIN" ? true : false } 
                            header="Flights by Origin"
                        />) : console.log(resultData)}
                    {resultData !== undefined && resultData.byDestination !== undefined && resultData.byDestination.content.length > 0 ? 
                        (<ObjectList 
                            type="Flight" 
                            json={resultData.byDestination.content} 
                            isSearchResult 
                            isAdminPage={ context.user.role === "ADMIN" ? true : false } 
                            header="Flights by Destination"
                        />) : console.log(resultData)}
                    {resultData !== undefined && resultData.byPlane !== undefined && resultData.byPlane.content !== undefined ? 
                        (<ObjectList 
                            type="Flight" 
                            json={resultData.byPlane.content} 
                            isSearchResult 
                            isAdminPage={ context.user.role === "ADMIN" ? true : false } 
                            header="Flights by Plane Code"
                        />) : console.log(resultData)}
                </>
            )}
        </>
    );
}

export default SearchResults;

export async function loadSearchResults(props) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Basic " + Buffer.from("bob:spingleton").toString("base64"));
    myHeaders.append("Access-Control-Allow-Origin", "http://localhost:3000");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    let originResults = null;
    try {
        let response = await fetch("http://localhost:8080/Flights/getFlightsByOrigin/" + props.params.query, requestOptions);
        originResults = await response.json();
    } catch (error) {
        originResults = null;
    }

    let destinationResults = null;
    try {
        let response = await fetch("http://localhost:8080/Flights/getFlightsByDestination/" + props.params.query, requestOptions);
        destinationResults = await response.json();
    } catch (error) {
        destinationResults = null;
    }

    let planeResults = null;
    try {
        let response = await fetch("http://localhost:8080/Flights/getFlightsByPlaneCode/" + props.params.query, requestOptions);
        planeResults = await response.json();
    } catch (error) {
        planeResults = null;
    }
    
    

    let searchResults = {
        byDestination: destinationResults,
        byOrigin: originResults,
        byPlane: planeResults
    }
    console.log("IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIiiiiiiiiiiiiiiiiiiiicccccccccccccchhhhhhhhhhhhhhhh")
    console.log(searchResults);

    return searchResults;
}