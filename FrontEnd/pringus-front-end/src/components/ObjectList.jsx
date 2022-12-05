/** @jsxImportSource @emotion/react */
//Login page
import { Button, Table, TableHead, TableRow, TableCell, TableBody, Popper, Grow, Paper, ClickAwayListener, MenuItem, MenuList } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './card';

function ObjectList({style, json, type, addButton, isAdminPage, isSearchResult}) {
    //Type is the type of object being listed Ex: Flight, User, etc.
    //Json is the json object to be listed
    //Style is the style of the object list
    let navigate = useNavigate();
    const routeChange = (key) => {
        let path = "/home";
        console.log(key);
        navigate(key);
    }

    console.log("JSON: ");
    console.log(json);

    const [open, setOpen] = React.useState(Array(json.length).fill(false));
    console.log("OPEN INTIALIZE: ");
    console.log(open);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    console.log(selectedIndex);
    const itemsRef = React.useRef(new Array(json.length).fill(null));

    // useEffect(() => {
    //     itemsRef.current[selectedIndex] = itemsRef.current[selectedIndex].slice(0, json.length);
    // }, [json.length, selectedIndex]);

    const handleToggle = (event, i) => {
        setSelectedIndex(i);

        setOpen((prevOpen) => {
            const newOpen = [...prevOpen];
            newOpen[i] = !prevOpen[i];
            return newOpen;
        });
    };

    const handleClose = (event, i) => {
        if (itemsRef.current[i] && itemsRef.current[i].contains(event.target)) {
            return;
        }

        setOpen((state, props) => {
            const newState = [...state];
            console.log("AHHHHH" + i);
            newState[i] = false;
            return newState;
        });
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen((state, props) => {
                const newState = [...state];
                newState[selectedIndex] = false;
                return newState;
            });
        } else if (event.key === 'Escape') {
            setOpen((state, props) => {
                const newState = [...state];
                newState[selectedIndex] = false;
                return newState;
            });
        }
    }

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current[selectedIndex] === true && open[selectedIndex] === false) {
            itemsRef.current[selectedIndex].focus();
            
        }

        // console.log("itemsRef + " + itemsRef.current[selectedIndex]);
        // console.log("selectedIndex + " + selectedIndex);
        // console.log("open + " + open[selectedIndex]);
        // console.log(typeof open);
        // console.log("PREVOPEN");
        // console.log(prevOpen);
        //console.log(anchorRef.current);
        prevOpen.current[selectedIndex] = open[selectedIndex];
    }, [open, selectedIndex]);

    // React.useEffect(() => {
    //     console.log("DELINIEATOR OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
    //     console.log(open);
    //     console.log(typeof open);

    // }, [open]);


    let staticStyle = {
        width: "550px",
        height: "600px",
        padding: 0,
        marginBottom: "20px",
    }
    let objectListStyle = {...staticStyle, ...style};

    return (
        <Card style={objectListStyle}>
            <h1 css={{marginLeft: "20px", marginTop: "20px"}}>
                { isSearchResult ? "Results" : type === "Flight" ? "Flights" : type === "User" ? "Users" : type === "Suggested" ? "Suggested Flights" : "" }
            </h1>
            <Table>
                <TableHead>
                    {type === "User" ? 
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell></TableCell>
                    </TableRow> : null }
                    {type === "Flight" ? 
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Origin</TableCell>
                        <TableCell>Destination</TableCell>
                        <TableCell>Airline</TableCell>
                        <TableCell></TableCell>
                    </TableRow> : null }
                    {type === "Suggested" ? 
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Origin</TableCell>
                        <TableCell>Destination</TableCell>
                        <TableCell>Airline</TableCell>
                        <TableCell></TableCell>
                    </TableRow> : null }
                </TableHead>
                <TableBody>
                    {type === "User" ? json.map((item, i) => {
                        console.log("ITEM");
                        console.log(item);
                        return (
                        <TableRow>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.username}</TableCell>
                            <TableCell>{item.role}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>
                                <Button 
                                    variant='contained' 
                                    size='small'
                                    ref={(element) => {
                                        // console.log("element " + element);
                                        // console.log("itemsRef " + itemsRef.current[i]);
                                        if (element) {
                                            itemsRef.current[i] = element;
                                        }
                                        // console.log("itemsRef AFTER " + itemsRef.current[i]);
                                        // console.log(item)
                                        // console.log(i);
                                    }}
                                    aria-controls={open[i] ? 'menu-list-grow' : undefined}
                                    aria-haspopup="true"
                                    onClick={(event) => handleToggle(event, i)}
                                    id={i}
                                    >Options</Button>
                                    <Popper 
                                        open={open[i]} 
                                        anchorEl={itemsRef.current[selectedIndex]} 
                                        role={undefined} 
                                        transition 
                                    >
                                        {({ TransitionProps, placement }) => (
                                            <Grow 
                                                {...TransitionProps} 
                                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                            >
                                                <Paper>
                                                    <ClickAwayListener onClickAway={(event) => handleClose(event, i)}>
                                                        <MenuList 
                                                            autoFocusItem={open[i]} 
                                                            id="menu-list-grow" 
                                                            onKeyDown={handleListKeyDown}
                                                        >
                                                            <MenuItem onClick={(event) => {
                                                                handleClose(event, i)
                                                                navigate("/a/editUser/" + item.id);
                                                            }}>Edit</MenuItem>
                                                            <MenuItem onClick={(event) => {
                                                                handleClose(event, i)
                                                                // handleDelete(item.id);
                                                                }}>Delete</MenuItem>
                                                        </MenuList>
                                                    </ClickAwayListener>
                                                </Paper>
                                            </Grow>
                                        )}
                                    </Popper>
                            </TableCell>
                        </TableRow>
                    )}) : null}
                    {type === "Flight" ? json.map((item, i) => (
                        <TableRow>
                            <TableCell>{item.FlightID}</TableCell>
                            <TableCell>{item.Origin}</TableCell>
                            <TableCell>{item.Destination}</TableCell>
                            <TableCell>{item.Airline}</TableCell>
                            {isAdminPage ? 
                            <TableCell>
                                <Button 
                                    variant='contained' 
                                    size='small'
                                    ref={(element) => {
                                        // console.log("element " + element);
                                        // console.log("itemsRef " + itemsRef.current[i]);
                                        if (element) {
                                            itemsRef.current[i] = element;
                                        }
                                        // console.log("itemsRef AFTER " + itemsRef.current[i]);
                                        // console.log(item)
                                        // console.log(i);
                                    }}
                                    aria-controls={open[i] ? 'menu-list-grow' : undefined}
                                    aria-haspopup="true"
                                    onClick={(event) => handleToggle(event, i)}
                                    id={i}
                                    >Options</Button>
                                    <Popper 
                                        open={open[i]} 
                                        anchorEl={itemsRef.current[selectedIndex]} 
                                        role={undefined} 
                                        transition 
                                    >
                                        {({ TransitionProps, placement }) => (
                                            <Grow 
                                                {...TransitionProps} 
                                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                            >
                                                <Paper>
                                                    <ClickAwayListener onClickAway={(event) => handleClose(event, i)}>
                                                        <MenuList 
                                                            autoFocusItem={open[i]} 
                                                            id="menu-list-grow" 
                                                            onKeyDown={handleListKeyDown}
                                                        >
                                                            <MenuItem onClick={(event) => {
                                                                handleClose(event, i)
                                                                navigate("/a/editFlight/" + item.FlightID);
                                                            }}>Edit</MenuItem>
                                                            <MenuItem onClick={(event) => {
                                                                handleClose(event, i)
                                                                // handleDelete(item.id);
                                                                }}>Delete</MenuItem>
                                                        </MenuList>
                                                    </ClickAwayListener>
                                                </Paper>
                                            </Grow>
                                        )}
                                    </Popper>
                            </TableCell>
                            : 
                            <TableCell>
                                <Button variant='contained' size='small' onClick={() => {navigate("/flightDetails/" + item.FlightID)}}>Details</Button>
                            </TableCell>
                            }
                        </TableRow>
                    )) : null}
                    {type === "Suggested" ? json.map((item, i) => {
                        return (
                        <TableRow>
                        <TableCell><img src='https://lh3.googleusercontent.com/U3iL-wtuPBTVic6Uvy2GM5_iZQviRegMinSx9e1ZaCkipcifVkunt0CEaqFJr0xby87g2iDdcnz45umfFgalWumRDq7nF6ZjLykdXIHwlWU37E8=e365-rw-v0-w580' width={"100px"} height={"100px"} /></TableCell>
                        <TableCell>{item.Origin}</TableCell>
                        <TableCell>{item.Destination}</TableCell>
                        <TableCell>{item.Airline}</TableCell>
                        <TableCell>
                            <Button variant='contained' size='small' onClick={() => {navigate("/flightDetails/" + item.FlightID)}}>Details</Button>
                        </TableCell>
                    </TableRow>
                    )}) : null}
                    {type === "Template" ? json.map((item, i) => (
                        <></>
                    )) : null}
                </TableBody>
            </Table>
            { addButton ? 
                <Button 
                    variant='contained' 
                    color='secondary'
                    onClick={() => navigate("/a/add" + type)} //handleAdd
                    sx={{marginLeft: "400px", marginTop: "20px", width: "120px"}}
                >
                    Add {type}
                </Button> 
            : null }
        </Card>
    )
}

export default ObjectList;