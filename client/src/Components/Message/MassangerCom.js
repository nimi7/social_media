import React, { useEffect, useState } from 'react';
import AddConversation from '../Conversation/AddConversation';
import Massage from '../Message/massage';
import { User } from '../UserConnected/Userconnected';
import io from 'socket.io-client'


import '../Home/home.css'
import { Icon } from '@iconify/react';

const socket = io.connect('https://social-media7.herokuapp.com/')

export default function HomePage(props) {
    const [userConnect, SetuserConnect] = useState([]);
    console.log('process' , process.env.PORT)
    const [see, setsee] = useState(false);

    const ShowChat = () => {
        setsee(val => !val)
    }

    User.then(data => {

        SetuserConnect(data)
     
      
    })




    return (
        <div>



            <div className='fixed bottom-0 left-0 flex flex-col items-start ml-4 md:visible xs:invisible   '>
                <div
                >{see ? <Massage socket={socket} hide={ShowChat} userConnect={userConnect} /> :
                    <div onClick={ShowChat} >
                        <Icon icon="wpf:chat" color="limegreen" width="48" height="48" />
                    </div>}
                </div>

                <div className='flex xs:visible md:invisible'>
                    {userConnect ? <div>       <div>
                        <a href='/MobileChat'> <Icon icon="wpf:chat" color="limegreen" width="48" height="48" /></a>
                    </div>
                        <div>
                            <svg width="6" height="6">
                                <circle cx="3" cy="3" r="3" fill="green"></circle>
                            </svg>
                        </div> </div> :
                        <div className='flex'>
                            <a href='/Login'>

                                <Icon icon="bx:bx-user-minus" color="tomato" width="40" height="40" /> Log in to Chat
                            </a>
                        </div>}


                </div>
            </div>


        </div>








    )
}