import { React, useEffect, useState } from 'react'
import { Table} from 'react-bootstrap'
import Axios from 'axios';

export default function DataTest() {

    const [allUsers, setallUsers] = useState([]);
    useEffect(() => {
        Axios.get('https://private-anon-14d0311944-carsapi1.apiary-mock.com/cars')
            .then(res => {
                setallUsers(res.data)
            }).catch(err => {
                console.log(err);
            })
    },[]);
    return (
        <div className='Table'>
                   
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Model</th>
                        <th>price</th>
                        <th>horsepower</th>
                        <th>year</th>
                    </tr>
                </thead>
                {allUsers.map((props,key)=>{
                    return  <tbody>
                    <tr>
                        <td><img src={props.img_url} width='100px' height='120px' alt={key}/></td>                        
                        <td>{props.model}</td>
                        <td>{props.price}</td>
                        <td>{props.horsepower}</td>
                        <td>{props.year}</td>
                        
                    </tr>
                </tbody>
                })}
            </Table>


        </div>
    )
}
