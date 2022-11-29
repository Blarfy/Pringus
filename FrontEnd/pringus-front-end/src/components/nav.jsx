/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react';
import { styled, alpha } from '@mui/material/styles';
import { AppBar, Button, Grid, TextField, Toolbar, Typography, IconButton, MenuItem, Menu } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import InputBase from '@mui/material/InputBase';
import { Box } from '@mui/system';


import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import '../css/nav.css';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: "20px",
    width: '100%',
    // [theme.breakpoints.up('sm')]: {
    //   marginLeft: theme.spacing(1),
    //   width: '100%',
    // },
    flexGrow: 1
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
    //   [theme.breakpoints.up('sm')]: {
    //     width: '12ch',
    //     '&:focus': {
    //       width: '20ch',
    //     },
    //  },
    },
  }));



function Nav() {
    let theme = useTheme();

    let navigate = useNavigate();
    const routeChange = (key) => {
        navigate(key);
    }

    return (
        <AppBar sx={{height: "80px"}}>
            <Toolbar>
            <Button
                key="Home"
                onClick={() => routeChange("/")}
                sx={{ my: 2, color: 'white', display: 'block', fontWeight: 'bold', fontSize: '20px', pl: 0, width: "150px"}}
             >
                Pringus
            </Button>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                />
            </Search>
            <Button
                key="Admin"
                onClick={() => routeChange("/a/dashboard")}
                sx={{ my: 2, color: 'white', display: 'block', ml: "25 px" }}
             >
                Admin
            </Button>
            <Button
                key="Home"
                onClick={() => routeChange("/home")}
                sx={{ my: 2, color: 'white', display: 'block' }}
             >
                Home
            </Button>
            <Button 
                key="Login"
                onClick={() => routeChange("/login")}
                sx={{ my: 2, color: 'white', display: 'block' }}    
            >Login</Button>
            </Toolbar>
        </AppBar>
    );
}

export default Nav;