import React, { useState } from 'react';
import { User } from '../../UserConnected/Userconnected';
import Massagepage from './Massagepage'

import io from 'socket.io-client'


const socket = io.connect('https://social-media7.herokuapp.com/')
export default function MobileChat(props){
    console.log('process' , process.env.PORT)
    const [userConnect, SetuserConnect] = useState([]);
    User.then(data => {
      
        SetuserConnect(data)
    })
    return(
        <div>

            <Massagepage socket={socket} userConnect={userConnect}/>

        </div>
    )
}