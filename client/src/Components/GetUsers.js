import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Button, Media } from 'react-bootstrap'
import Moment from 'moment'
import { Link } from "react-router-dom";
import './Getuser.css'






export default function GetUsers(props) {
    const [allUsers, setallUsers] = useState([]);

    

    
    useEffect(() => {
        Axios.get('/api/users')
            .then(res => {

                setallUsers(res.data)
                

            })
            .catch(err => {
                console.log(err);
            })
    },allUsers)
    const isLoaded = () => {
        window.scroll(0, 0);
    }

    function Delete(id) {
        Axios.delete('/users/' + id);
    }


    


    return (

        <div>
            <h1>Get User </h1>
            {JSON.stringify(props.user)}
            {allUsers.map((props) => {
                return <div className='UserCard'>

                    <Media>
                        <Media.Body>
                            <Link onClick={isLoaded} to={{
                                pathname: `/User/${props._id}`,
                                state: {
                                    name: props.name,
                                    last: props.last,
                                    email: props.email,
                                    id: props._id,
                                    pic: props.pic,
                                    date: props.date

                                },
                            }}
                            > <h5>{props.name} {props.last}</h5></Link>
                            <p>
                                <h3>{props.email}</h3>
                            </p>
                            <h6> {Moment(props.date).format('HH:mm:ss')} <strong>  : עודכן לאחרונה  </strong> </h6>
                            <h6>  </h6>
                            <Link onClick={isLoaded} to={{
                                pathname: `/User/edit/${props._id}`,
                                state: {
                                    name: props.name,
                                    last: props.last,
                                    email: props.email,
                                    id: props._id,
                                    pic: props.pic,
                                    date: props.date

                                },
                            }}
                            > <Button variant="success" >Update</Button></Link>
                            <Button variant="danger" onClick={() => Delete(props._id)}>Delete</Button>

                        </Media.Body>

                        <img
                            width={220}
                            height={200}
                            className="ml-3"
                            src={props.pic}
                            alt="Generic placeholder"
                        />


                    </Media>

                </div>

            })}

      






        </div>

    )
}


