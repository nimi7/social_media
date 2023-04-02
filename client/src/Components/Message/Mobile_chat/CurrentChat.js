import React, { useEffect, useRef, useState } from 'react'
import Axios from 'axios';
import TimeAgo from 'timeago-react'
import { Icon } from '@iconify/react';
import InputEmoji from 'react-input-emoji'


export default function CurrentChat(props) {
    const { masseges, userConnect, currentChat, conversation, SetcurrentChat,socket } = props;
    const [CurrentChatUser, SetCurrentChatUser] = useState([]);
    const [sendMassage, SetsendMassage] = useState('');
    const [Massages, SetMassages] = useState(masseges);
    const scrollRef = useRef();

    useEffect(() => {
        const freindId = currentChat.members.find(m => m !== userConnect._id)

        const getUser = async () => {
            const res = await Axios.get(`/api/getUser?userId=${freindId}`)


            SetCurrentChatUser(res.data)
        }
        getUser();
    }, [currentChat])

    useEffect(() => {

        socket.on('recive_message', (data) => {
            console.log('recive_message', data)
            SetMassages((mess) => [...mess, data])
        })

    }, [socket])
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [Massages])
    const SendMassage = async (e) => {
        // e.preventDefault();
        const mass = {
            conversationId: currentChat._id,
            sender: userConnect._id,
            text: sendMassage
        }
        socket.emit("send_message", mass)
        try {
            const res = await Axios.post('/api/Massage', mass);
           
            SetMassages([...masseges, res.data])
            SetsendMassage('');
        } catch (err) {
            console.log(err)
        }

    }
    
    return (
        <div className=' static  '>
            <div class="flex items-center border-b border-gray-300 pl-3 py-2">
                <img class="h-8 w-14 rounded-full object-cover"
                    src={CurrentChatUser.profilePic}
                    alt="username" />
                <span class="block ml-2 font-bold text-base text-gray-600">{CurrentChatUser.name}</span>
                <span class="connected text-green-500 ml-2" >
                    <svg width="6" height="6">
                        <circle cx="3" cy="3" r="3" fill="currentColor"></circle>
                    </svg>

                </span>
                <div className='w-auto ml-7' onClick={() => SetcurrentChat(null)}><Icon icon="bi:x" width="14" /></div>

            </div>
            <div class="flex-col mt-0 overflow-y-scroll " style={{ height: '526px' }}>
                {Massages.map((massage) => {
                    if (userConnect._id === massage.sender) {
                        return <div class="flex justify-end mb-2  " ref={scrollRef}>

                            <div
                                class="mr-1 py-1 px-1 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                            >
                                {massage.text}
                                <span class="block text-xs text-right"><TimeAgo
                                    datetime={massage.createdAt}
                                    locale='en'
                                /></span>
                            </div>

                            <img
                                src={userConnect.profilePic}
                                class="object-cover h-6 w-6 rounded-full"
                                alt=""
                            />

                        </div>
                    } else {
                        return <div class="flex justify-start mb-4" ref={scrollRef}>
                            <img
                                src={CurrentChatUser.profilePic}
                                class="object-cover h-8 w-8 rounded-full"
                                alt=""
                            />
                            <div
                                class="ml-2 py-1 px-1 bg-gray-400 rounded-br-3xl rounded-tr-2xl rounded-tl-lg text-white">
                                {massage.text}
                                <span class="block text-xs text-right"><TimeAgo
                                    datetime={massage.createdAt}
                                    locale='en'
                                /></span>
                            </div>
                        </div>
                    }
                })}


            </div>
            <div className='flex'>
                {/* <input aria-placeholder="Escribe un mensaje aquí" placeholder="Writh a massege..."
                    class="py-2 mx-2 pl-5 block w-full rounded-full bg-gray-100 outline-none focus:text-gray-700" type="text"
                    value={sendMassage} onChange={(e) =>
                        SetsendMassage(e.target.value)}
                    name="message" /> */}
                <InputEmoji
                    type='textarea'
                    value={sendMassage}
                    onChange={SetsendMassage}
                    onEnter={SendMassage}
                    cleanOnEnter
                    height={70}
                    placeholder="Say What on your mind..."
                />

                <button class="outline-none focus:outline-none" onClick={SendMassage}>
                    <svg class="text-gray-400 h-7 w-5 origin-center transform rotate-90"  >
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                </button>
            </div>

        </div>
    )
}