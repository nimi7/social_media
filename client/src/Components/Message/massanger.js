import Axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import Conversation from './Conversation';
import CurrentChat from './currentChat';
import ChatFalse from './chatfalse';
import { Icon } from '@iconify/react';
// import  io from 'socket.io-client'
import { Modal, Button } from 'react-bootstrap';


export default function Massanger(props) {
    const { conversation, userConnect, hide, socket } = props;
    // const socket = useRef(io(`https://tailwind-css.herokuapp.com/`))
    // const socket = io.connect("http://localhost:3002/")
    const [currentChat, SetcurrentChat] = useState(null)
    const [masseges, setmassages] = useState([]);
    const [onlineUser, SetonloneUser] = useState([])
    const [arrivalMessage, SetarrivalMessage] = useState(null)
    const [smShow, setSmShow] = useState(false);

    useEffect(() => {

        const getMassages = async () => {
            try {
                const massge = await Axios.get(`/api/Massage/${currentChat._id}`)

                setmassages(massge.data)
            } catch (err) {
                console.log('massage', err);
            }

        }
        getMassages()


    }, [currentChat,smShow])

    useEffect(() => {
        
    }, [socket])







    const DeleteConversation = async (convesation) => {

        try {
            await Axios.delete(`/api/Deleteconversation/${convesation._id}`).then(
                setSmShow(false)
            )

        } catch (err) {
            console.log(err);
        }


    }


    return (
        <div className=''>

            <div class="isolate">
                <div class="flex" >
                    <div class=" bg-white rounded-r-lg">
                        <div class="my-2 mx-2  ">

                            <div class="flex relative text-gray-600 focus-within:text-gray-400">

                                <span class="absolute inset-y-0 left-0 flex items-center pl-2">

                                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6 text-gray-500"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </span>

                                <input aria-placeholder="Busca tus amigos o contacta nuevos" placeholder="Busca tus amigos"
                                    class="py-2 pl-10 block w-auto rounded bg-gray-100 outline-none focus:text-gray-700" type="search" name="search" required autocomplete="search" />
                                <div onClick={hide}><Icon icon="bi:x" width="30" /></div>
                            </div>
                        </div>

                        <div className='isolate flex-1 h-16 overflow-y-scroll h-64'>
                            {conversation.length == 0 ? <div className='font-serif text-center p-12 w-48 text-blue-300 text-xl '>To Start chat search people to connect ;)</div> :
                                conversation.map((c) => {

                                    return <div className='flex'>
                                        <Modal
                                            size="sm"
                                            show={smShow}
                                            onHide={() => setSmShow(false)}
                                            aria-labelledby="example-modal-sizes-title-sm"
                                        >
                                            <Modal.Header closeButton>
                                                <Modal.Title id="example-modal-sizes-title-sm">



                                                </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>You sure you want to delete this massages
                                                <div className='float-right'>
                                                    <Button onClick={() => DeleteConversation(c)} size="sm" variant="outline-danger">Delete</Button>
                                                </div>

                                            </Modal.Body>
                                        </Modal>
                                        <div className='flex flex-col-reverse mb-4  transform-gpu hover:scale-125  ' onClick={() => setSmShow(true)} >
                                            <Icon icon="fluent:delete-dismiss-28-filled" color="red" width="24" height="24" />
                                        </div>
                                        <span classname='w-auto transform-gpu hover:scale-105' onClick={() => SetcurrentChat(prev => prev = c)}>

                                            <Conversation masseges={masseges} onlineUser={onlineUser} SetcurrentChat={SetcurrentChat} currentChat={currentChat} socket={socket} conversation={c} userConnect={userConnect} />
                                        </span>
                                    </div>
                                })}



                        </div>

                        <div className=''>
                            {currentChat ?
                                <CurrentChat socket={socket} SetcurrentChat={SetcurrentChat} currentChat={currentChat} conversation={conversation} masseges={masseges} userConnect={userConnect} />
                                : <div> </div>}

                        </div>




                    </div>






                </div>
            </div>
        </div>

    )

}