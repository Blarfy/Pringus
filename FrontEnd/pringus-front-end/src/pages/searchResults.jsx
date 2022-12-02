/** @jsxImportSource @emotion/react */
//Elevated User Dashboard
import React from 'react';


import ObjectList from '../components/ObjectList';

function SearchResults () {
    let flights = [
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
            <ObjectList type="Flight" json={flights} isSearchResult isAdminPage={false/* isAdmin */} />
            {/* {isAdmin ? <ObjectList type="User" json={list} addButton isAdminPage /> : null} */}
        </>
    );
}

export default SearchResults;