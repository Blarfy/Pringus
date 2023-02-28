import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, useRouteLoaderData } from "react-router-dom";


import { createTheme, ThemeProvider } from '@mui/material/styles';


import ErrorPage from './pages/errorPage';

import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import FlightDetails from './pages/flightDetails';
import Dashboard from './pages/dashboard';
import EditUser from './pages/editUser';
import AddFlight from './pages/addFlight';
import EditFlight from './pages/editFlight';
import AddUser from './pages/addUser';
import SearchResults from './pages/searchResults';
import Flights from './pages/searchResults';

import Root from './components/root';


import { getFlight as flightLoader } from './pages/editFlight';
import { getUser as userLoader } from './pages/editUser';
import { getData as dataLoader } from './pages/dashboard';
import { loadHomeData as homeLoader } from './pages/home';
import { loadSearchResults as searchLoader } from './pages/searchResults';


//Router - https://reactrouter.com/en/main/start/tutorial
//Typescript: https://github.com/typescript-cheatsheets/react#reacttypescript-cheatsheets
//Color Tools - https://m2.material.io/inline-tools/color/ https://m2.material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=42A5F5&secondary.color=6200EA

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
            light: '#63a4ff',
            dark: '#004ba0',
        },
        secondary: {
            main: '#6200ea',
            light: '#9d46ff',
            dark: '#0a00b6',
        },
        error: {
            main: '#db4840',
            light: '#ff7b73',
            dark: '#a30000',
        },
        canvas: {
            main: '#E1E2E1',
        },
        card: {
            background: "#F5F5F6",
            border: "#cbcccc"
        }
    },
});
        

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/flightDetails/:flightId",
        element: <FlightDetails />,
        loader: flightLoader,
      },
      {
        path: "/home",
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/search/",
        element: <SearchResults />,
      },
      {
        path: "/search/:query",
        element: <SearchResults />,
        loader: searchLoader,
      }
    ]
  },
  {
    path: "/a",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/a/addFlight",
        element: <AddFlight />,
      },
      {
        path: "/a/editFlight/:flightId",
        element: <EditFlight />,
        loader: flightLoader,
      },
      {
        path: "/a/dashboard",
        element: <Dashboard />,
        loader: dataLoader,
      },
      {
        path: "/a/editUser/:userId",
        element: <EditUser />,
        loader: userLoader,
      },
      {
        path: "/a/addUser",
        element: <AddUser />,
      },
    ]
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  // -- This comment is from much after this was developed, but I think these tags are commented out because some rendering step was happening twice, and this was a way to prevent that. I probably should have fixed the logic of my code instead of commenting that out lol
  //<React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
