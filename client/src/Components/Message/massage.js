import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Massanger from './massanger'
import { io } from 'socket.io-client'



export default function Massage(props) {
    const [conversation, Setconversation] = useState([]);

    const { hide, userConnect, socket } = props;





    const getconversation = async () => {
        try {

            const res = await Axios.get(`/api/conversation/${userConnect._id}`)

            Setconversation(res.data)
            socket.emit("Open_Chat",res.data)
        } catch (err) {
            console.log(err)
        }

    };

    useEffect(() => {
        getconversation();
        console.log('get conversation')
        
    }, [userConnect._id, socket])

    const [see, setsee] = useState(false);

    const ShowChat = () => {
        setsee(val => !val)
    }

    return (
        <div>



            {userConnect ?
                <Massanger socket={socket} hide={hide} conversation={conversation} userConnect={userConnect} />
                : <div class="p-0 ">
                    <div class="inline-flex items-center bg-white leading-none text-red-600 rounded-full p-0 shadow text-sm">

                        <span class="inline-flex px-2 text-sm "><a href='/Login'>Log in to Start chat</a></span>
                    </div>
                </div>}









        </div>
    )

}