import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProfilePost from '../Posts/ProfilePosts';
export default function UserProfile(props) {

    const { userConnected, id, name, email, profilePic, CoverPic, followers, followins } = (props.location && props.location.state) || {};
    const [CheckFollow, SetCheckFollow] = useState(userConnected.followins.indexOf(id) > -1)
    const [AllowMassage, SetAllowMassage] = useState([])
    const [Post, SetPost] = useState([]);

    useEffect(async () => {
        try {
            const posts = await Axios.get('/api/Posts').then((data) => {
                return data.data
            })
            const SelfPost = await posts.filter(p => p.userPost === id)
            SetPost(SelfPost)
            const chakconversation = await Axios.get(`/api/conversation/${userConnected._id}`).then((data) => {
                return data.data
            });

            const cheacck = await chakconversation.filter(m => m.members.includes(id, userConnected._id));
            SetAllowMassage(cheacck);
        } catch (err) {
            console.log(err);
        }



    })



    const Follow = async () => {

        const data = {
            followins: id,
        }

        Axios.put(`/api/password/followins/${userConnected._id}`, data).then(console.log('follow secces'))
        SetCheckFollow(true)
    }
  

    const Checkfollow = () => {

    }
    const UnFollow = async () => {


        const data = {
            followins: id,
        }



        Axios.put(`/api/password/Unfollowins/${userConnected._id}`, data).then(console.log('follow secces'))
        SetCheckFollow(false)
    }
    console.log('AllowMassage',AllowMassage)
    return (
        <div>

            <div class="w-full relative mt-4 shadow-2xl rounded my-24 overflow-hidden">
                <div class="top h-64 w-full bg-blue-600 overflow-hidden relative" >
                    <img src={CoverPic} alt="" class="bg w-full h-full object-cover object-center absolute z-0" />
                    <div class="flex flex-col justify-center items-center relative h-full bg-black bg-opacity-50 text-white">
                        <img src={profilePic} class="h-24 w-24 object-cover rounded-full" />
                        <h1 class="text-2xl font-semibold">{name}</h1>
                        <h4 class="text-sm font-semibold">Joined Since '19</h4>
                    </div>
                </div>
                <div class="grid grid-cols-12 bg-white ">

                    <div class="col-span-12 w-full px-3 py-6 justify-center flex space-x-4 border-b border-solid md:space-x-0 md:space-y-4 md:flex-col md:col-span-2 md:justify-start ">
                        {AllowMassage.length == 1 ? <div>

                            <div href="#" class="text-sm p-2 bg-indigo-900 text-white text-center rounded font-bold">
                                Open Chat
                            </div>
                        </div> :


                            <div>
                                <div href="#" class="text-sm p-2 bg-indigo-900 text-white text-center rounded font-bold">
                                    <form action='/api/conversation' method='POST'>
                                        <input type='text' name='senderId' value={userConnected._id} placeholder='senderId' hidden />
                                        <input type='text' name='receiverId' value={id} placeholder='receiverId' hidden />
                                        <button type='submit'  > Send Massage</button>
                                    </form>
                                </div>

                            </div>}




                        {CheckFollow ? <h5> <div href="#" onClick={UnFollow} class="text-sm p-2 bg-green-400 text-center rounded font-semibold hover:bg-green-300 hover:text-gray-200" >

                            UnFollow
                        </div></h5> : <h5>       <div href="#" onClick={Follow} class="text-sm p-2 bg-green-400 text-center rounded font-semibold hover:bg-green-300 hover:text-gray-200" >

                            Follow
                        </div></h5>}


                    </div>

                    <div class="col-span-12 md:border-solid md:border-l md:border-black md:border-opacity-25 h-full pb-12 md:col-span-10">
                        <div class="px-4 pt-4">
                            <form action="#" class="flex flex-col space-y-8">

                            </form>
                        </div>
                    </div>

                 
                </div>
                <ProfilePost Post={Post} />
            </div>
        </div>
    )
}