import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react';
import { Navbar, Nav, Form, Button, NavDropdown, Container } from 'react-bootstrap';
import { User } from '../UserConnected/Userconnected';
import Logout from '../Password/Logout';
import Axios from 'axios';
import SearchUsers from './SerachUsers';
import DefultPic from '../Message/pics/Nopic.jpg'


export default function MyNavbar() {
    const [getPassword, setGetPassword] = useState([]);
    const [SearchUser, SetSearchUser] = useState([])
    const [see, Setsee] = useState(false);
    User.then(data => {

        setGetPassword(data)
    })





    return (
        <div   >


            <Navbar className='place-items-center' sticky='top' bg="light" expand="sm">
                <Container>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            

                        </Nav>

                    </Navbar.Collapse>

                </Container>

                {getPassword < 1 ? <div className='flex'>
                    <NavDropdown.Item href="/Login">Log In</NavDropdown.Item>
                    <NavDropdown.Item href="/CreatPassword">Sign Up</NavDropdown.Item>

                </div> :
                    <div>

                        <div className='flex'>

                            <NavDropdown className='mt-4' title={getPassword.name} id="basic-nav-dropdown">
                                <NavDropdown.Item href={`/MyProfile`}>My Profile</NavDropdown.Item>
                        
                                <NavDropdown.Divider />
                                <div className='flex ml-4 '>
                                    <Logout />  <Icon className='ml-4' icon="si-glyph:turn-off" color="red" width="15" />
                                </div>


                            </NavDropdown>

                            <Navbar.Brand href="#home"> 
                            {/* {

                                getPassword.profilePic ? <img class="w-14  rounded-full border-2 border-gray-300" src={getPassword.profilePic} /> :
                                <img class="w-14  rounded-full border-2 border-gray-300" src={DefultPic} />
                            } */}
                            <img class="h-14 xs:w-12 sm:w-36 md:w-16  rounded-full border-2 border-gray-300" src={getPassword.profilePic} />
                            </Navbar.Brand>

                        </div>

                    </div>
                }



            </Navbar>


            {/* 
                <Navbar bg="light" variant="light">
                    <Navbar.Brand href="/">Home Page</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/GetUsers">Get Users</Nav.Link>
                        <Nav.Link href="/ResultSearch">ResultSearch</Nav.Link>
                        <Nav.Link href="/CreactUser">Creat User</Nav.Link>
                        <Nav.Link href="/getpassword">Get Password</Nav.Link>
                        <Nav.Link href="/CreatPassword">Sign up</Nav.Link>
                        <Nav.Link href="/Login">Log In</Nav.Link>
                    </Nav>
                    <Form inline>





                    </Form>
                    {getPassword.length > 1 ? <h4 className='flex'><span className='mr-3'>{getPassword}</span>  <Logout/></h4> : <h4><a href='Login'>Log in</a></h4>}


                </Navbar> */}


        </div>
    )




}