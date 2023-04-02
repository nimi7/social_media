import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import CurrentChat from './currentChat';
import DefultProfil from '../Message/pics/Nopic.jpg'
import { Icon } from '@iconify/react';
export default function Conversation(props) {
    const { SetcurrentChat, currentChat, conversation, userConnect, socket, onlineUser, masseges } = props;
    const [userChat, SetuserChat] = useState([]);

    useEffect(() => {
        const freindId = conversation.members.find(m => m !== userConnect._id)

        const getUser = async () => {
            const res = await Axios.get(`/api/getUser?userId=${freindId}`)

            SetuserChat(res.data)
        }
        getUser();
    }, [])



    return (

        <div className='flex '>

            <ul class="  " >
                <h2 class="ml-2 mb-2 text-gray-600 text-lg my-0"></h2>
                <li>
                    <a class="hover:bg-gray-100 border-b border-gray-300 px-3 py-2 cursor-pointer flex items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
                        {userChat ? <img class="h-8 w-8 rounded-full object-cover"
                            src={userChat.profilePic}
                            alt="username" /> :
                            <img class="h-8 w-8 rounded-full object-cover"
                                src={DefultProfil}
                                alt="User profil" />
                        }

                        <div class="w-full pb-2">
                            <div class="flex justify-between">
                                <span class="flex block ml-2 font-semibold text-base text-gray-600 ">{userChat.name}
                                    {onlineUser.map((props) => {

                                        if (props.userId === userChat._id)
                                            return <Icon icon="akar-icons:circle-fill" color="green" width="10" height="10" />
                                    })}

                                </span>
                                <span class="block ml-2 text-sm text-gray-600"></span>
                            </div>
                            <span class="block ml-2 text-sm text-gray-600"></span>
                        </div>
                    </a>
                </li>
            </ul>

        </div>


    )

}