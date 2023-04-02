import React, { useState } from 'react';
import Axios from 'axios';
import { Button } from 'react-bootstrap';

export default function EditUser(props) {
    const { id, name, last, email, pic } = (props.location && props.location.state) || {};
    
    const [statename, setstatename] = useState(name);
    const [statelast, setstatelast] = useState(last);
    const [stateemail, setstateemail] = useState(email);
    const [statepic, setstatepic] = useState(pic);

    const Updata = (id) => {

        const data = {
            name: statename,
            last: statelast,
            email: stateemail,
            pic: statepic
        }
        Axios.put('/api/users/' + id, data);
    }

    return (

        <div>
            <div class="login-box">
                <h2>User Edit </h2>
                <form>
                    <div class="user-box">
                        <input type="text" name="name" value={statename} onChange={e => setstatename(e.target.value)} placeholder="First name" />
                        <label>Username</label>
                    </div>
                    <div class="user-box">
                        <input type="text" name="last" value={statelast} onChange={e => setstatelast(e.target.value)} placeholder="Last name" />
                        <label>Last Name : </label>
                    </div>
                    <div class="user-box">
                        <input type="text" name="email" value={stateemail} onChange={e => setstateemail(e.target.value)} placeholder="Email" />
                        <label>Email :</label>
                    </div>
                    <div class="user-box">
                        <input type="text" name="pic" value={statepic} onChange={e => setstatepic(e.target.value)} placeholder="pic URL..." />
                        <label>Pic Url :</label>
                    </div>
                    <div class="user-box">
                        <Button variant="primary" type="submit" onClick={() => Updata(id)}> Update Here</Button>

                    </div>

                </form>
            </div>

        </div>
    )
}