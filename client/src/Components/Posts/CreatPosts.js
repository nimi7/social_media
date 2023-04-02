import React, { useState } from 'react'
import FileBase64 from 'react-file-base64'
import { Icon } from '@iconify/react';
import Axios from 'axios';
import InputEmoji from 'react-input-emoji'

export default function CreatPost(props) {
    const { UserConnect } = props
    const [status, Setstatus] = useState('');
    const [Pic, SetPic] = useState('');
    const [text, setText] = useState('')
    const SendPost = () => {
        const post = {
            userPost: UserConnect._id,
            usernamePost: UserConnect.name,
            userprofilePic: UserConnect.profilePic,
            status: status,
            Pic: Pic,
        }

        Axios.post('/api/Posts', post).then(console.log('send post'), Setstatus(''), SetPic(''));

    }
 

    return (
        <div className=' ml-14 '>
            
            <div class=" heading text-center font-bold text-2xl m-5 text-gray-800"></div>

            <div class="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-800  p-4 shadow-lg max-w-2xl">
                <input type='text' value={UserConnect._id} name='userPost' className='hidden' />

                <InputEmoji
          
                    type='textarea'
                    value={status}
                    onChange={Setstatus}
                    cleanOnEnter
                    height={70}
                    width={40}
                    borderColor={'#D2B48C'}
                    placeholder="Say What on your mind..."
                    onFocus
                />

                <div class="icons flex text-gray-500 m-2">
                    <svg class="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-0 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>

                    <svg class="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-0 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <label class="cursor-pointer mt-0">

                        <Icon icon="icon-park:pic-one" width="35" height="30" />
                        <div className='hidden'>

                            <FileBase64
                                className='hidden'
                                multiple={false}
                                onDone={({ base64 }) =>
                                    SetPic(base64)
                                } />
                        </div>
                    </label>
                    <div className='bg-red-200'>

                        <div className='hidden' >
                            <FileBase64
                                className='hidden'
                                multiple={false}
                                onDone={({ base64 }) =>
                                    SetPic(base64)
                                } />
                        </div>





                    </div>





                    <div class="bg-grey-700 count ml-auto text-gray-400 text-xs font-semibold">0/300</div>
                </div>



                <div class="buttons flex">
                    <div class="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">Cancel</div>
                    <div onClick={SendPost} class="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">Post</div>
                </div>
            </div>
        </div>
    )
}