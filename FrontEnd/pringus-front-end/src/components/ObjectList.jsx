/** @jsxImportSource @emotion/react */
//Login page
import { Button, Table, TableHead, TableRow, TableCell, TableBody, Popper, Grow, Paper, ClickAwayListener, MenuItem, MenuList } from '@mui/material';
import React, { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Card from './card';

function ObjectList({style, json, type, addButton, isAdminPage, isSearchResult, maxShown, header}) {
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

    const [open, setOpen] = React.useState(Array(json ? json.length : 5).fill(false));
    console.log("OPEN INTIALIZE: ");
    console.log(open);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    console.log(selectedIndex);
    const itemsRef = React.useRef(new Array(json ? json.length : 5).fill(null));

    const homeData = useLoaderData();
    const [isLongList, setIsLongList] = React.useState(false);
    const initialShown = maxShown ? maxShown : 7;
    console.log("YOUUUWWWCHHH");
    console.log(initialShown);
    const [listShown, setListShown] = React.useState(initialShown);

    if (!isLongList && (json ? json.length : 0) > initialShown) setIsLongList(true);
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

    const handleDeleteUser = async (id) => { //-------------- untested
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Basic " + Buffer.from("bob:spingleton").toString("base64"));

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        console.log(id);
        let response = await fetch(`http://localhost:8080/users/deleteUser/${id}`, requestOptions);
    }

    const handleDeleteFlight = async (id) => { //-------------- untested
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Basic " + Buffer.from("bob:spingleton").toString("base64"));

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        console.log(id);
        let response = await fetch(`http://localhost:8080/users/deleteFlight/${id}`, requestOptions);
    }

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

        prevOpen.current[selectedIndex] = open[selectedIndex];
    }, [open, selectedIndex]);

    let staticStyle = {
        minWidth: "550px",
        minHeight: "600px",
        padding: 0,
        paddingBottom: "20px",
        marginBottom: "20px",
    }
    if (type === "Flight" || type === "Suggested") {
        staticStyle.minWidth = "600px";
    }
    let objectListStyle = {...staticStyle, ...style};

    return (
        <Card style={objectListStyle}>
            <h1 css={{marginLeft: "20px", marginTop: "20px"}}>
                { header ? header : isSearchResult ? "Results" : type === "Flight" ? "Flights" : type === "User" ? "Users" : type === "Suggested" ? "Suggested Flights" : "" }
                
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
                        <TableCell>Status</TableCell>
                        <TableCell>Airline</TableCell>
                        <TableCell>Aircraft</TableCell>
                        <TableCell></TableCell>
                    </TableRow> : null }
                    {type === "Suggested" ? 
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Origin</TableCell>
                        <TableCell>Destination</TableCell>
                        <TableCell>Airline</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell></TableCell>
                    </TableRow> : null }
                </TableHead>
                <TableBody>
                    {type === "User" && json ? json.map((item, i) => {
                        console.log("ITEM");
                        console.log(item);
                        if (i < listShown) {
                            return (
                                <TableRow>
                                    <TableCell>{item.userID}</TableCell>
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
                                                                        handleDeleteUser(item.id);
                                                                        }}>Delete</MenuItem>
                                                                </MenuList>
                                                            </ClickAwayListener>
                                                        </Paper>
                                                    </Grow>
                                                )}
                                            </Popper>
                                    </TableCell>
                                </TableRow>
                        )}
                    }) : null}
                    {type === "Flight" && json ? json.map((item, i) => {
                        if (i < listShown) {
                            return (
                                <TableRow>
                                    <TableCell>{item.flightID}</TableCell>
                                    <TableCell>{item.origin}</TableCell>
                                    <TableCell>{item.destination}</TableCell>
                                    <TableCell>{item.status}</TableCell>
                                    <TableCell>{item.airline}</TableCell>
                                    <TableCell>{ item.flightInfo ? item.flightInfo.plane.code : "loading..."}</TableCell>
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
                                                                        navigate("/a/editFlight/" + item.flightID);
                                                                    }}>Edit</MenuItem>
                                                                    <MenuItem onClick={(event) => {
                                                                        handleClose(event, i)
                                                                        handleDeleteFlight(item.id);
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
                                        <Button variant='contained' size='small' onClick={() => {navigate("/flightDetails/" + item.flightID)}}>Details</Button>
                                    </TableCell>
                                    }
                                </TableRow>
                            )
                        }
                    }) : null}
                    {type === "Suggested" && json ? json.map((item, i) => {
                        if (i < listShown) {
                        return (
                            <TableRow>
                                <TableCell><img src='https://lh3.googleusercontent.com/U3iL-wtuPBTVic6Uvy2GM5_iZQviRegMinSx9e1ZaCkipcifVkunt0CEaqFJr0xby87g2iDdcnz45umfFgalWumRDq7nF6ZjLykdXIHwlWU37E8=e365-rw-v0-w580' width={"100px"} height={"100px"} /></TableCell>
                                <TableCell>{item.origin}</TableCell>
                                <TableCell>{item.destination}</TableCell>
                                <TableCell>{item.airline}</TableCell>
                                <TableCell>${item.price}</TableCell>
                                <TableCell>
                                    <Button variant='contained' size='small' onClick={() => {navigate("/flightDetails/" + item.flightID)}}>Details</Button>
                                </TableCell>
                            </TableRow>
                        )}
                    }) : null}
                    {type === "Template" ? json.map((item, i) => (
                        <></>
                    )) : null}
                </TableBody>
            </Table>
            {
                isLongList && listShown > initialShown ?
                <>
                    <Button
                        variant='contained'
                        color='error'
                        onClick={() => setListShown(listShown - 7)}
                        sx={{marginLeft: "25px", marginTop: "20px", width: "200px", display: "inline-block"}}
                    >
                        {type == "Suggested" ? "View Less" : `View Less ${type}s`}
                    </Button>
                    {listShown < json.length ? 
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={() => setListShown(listShown + 7)}
                        sx={{marginLeft: "20px", marginTop: "20px", width: "200px", display: "inline-block"}}
                    >
                        {type == "Suggested" ? "View More" : `View More ${type}s`}
                    </Button>
                    : null}
                </>
                : null
            }
            {
                isLongList && listShown <= initialShown ?
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => setListShown(listShown + 7)}
                    sx={{marginLeft: "245px", marginTop: "20px", width: "200px", display: "inline-block"}}
                >
                    {type == "Suggested" ? "View More" : `View More ${type}s`}
                    
                </Button>
                : null
            }
            { addButton ? 
                <Button 
                    variant='contained' 
                    color='secondary'
                    onClick={() => navigate("/a/add" + type)} //handleAdd
                    sx={{marginRight: "15px", marginTop: "20px", width: "120px", display: "inline-block", float: "right"}}
                >
                    Add {type}
                </Button> 
            : null }
        </Card>
    )
}

export default ObjectList;