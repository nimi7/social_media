import React from 'react'
export default function Logout() {

    return (
        <div>

              <form action='/api/logout' method='post'>
                  <input className='bg-white text-center' type='submit' value='Log out'/>
              </form>
           
        </div>
    )
}