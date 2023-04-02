import React, { useEffect, useState } from 'react'
import { User } from '../UserConnected/Userconnected'
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Posts from '../Posts/Post'
export default function UserConnectedProfile(props) {

    const [Userconnect, SetUserconnect] = useState([]);
    const [Post, SetPost] = useState([]);
    User.then(data => {

        SetUserconnect(data)
    })
    useEffect(() => {
        const GetPost = async () => {
            try {
                const post = await Axios.get('/api/Posts').then(result => {
                    return result.data
                })
                const userPost = await post.filter(p => p.userPost === Userconnect._id)
                SetPost(userPost)
            } catch (err) {
                console.log(err);

            }
        }
        GetPost();
    })


    return (
        <div>

            <div class="w-full relative mt-4 shadow-2xl rounded my-24 overflow-hidden">
                <div class="top h-64 w-full bg-blue-600 overflow-hidden relative" >
                    {Userconnect.CoverPic ?
                        <img src={Userconnect.CoverPic} class="bg w-full h-full object-cover object-center absolute z-0" />
                        :
                        <img src="https://images.unsplash.com/photo-1503264116251-35a269479413?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="" class="bg w-full h-full object-cover object-center absolute z-0" />
                    }

                    <div class="flex flex-col justify-center items-center relative h-full bg-black bg-opacity-50 text-white">
                        <img src={Userconnect.profilePic} class="h-24 w-24 object-cover rounded-full" />
                        <h1 class="text-2xl font-semibold">{Userconnect.name}</h1>
                        <h4 class="text-sm font-semibold">Joined Since '19</h4>
                    </div>
                </div>
                <div class="grid grid-cols-12 bg-white ">

                    <div class="col-span-12 w-full px-3 py-6 justify-center flex space-x-4 border-b border-solid md:space-x-0 md:space-y-4 md:flex-col md:col-span-2 md:justify-start ">
                        <Link to={{
                            pathname: `/MyProfile/edit/${Userconnect._id}`,
                            state: {
                                id: Userconnect._id,
                                name: Userconnect.name,
                                email: Userconnect.email,
                                profilePic: Userconnect.profilePic,
                                CoverPic: Userconnect.CoverPic
                            },
                        }}>
                            <button
                                class="text-white px-4 w-auto h-8 bg-blue-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
                                <svg viewBox="0 0 20 20" enable-background="new 0 0 20 20" class="w-4 h-4 inline-block mr-1">
                                    <path fill="#FFFFFF" d="M17.561,2.439c-1.442-1.443-2.525-1.227-2.525-1.227L8.984,7.264L2.21,14.037L1.2,18.799l4.763-1.01
                                    l6.774-6.771l6.052-6.052C18.788,4.966,19.005,3.883,17.561,2.439z M5.68,17.217l-1.624,0.35c-0.156-0.293-0.345-0.586-0.69-0.932
                                    c-0.346-0.346-0.639-0.533-0.932-0.691l0.35-1.623l0.47-0.469c0,0,0.883,0.018,1.881,1.016c0.997,0.996,1.016,1.881,1.016,1.881
                                    L5.68,17.217z"/>
                                </svg>
                                <span>Edit Profile</span>
                            </button> </Link>




                    </div>

                        


                </div>

                <Posts Post={Post} Userconnect={Userconnect}/>
            </div>
        </div>
    )
}