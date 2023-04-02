import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react';
import DefultProfil from '../pics/Nopic.jpg'


export default function Conversation(props) {
    const { conversation, userConnect, onlineUser } = props;
    const [userChat, SetuserChat] = useState([]);


    useEffect(() => {
        const freindId = conversation.members.find(m => m !== userConnect._id)

        const getUser = async () => {
            const res = await Axios.get(`/api/getUser?userId=${freindId}`)

            SetuserChat(res.data)
        }
        getUser();
    }, [])

    return (<div>
        <div className=''>

            <div class="flex flex-row py-2 px-1 items-center border-b-2">
                <div class="px-2">
                    {userChat ? <img
                        src={userChat.profilePic}
                        class="object-cover h-12 w-12 rounded-full"
                        alt=""
                    /> :       <img
                    src={DefultProfil}
                    class="object-cover h-12 w-12 rounded-full"
                    alt=""
                />}

                </div>
                <div class="">
                    <div class="text-xs font-semibold">{userChat.name}</div>
                    {onlineUser.map((props) => {

                        if (props.userId === userChat._id)
                            return <Icon icon="akar-icons:circle-fill" color="green" width="10" height="10" />
                    })}
                </div>
            </div>



        </div>
    </div>

    )
}