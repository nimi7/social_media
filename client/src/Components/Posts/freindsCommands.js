import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import TimeAgo from 'timeago-react'

export default function FriendsCommands(props) {
    const { commands } = props;
    const [userThatpost, SetuserThatpost] = useState([]);
    const [lgShow, setLgShow] = useState(false);
    useEffect(() => {

        const userDetales = async () => {
            try{
                const getuser = await Axios.get('/api/SerachUsers').then(users => {
                    return users.data
                })
                const getuserDatals = await getuser.filter(user => user._id == commands.Usercomm)
                SetuserThatpost(getuserDatals);
            }catch(err){
                console.log(err)
            }
      

        }
        userDetales();
    },[])


    return (
        <div>
            {userThatpost.map((props) => {
                return <ul role="list" class="bg-gray-200 mb-5 rounded-full px-4 divide-y divide-gray-200">


                    <li class="flex py-1 first:pt-0 last:pb-0">
                        <img class="h-14 w-10 rounded-full" src={props.profilePic} alt="" />
                        <div class="ml-2 overflow-hidden">
                            <p class="text-sm font-medium text-gray-900">{props.name}</p>
                            <p class="text-sm text-gray-500 w-64 line-clamp-2 ">
                                {commands.comm} 

                            </p>
                            <span class="inline-block float-right text-sm">
                                <TimeAgo
                                    datetime={commands.createdAt}
                                    locale='en'
                                />  </span>
                        </div>
                    </li>
                </ul>
            })}

            <hr />
        </div>
    )

}