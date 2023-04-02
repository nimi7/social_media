import Axios from 'axios';

import React, { useEffect, useState } from 'react';
import { User } from '../UserConnected/Userconnected'
import FileBase64 from 'react-file-base64'
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";


export default function CreatPassword() {
    const [Userconnected, SetUserconnected] = useState([]);
    const [image, Setimage] = useState('');
    const { register, handleSubmit, watch, errors } = useForm();
    const Eroor = [];
    const [name, Setname] = useState('');
    const [email, Setemail] = useState('');
    const [password, Setpassword] = useState('');
    const [profilePic, SetprofilePic] = useState('https://www.yashodahospital.org/wp-content/uploads/2018/09/no_image.png');

    const history = useHistory();
    const Creat = async () => {
        const Data = {
            name: name,
            email: email,
            password: password,
            profilePic: image
        }

        try {

            await Axios.post('/api/passwords', Data)
            history.push({
                pathname: '/log-in',
                state: Data
            }).catch(err => console.log(err))

        } catch (err) {
            console.log('catch', err)
            let nimi = [];
            if (Data.name == '') {
                nimi.push('name ')
            }
            if (Data.email == '') {
                nimi.push('email')
            }
            if (Data.password == '') {
                nimi.push('password')
            }
            nimi.push('Is required')
            alert(nimi)
        }


    }
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
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
     
        const base64 = await convertToBase64(file);
        Setimage(base64);
    };

    return (

        <div>


            <form>
                <section class="min-h-screen flex items-stretch text-white ">
                    <div class="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)" }}>
                        <div class="absolute bg-black opacity-60 inset-0 z-0"></div>
                        <div class="w-full px-24 z-10">
                            <h1 class="text-4xl font-bold text-left tracking-wide">Create Your World</h1>
                            <p class="text-2xl my-4"> Keep it special</p>
                        </div>

                    </div>
                    <div class="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0" style={{ backgroundColor: "#161616" }}>
                        <div class="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80')" }}>
                            <div class="absolute bg-black opacity-60 inset-0 z-0"></div>
                        </div>
                        <div class="w-full py-6 z-20">
                            <h1 class="my-6">
                                <p viewBox="0 0 247 31" class="w-auto h-7 sm:h-8 inline-flex">Sign Up</p>
                            </h1>


                            <div class="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
                                <div class="pb-1 pt-3">
                                    <input class="block w-full p-4 text-lg rounded-sm bg-black" required type="text" value={name} name='name' onChange={(e) => Setname(e.target.value)} placeholder="Name..." />
                                </div>
                                <div class="pb-1 pt-3">
                                    <input type="email" required value={email} name='email' onChange={(e) => Setemail(e.target.value)} placeholder="Email" class="block w-full p-4 text-lg rounded-sm bg-black" />
                                </div>

                                <div class="pb-1 pt-3">
                                    <input class="block w-full p-4 text-lg rounded-sm bg-black" required type="password" value={password} name='password' onChange={(e) => Setpassword(e.target.value)} placeholder="Password" required />
                                </div>

                                <input
                                    type="file"
                                    label="Image"
                                    name="myFile"
                                    accept=".jpeg, .png, .jpg"
                                    onChange={(e) => handleFileUpload(e)}
                                />
                                <img scr={image} width='100px' hight='100px'/>


                                
                                <div class="grid grid-cols-1 mt-5 mx-7">
                                    <label class="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold mb-1">Select Profile Picture</label>
                                    <div class='flex items-center justify-center w-full'>
                                        <label class='flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-purple-300 group'>
                                            <div class='flex flex-col items-center justify-center pt-7'>
                                                <svg class="w-10 h-10 text-purple-400 group-hover:text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                <p class='lowercase text-sm text-gray-400 group-hover:text-purple-600 pt-1 tracking-wider'>Upload Here</p>
                                            </div>

                                            {/* <div class="hidden">
                                                <FileBase64 class="hidden"
                                                    multiple={false}
                                                    onDone={({ base64 }) =>
                                                        SetprofilePic(base64)
                                                    } />

                                            </div> */}
                                        </label>
                                    </div>
                                </div>

                                <div class="px-4 pb-2 pt-4">
                                    <div onClick={Creat} class="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none">
                                        Sing up
                                    </div>
                                </div>
                                <p>Alredy have an accout? <a href="/Login">Log In</a></p>

                                <div class="p-4 text-center right-0 left-0 flex justify-center space-x-4 mt-16 lg:hidden ">
                                    <a href="#">
                                        <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                                    </a>
                                    <a href="#">
                                        <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
                                    </a>
                                    <a href="#">
                                        <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </form>



        </div>

    )
}



