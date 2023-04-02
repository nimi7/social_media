import React from 'react';
import {Button } from 'react-bootstrap'
import Axios from 'axios'
import { Link } from "react-router-dom";
import './Myprofil.css'




const Myprofile = (props) => {
    const { id, name, last, email, pic, date } = (props.location && props.location.state) || {};





    const isLoaded = () => {
        window.scroll(0, 0);
    }
    function Delete(id) {
        Axios.delete('/users/' + id);
    }




    return (
        <div class="page-content page-container" id="page-content">
            <div class="padding">
                <div class="row container d-flex justify-content-center">
                    <div class="col-xl-6 col-md-12">
                        <div class="card user-card-full">
                            <div class="row m-l-0 m-r-0">
                                <div class="col-sm-4 bg-c-lite-green user-profile">
                                    <div class="card-block text-center text-white">
                                        <div class="m-b-25"> <img src={pic} width={'150rem'} class="img-radius" alt='pic'  /> </div>
                                        <h6 class="f-w-600">Hembo Tingor</h6>
                                        <p>Web Designer</p> <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                    </div>
                                </div>
                                <div class="col-sm-8">
                                    <div class="card-block">
                                        <h6 class="m-b-20 p-b-5 b-b-default f-w-600">{name} {last}</h6>
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <p class="m-b-10 f-w-600">Email</p>
                                                <h6 class="text-muted f-w-400">{email}</h6>
                                            </div>
                                            <div class="col-sm-6">
                                                <p class="m-b-10 f-w-600">Phone</p>
                                                <h6 class="text-muted f-w-400">98979989898</h6>
                                            </div>
                                        </div>
                                        <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600"> {date}<strong>: עודכן לאחרונה </strong></h6>
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <p class="m-b-10 f-w-600">Recent</p>
                                                <h6 class="text-muted f-w-400">Sam Disuja</h6>
                                            </div>
                                            <div class="col-sm-6">
                                                <p class="m-b-10 f-w-600">Most Viewed</p>
                                                <h6 class="text-muted f-w-400">Dinoter husainm</h6>
                                            </div>
                                        </div>
                                        <Button variant="danger" onClick={() => Delete(id)}>Delete</Button>
                                        <Link onClick={isLoaded} to={{
                                            pathname: `/User/edit/${id}`,
                                            state: {
                                                name: name,
                                                last: last,
                                                email: email,
                                                id: id,
                                                pic: pic

                                            },
                                        }}
                                        > <Button variant="success" >Update</Button></Link>
                                   
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Myprofile;



