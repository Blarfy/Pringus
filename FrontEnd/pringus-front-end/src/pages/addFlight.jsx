/** @jsxImportSource @emotion/react */
//Add flight page
import React from 'react';

import FlightForm from '../components/flightForm';

function AddFlight() {
    return (
        <div className="AddFlight" >
            <FlightForm isAdd />
        </div>
    );
}

export default AddFlight;