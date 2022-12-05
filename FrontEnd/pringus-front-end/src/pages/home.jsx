/** @jsxImportSource @emotion/react */
//Customer user homepage
import React from 'react';
import Box from '@mui/material/Box';
import Card from '../components/card';
import ObjectList from '../components/ObjectList';

import { redirect } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

import Login from './login';

function Home() {
    const [user, setUser] = useOutletContext();
    console.log("BOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
    

    React.useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")));
    }, []);



    let flights = [
        {
            "_id":{"$oid":"6386b98ea8a99f64acbd25cc"},
            "FlightID":"PR0001",
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
        },
        {
            "_id":{"$oid":"6386b98ea8a99f64acbd25cc"},
            "FlightID":"PR0001",
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
            {user === null ? (<Login />) : 
            (<>
                <ObjectList type="Flight" json={flights} />
                <ObjectList type="Suggested" json={flights} />
            </>)}
        </>
    );
}

export default Home;