import Axios from 'axios'
import React, { useEffect, useState } from 'react'


export default function Search() {
    const [name, Setname] = useState('');
    const [user, Setuser] = useState([]);

  

    const Searching = useEffect(async (name) => {
        let users = await Axios.get(`/api/ResultSearch/${name}`).then(data => {
            return data

        })

        Setuser(users)
    },[])
   
    
    return (
        <div>
            <h1>Serach</h1>
            <input type='text' onSubmit={() => Searching(name)} value={name} placeholder='enter name' onChange={(e) => Setname(e.target.value)} />


        </div>
    )
}