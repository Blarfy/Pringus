import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { createTheme, ThemeProvider } from '@mui/material/styles';


import ErrorPage from './pages/errorPage';

import Home from './pages/home';
import Login from './pages/login';
import FlightDetails from './pages/flightDetails';
import Dashboard from './pages/dashboard';
import UserDetails from './pages/userDetails';

import AddForm from './components/addFlightForm';
import Root from './components/root';

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
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
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
        element: <AddForm />,
      },
      {
        path: "/a/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/a/userDetails/:userId",
        element: <UserDetails />,
      }
    ]
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
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
