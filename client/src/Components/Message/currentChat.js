import Axios from 'axios';
import React, { useEffect, useRef, useState, useMemo } from 'react'
import TimeAgo from 'timeago-react'
import { Icon } from '@iconify/react';
import InputEmoji from 'react-input-emoji'

export default function CurrentChat(props) {
    const { masseges, userConnect, currentChat, SetcurrentChat, socket } = props;
    const [CurrentChatUser, SetCurrentChatUser] = useState([]);
    const [sendMassage, SetsendMassage] = useState('');
    const [Massages, SetMassages] = useState(masseges);
    const [NewMessages, SetNewMessages] = useState([]);

    const scrollRef = useRef();
    useEffect(() => {
        const freindId = currentChat.members.find(m => m !== userConnect._id)

        const getUser = async () => {
            const res = await Axios.get(`/api/getUser?userId=${freindId}`)

            SetMassages(masseges)
            SetCurrentChatUser(res.data)
        }
        getUser();
    }, [currentChat])
    console.log('currentChat', currentChat)
    console.log('masseges', masseges)

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
            await Axios.post('/api/Massage', mass)
        } catch (err) {
            console.log(err)
        }





    }
    const MessagesUpdate = async () => {
        const mass = {
            conversationId: currentChat._id,
            sender: userConnect._id,
            text: sendMassage
        }


    }
    const closeConversation = () => {

        SetcurrentChat(null)

    }

    useEffect(() => {

        socket.on('recive_message', (data) => {
            console.log('recive_message', data)
            SetMassages((mess) => [...mess, data])
        })

    }, [socket])
    console.log('Massages', Massages)

    return (


        <div class="bg-white fixed bottom-0 left-0 flex flex-col items-start ml-0">

            <div class='flex-1'>
                <div>
                    <div class="flex items-center border-b border-gray-300 pl-0 py-0">
                        <img class="h-8 w-10 rounded-full object-cover"
                            src={CurrentChatUser.profilePic}
                            alt="username" />
                        <span class="block ml-2 font-bold text-base text-gray-600">{CurrentChatUser.name}</span>
                        <span class="connected text-green-500 ml-2" >
                            <svg width="6" height="6">
                                <circle cx="3" cy="3" r="3" fill="currentColor"></circle>
                            </svg>
                        </span>
                        <button className='ml-44 ' onClick={closeConversation}><Icon icon="bi:x" width="35" /></button>
                    </div>

                </div>


                <div class=" overflow-y-auto p-10 relative" style={{ height: '19rem' }} >

                    <ul>

                        <li class="clearfix2 ">
                            {Massages.map((massage) => {

                                if (userConnect._id === massage.sender) {

                                    return <div className='text-sm'  >

                                        <div class="w-full flex justify-start" ref={scrollRef}>
                                            <div class="bg-gray-100 rounded px-5 py-2 my-2 text-gray-700 relative" >
                                                <span class="block">{massage.text}</span>
                                                <span class="block text-xs text-right"><TimeAgo
                                                    datetime={massage.createdAt}
                                                    locale='en'
                                                /></span>
                                            </div>
                                        </div>

                                    </div>
                                } else {
                                    return <div  >

                                        <div class="text-sm flex justify-end" ref={scrollRef} >
                                            <div class="bg-gray-100 rounded px-5 py-2 my-2 text-gray-700 relative">
                                                <span class="block">{massage.text}</span>
                                                <span class="block text-xs text-left"><TimeAgo
                                                    datetime={massage.createdAt}
                                                    locale='en'
                                                /></span>
                                            </div>
                                        </div>

                                    </div>
                                }

                            })}


                        </li>
                    </ul>

                </div>


                <div class="w-full py-3 px-3 flex items-center justify-between border-t border-gray-300">
                    <button class="outline-none focus:outline-none">
                        <svg class="text-gray-400 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </button>
                    <button class="outline-none focus:outline-none ml-1">
                        <svg class="text-gray-400 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                    </button>

                    {/* <input aria-placeholder="Escribe un mensaje aquí" placeholder="Writh a massege..."
                        class="py-2 mx-3 pl-5 block w-full rounded-full bg-gray-100 outline-none focus:text-gray-700" type="text"
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
                        <svg class="text-gray-400 h-7 w-7 origin-center transform rotate-90"  >
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    </button>
                </div>
            </div>

        </div>

    )

}
