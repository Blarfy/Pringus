/** @jsxImportSource @emotion/react */
//Add flight page
import React from 'react';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

import Login from './login';
import Home from './home';

import FlightForm from '../components/flightForm';

function AddFlight() {
    let navigate = useNavigate();
    const context = useOutletContext();

    return (
        <>
            {context.user.role === "ADMIN" ? <FlightForm isAdd /> : context.user === null ? (<Login />) : (<Home />)}
        </>
    );
}

export default AddFlight;