/** @jsxImportSource @emotion/react */
//Elevated User Dashboard
import React from 'react';


import ObjectList from '../components/ObjectList';

function Dashboard() {
    let list = [
        {
            "id": 1,
            "username": "Bruce",
            "email": "email@gmail.com",
            "password": "password",
            "role": "customer",
            "tickets": []
        },
        {
            "id": 2,
            "username": "Bob",
            "email": "email2@gmail.com",
            "password": "passwordAgain",
            "role": "admin",
            "tickets": []
        },
        {
            "id": 3,
            "username": "Jerry",
            "email": "gorp@foo.bar",
            "password": "passwordOnceMore",
            "role": "associate",
            "tickets": []
        },
        {
            "id": 4,
            "username": "Skoo",
            "email": "goobough@shmail.com",
            "password": "passEl",
            "role": "customer",
            "tickets": ["AF-1234", "AF-1235"]
        },
    ];
    return (
        <>
            <ObjectList type="User" json={list} addButton />
            {/* <ObjectList type="Flight" /> */}
        </>
    );
}

export default Dashboard;