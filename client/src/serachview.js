import React, { useState } from 'react'
import { Link } from 'react-router-dom';



export default function ResultSearch(props) {
    const { Users } = props;
    
  

    return (
        <div>
            <h1>Reasult</h1>
            {Users.map((props)=>{
                return <div>{props._id} </div>
            })}
            {Users.map((user) => {
                return <div>
                    <div class='flex max-w-sm w-full bg-white shadow-md rounded-lg overflow-hidden mx-auto'>
                        <div class='w-2 bg-gray-800'></div>
                        <Link
                            to={{
                                pathname: `/User/${user._id}`,
                                state : {
                                    name: user.name,
                                    last: user.last,
                                    email: user.email,
                                    id: user._id,
                                    pic: user.pic,
                                    date: user.date
                                }
                            }}
                        >
                            <div class='flex items-center px-2 py-3'>
                                <img class='w-10 h-10 object-cover rounded-full' alt='User avatar' src='https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200' />

                                <div class='mx-3'>

                                    <p class='text-gray-600'>{props.id}{user.name} <a class='text-blue-500 hover:text-blue-400 hover:underline'>
                                        {user.last}</a>.</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            })}

        </div>
    )
}