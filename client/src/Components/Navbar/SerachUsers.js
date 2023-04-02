
import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import Nopic from '../Message/pics/Nopic.jpg'



export default function SearchUsers(props) {
    const { SearchUser, UserConnect } = props;
    const [Search, SetSerach] = useState('');

    const isLoaded = () => {
        window.scroll(0, 0);
        SetSerach('');
    }
    
    return (
        <div>
            <div className='text-center   '>


                <div class="flex items-center   justify-center w-auto h-auto ">

                    <div class="relative text-gray-700 focus-within:text-gray-400">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                            <button type="submit" class="p-1 focus:outline-none focus:shadow-outline">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </button>
                        </span>
                        <input
                            type="search" name="q"
                            class="py-2 text-sm border-4 border-light-blue-500 border-opacity-50 text-black bg-gray-100 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
                            placeholder="Search..."
                            autocomplete="off"
                            value={Search}
                            onChange={(e) => SetSerach(e.target.value)}
                        />

                    </div>


                </div>
                <div className='flex flex-col  relative  text-center'>
                    <div className=' relative '>



                        {SearchUser.filter((val) => {
                            if (Search == '') {
                                return null
                            } else if (val.name.toLowerCase().includes(Search.toLowerCase())) {
                                return val
                            }

                        }).map((val, key) => {
                            return (
                                <div>
                                    <Link onClick={isLoaded} to={{
                                        pathname: `/UserProfile/${val._id}`,
                                        state: {
                                            userConnected: UserConnect,
                                            id: val._id,
                                            name: val.name,
                                            email: val.email,
                                            profilePic: val.profilePic,
                                            CoverPic: val.CoverPic,
                                            followers: val.followers,
                                            followins: val.followins
                                        }
                                    }}>
                                        <div class="text-center">
                                            <div class="md:w- flex flex-col items-center h-14">
                                                <div class="w-64 px-2">
                                                    <div class="flex flex-col items-center relative">
                                                        <div class="absolute shadow bg-white top-100 z-30 w-full lef-0 rounded max-h-select overflow-y-auto svelte-5uyqqj">
                                                            <div class="flex flex-col w-full">
                                                                <div class="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100">
                                                                    <div class="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
                                                                        <div class="w-6 flex flex-col items-center">
                                                                            <div class="flex relative w-5 h-5 bg-orange-500 justify-center items-center m-1 mr-2 w-4 h-4 mt-1 rounded-full ">
                                                                                {val.profilePic ? <img class="rounded-full" src={val.profilePic} /> :
                                                                                    <img class="rounded-full" src={Nopic} />}


                                                                            </div>
                                                                        </div>
                                                                        <div class="w-full items-center flex">
                                                                            <div class="mx-2 -mt-1  ">{val.name}
                                                                                <div class="text-xs truncate w-full normal-case font-normal -mt-1 text-gray-500">CEO &amp; managin director</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>




            </div>

        </div>

    )
}