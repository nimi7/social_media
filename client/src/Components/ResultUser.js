import React, { useState } from 'react'
import Axios from 'axios'
import Searchview from '../serachview'


export default function ResultSearch() {
    const [User, SetUser] = useState([]);
    const [Search, SetSearch] = useState('');
    const search = async (search) => {
        const allUser = await Axios.get('/api/users').then(data => {
            return data.data
        })
  
        const filter = await allUser.filter(user => {
            return user.name.toLowerCase().includes(Search.toLowerCase())
        })
     
        SetUser(filter)
    }

    return (
        <div>

            <input type='text' name='name' value={Search} onChange={(e) => SetSearch(e.target.value)} />
            <button onClick={() => search(Search)}>serch</button>

            <Searchview Users={User} />
       

        </div>
    )
}