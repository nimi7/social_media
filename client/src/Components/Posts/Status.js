import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import DefultPic from '../Message/pics/Nopic.jpg'
import TimeAgo from 'timeago-react'
import FriendsCommands from './freindsCommands';
import Command from './Command';
import { Button, Modal } from 'react-bootstrap'
import { Icon } from '@iconify/react';

export default function Status(props) {
    const { UserConnect } = props;
    const [Post, SetPost] = useState([]);
    const [command, Setcommand] = useState('');
    const [smShow, setSmShow] = useState(false);
    const [color, setColor] = useState('grey')
    useEffect(() => {
        const getPost = async () => {
            try {
                const data = await Axios.get('/api/Posts').then(allpost => {
                    return allpost.data
                });

                const post = await data.filter(p => UserConnect.followins.includes(p.userPost))

                SetPost(post)
            } catch (err) {
                console.log('getPost', err)
            }

        }
      
            getPost();
        
        
    })

   

    const DeletePost = async (id) => {
        try {
            await Axios.delete(`/api/DeletePost/${id}`)
        } catch (err) {
            console.log(err);
        }
    }
    const Like = () => {
        setColor('red')
    }



    return (

        <div className=''>
            {Post.map((post, key) => {
                return <div key={post._id} class=" m-10 flex items-center justify-center w-auto h-auto">

                    <div class="bg-white border shadow-sm px-7 py-3 rounded-lg max-w-lg">
                        {UserConnect._id == post.userPost ? <button className='float-right' onClick={() => DeletePost(post._id)} ><Icon icon="ant-design:delete-row-outlined" color="tomato" width="24" height="24" /></button> : <></> }
                        
                        <div class="flex items-center">

                            {post.userprofilePic ? <img class="h-14 w-14 rounded-full" src={post.userprofilePic} /> :
                                <img class="h-12 w-12 rounded-full" src={DefultPic} />
                            }

                            <div class="ml-3">
                                <div class="text-sm ">
                                    <span class="font-semibold">{post.usernamePost}</span>
                                    <span class="text-gray-500"> • status</span>
                                </div>

                                <div class="text-gray-500 text-xs flex">
                                    <span class="inline-block">
                                        <TimeAgo
                                            datetime={post.createdAt}
                                            locale='en'
                                        />  </span>
                                    <svg class="inline-block ml-1 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-supported-dps="16x16" fill="currentColor" class="mercado-match" width="16" height="16" focusable="false">
                                        <path d="M8 1a7 7 0 107 7 7 7 0 00-7-7zM3 8a5 5 0 011-3l.55.55A1.5 1.5 0 015 6.62v1.07a.75.75 0 00.22.53l.56.56a.75.75 0 00.53.22H7v.69a.75.75 0 00.22.53l.56.56a.75.75 0 01.22.53V13a5 5 0 01-5-5zm6.24 4.83l2-2.46a.75.75 0 00.09-.8l-.58-1.16A.76.76 0 0010 8H7v-.19a.51.51 0 01.28-.45l.38-.19a.74.74 0 01.68 0L9 7.5l.38-.7a1 1 0 00.12-.48v-.85a.78.78 0 01.21-.53l1.07-1.09a5 5 0 01-1.54 9z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div>
                            <img className='w-96 p-1' src={post.Pic} />
                        </div>
                        <p class="text-gray-800 text-sm mt-1 leading-normal md:leading-relaxed">{post.status}.</p>
                        <hr />
                        <div class="text-gray-500 text-xs flex items-center ">
                            <img class="mr-0.5" src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb" />
                            <img class="mr-0.5" src="https://static-exp1.licdn.com/sc/h/5thsbmikm6a8uov24ygwd914f" />
                            <img class="mr-0.5" src="https://static-exp1.licdn.com/sc/h/7fx9nkd7mx8avdpqm5hqcbi97" />

                            <Icon onClick={Like} icon="fontisto:dislike" color={color} width="24" height="24" rotate={2} />

                            <span class="ml-1">47{post.likes} • {post.commands.length} comments</span>


                        </div>
                        <button className='float-right flex -m-6 text-sm' onClick={() => setSmShow(true)}><Icon icon="mdi-light:unfold-more-horizontal" color="gray" width="24" height="24" />all commands</button>
                        <hr />
                        <div className='mt-4'>

                            < FriendsCommands commands={post.commands[0]} />
                        </div>

                        <Modal
                            size="md"
                            show={smShow}
                            onHide={() => setSmShow(false)}
                            aria-labelledby="example-modal-sizes-title-sm"
                        >
                            <Modal.Header closeButton>
                                <Modal.Title id="example-modal-sizes-title-sm">

                                    <ul role="list" class="text-sm p-0 divide-y divide-gray-200">
                                        status:

                                        <li class="flex py-1 first:pt-0 last:pb-0">
                                            <img class="h-full w-10 rounded-full" src={post.userprofilePic} alt="" />
                                            <div class="ml-2 overflow-hidden">
                                                <p class="text-sm font-medium text-gray-900">{post.usernamePost}</p>
                                                <p class="text-sm text-gray-500 w-64 line-clamp-2 ">
                                                    {post.status}

                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                commands:
                                {post.commands.map((prop) => {
                                    return < FriendsCommands commands={prop} />
                                })}</Modal.Body>
                        </Modal>


                        <Command postID={post._id} UserConnect={UserConnect} />
                    </div>
                </div>
            })}

        </div>
    )
}