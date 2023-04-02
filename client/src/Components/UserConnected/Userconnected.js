import Axios from "axios";
import React, { useEffect, useState } from "react";



const UserConnect = Axios.get('/api/password').then(data => {
    return data.data
});


export const User = UserConnect.then(data =>{

    
    return data
});
 



