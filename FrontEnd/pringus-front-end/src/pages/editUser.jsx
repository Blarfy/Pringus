import React from 'react';

import { useLoaderData } from 'react-router-dom';

import { redirect } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

import { Buffer } from 'buffer';

import Login from './login';
import Home from './home';

import UserForm from '../components/userForm';

function EditUser() {
    const targetUser = useLoaderData();
    const context = useOutletContext();

    return (
        <>
            {context.user.role === "ADMIN" ? <UserForm isEdit json={targetUser} /> : context.user === null ? (<Login />) : (<Home />)}
        </>
    );
}

export default EditUser;

export async function getUser(id) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Basic " + Buffer.from("bob:spingleton").toString("base64"));

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOPHHHHHHHHHHHHHHHHHHHHH")
    console.log(id);
    let response = await fetch(`http://localhost:8080/users/getByUsername/${id.params.userId}`, requestOptions);
    let textResponse = await response.text();
    //substring javascript
    textResponse = textResponse.substring(9, textResponse.length - 1);
    console.log(textResponse);
    
    let user = JSON.parse(textResponse);
    return user;

    // let sampleUser = {
    //         "email": "bobs@gobs.cobs",
    //         "firstName": "Bob",
    //         "lastName": "TheBuilder",
    //         "password": "$2a$10$TD2/58pUrytn/nU8TVa4d.hteof0TCx/8C0sqDKdAeiYKcyAvOSCm",
    //         "role": "ADMIN",
    //         "tickets": [
    //           {
    //             "$ref": "Tickets",
    //             "$id": {
    //               "$oid": "63880673b29fb757819c9c4f"
    //             }
    //           }
    //         ],
    //         "userID": "PU0001",
    //         "username": "bob"
    // }

    // return sampleUser;
}