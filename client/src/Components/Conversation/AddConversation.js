import React from 'react'


export default function AddConversation() {

    return(
        <div>
            <h1>conversation</h1>
            <form action='/api/conversation' method='POST'>
                <input type='text' name='senderId' placeholder='senderId'/>
                <input type='text' name='receiverId' placeholder='receiverId'/>
                <input type='submit' value='Send'/>
            </form>
        </div>
    )
    
}