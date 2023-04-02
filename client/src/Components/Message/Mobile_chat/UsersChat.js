import React, { useEffect, useRef, useState } from 'react'
import Axios from 'axios';
import CurrentChat from '../Mobile_chat/CurrentChat';
import Coversation from './Conversation'
import { io } from 'socket.io-client'
import { Modal, Button } from 'react-bootstrap';
import { Icon } from '@iconify/react';
export default function UsersChat(props) {
    const { conversation, userConnect, socket } = props;
    
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


    }, [currentChat, masseges])



    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
            setmassages(prev => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat])


    const DeleteConversation = async (convesation) => {

        try {
            Axios.delete(`/api/Deleteconversation/${convesation._id}`)
        } catch (err) {
            console.log(err);
        }


    }
    return (
        <div className=''>

            <div class="rounded-lg h-96  ">



                <div class="grid grid-cols-5 h-96  flex justify-between ">

                    <div class="flex flex-col col-span-2 border-r-2  overflow-y-auto" style={{ height: '630px' }}>

                        <div class="border-b-1 py-1 px-1">
                            <input
                                type="text"
                                placeholder="search chatting"
                                class="py-1 px-1 border-2 border-gray-200 rounded-2xl w-full"
                            />
                        </div>


                        


                        {conversation.length == 0 ? <div className='font-serif text-center p-12 w-48 text-blue-300 text-xl '>To Start chat search people to connect ;)  <br/> <a href='/'>Go To Search</a> </div> :  conversation.map((c) => {

                            return <span className='flex' onClick={() => SetcurrentChat(c)}>
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
                                <Coversation onlineUser={onlineUser} conversation={c} userConnect={userConnect} />
                            </span>
                        })}










                    </div>

                    <div class="col-span-3 px-1 justify-between">

                        {currentChat ?

                            <CurrentChat socket={socket} SetcurrentChat={SetcurrentChat} currentChat={currentChat} conversation={conversation} masseges={masseges} userConnect={userConnect} />

                            : <div> </div>}

                        <div>


                        </div>

                    </div>


                </div>
            </div>
        </div>
    )
}