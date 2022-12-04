/** @jsxImportSource @emotion/react */
//Add flight page
import React from 'react';


import UserForm from '../components/userForm';

function AddUser() {
    return (
        <div className="AddFlight" >
            <UserForm isAdd />
        </div>
    );
}

export default AddUser;