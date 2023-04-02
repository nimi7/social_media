import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { User } from '../UserConnected/Userconnected';
import SearchUsers from '../Navbar/SerachUsers';
import Posts from '../Posts/Post';
import Status from '../Posts/Status';
import CreatPost from '../Posts/CreatPosts';
import AOS from 'aos'

export default function HomePage() {
    const [image, Setimage] = useState('');
    const [UserConnect, SetUserConnect] = useState([]);
    const [SearchUser, SetSearchUser] = useState([])
    User.then(data => {

        SetUserConnect(data)
    })
    useEffect(() => {
        const getUserfollow = async () => {
            try {
                await Axios.put(`/api/password/getbyemail/${UserConnect._id}`)
            } catch (err) {
                console.log('follow', err)
            }

        }
        getUserfollow();
    })
    useEffect(() => {
        const SearchUsers = async () => {
            try {
                const data = await Axios.get('/api/SerachUsers')
                const Filter = await data.data.filter(u => u._id !== UserConnect._id)

                SetSearchUser(Filter)
            } catch (err) {
                console.log(err);
            }

        }

        SearchUsers();
    }, [UserConnect._id])
    
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };
    return (
        <div >

            
            <div className='text-center'>
                <SearchUsers SearchUser={SearchUser} UserConnect={UserConnect} />

            </div >


            <div className='grid grid-cols-12'>
                <div className='col-span-1'>

                </div>
                <div className='col-span-full'>
            
                    <CreatPost UserConnect={UserConnect} />
                    <Status UserConnect={UserConnect} />
                </div>
                <div className='col-span-1' >

                </div>


            </div>


        </div >
    )
}