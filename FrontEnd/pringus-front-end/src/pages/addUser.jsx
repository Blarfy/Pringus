/** @jsxImportSource @emotion/react */
//Add flight page
import React from 'react';

import { redirect } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

import UserForm from '../components/userForm';

import Login from './login';
import Home from './home';

function AddUser() {
    const context = useOutletContext();

    

    return (
        <>
            {context.user.role === "ADMIN" ? <UserForm isAdd /> : context.user === null ? (<Login />) : (<Home />)}
            
        </>
    );
}

export default AddUser;