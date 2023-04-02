import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import UsersChat from './UsersChat'

export default function Massagepage(props) {
    const { userConnect ,socket } = props;
    const [conversation, Setconversation] = useState([]);
  



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
    }, [userConnect._id,conversation])
    return (
        <div>


            <UsersChat socket={socket} conversation={conversation} userConnect={userConnect}/>


        </div>
    )
}