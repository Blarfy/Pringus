import React from 'react';

import { useLoaderData } from 'react-router-dom';

import { Buffer } from 'buffer';

import UserForm from '../components/userForm';

function EditUser() {
    const user = useLoaderData();

    return (
        <UserForm isEdit json={user} />
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

    console.log(id);
    let response = await fetch(`http://localhost:8080/users/getByUserID/${id.params.userId}`, requestOptions);
    let user = await response.json();
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