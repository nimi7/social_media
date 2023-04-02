import React from 'react';
import {Button} from 'react-bootstrap'
import '../creatuser/CreatUser.css'

export default function CreactUser() {
    return (
        <div>

            <div class="login-box">
                <h2>Creat User </h2>
                <form method="POST" action='/api/users'>
                    <div class="user-box">
                        <input type="text" name="name" placeholder='Enter Name...' required="" />
                        <label>First Name</label>
                    </div>
                    <div class="user-box">
                        <input type="text" name="last" placeholder='Enter Last name...' required="" />
                        <label>Last Name</label>
                    </div>
                    <div class="user-box">
                        <input type="text" name="email" placeholder='Enter Email...' required="" />
                        <label>Email</label>
                    </div>
                    <div class="user-box">
                        <input type="text" name="pic" placeholder='Enter Pic Url..' required="" />
                        <label>Picture</label>
                    </div>
                    <div class="user-box">
                    <Button variant="primary" type="submit"> Creact User</Button>
                      
                    </div>
                   
                </form>
            </div>
        </div>
    )
}