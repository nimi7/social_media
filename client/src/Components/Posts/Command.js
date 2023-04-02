import Axios from 'axios';
import React, { useState } from 'react'
import InputEmoji from 'react-input-emoji'


export default function Command(props) {

    const { postID, UserConnect } = props;
    const [command, Setcommand] = useState('');
    const SendCommand = (id) => {
        const data = {
            Usercomm: UserConnect._id,
            comm: command
        }

        Axios.put(`/api/Commands/${id}`, data).then(console.log('commad added'))
    }

    return (
        <div>
            <div className='flex'>

                <InputEmoji

                    type='textarea'
                    value={command}
                    onChange={Setcommand}
                    onEnter={() => SendCommand(postID)}
                    cleanOnEnter
                    height={70}
                    placeholder="Add a command..."
                />


                <button class="outline-none focus:outline-none" onClick={() => SendCommand(postID)}>
                    <svg class="text-gray-400 h-7 w-5 origin-center transform rotate-90"  >
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                </button>
            </div>


        </div>
    )
}