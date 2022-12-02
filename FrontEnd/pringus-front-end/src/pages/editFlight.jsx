/** @jsxImportSource @emotion/react */
//Edit flight page
import React from 'react';

import FlightForm from '../components/flightForm';

function EditFlight() {
    return (
        <div className="AddFlight" >
            <FlightForm mode="Edit" />
        </div>
    );
}

export default EditFlight;