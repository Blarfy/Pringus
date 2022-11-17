import React from 'react';

import { useRouteError } from 'react-router-dom';

function ErrorPage() {
    const error = useRouteError()
    console.error(error)
    
    return (
        <div className="Error">
            <h1>Error Page</h1>
            <p>{error.status}</p>
            <p>{error.statusText || error.message}</p>
        </div>
    );
}

export default ErrorPage;