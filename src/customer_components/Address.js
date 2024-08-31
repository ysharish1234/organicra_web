import {React,useEffect,useState} from 'react'
import './Address.css'
import Navbar from './Navbar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Display_address from './Display_address';
import Add_address_details from './Add_address_details';
export default function Address(){
    const [address,setAddress]=useState([]);
    const [newAddress,setNewAddress]=useState(false);
    const get_address_details=()=>{
        let data;
        let jsonArray;
        let email=localStorage.getItem('email');
        const url="http://localhost/organicra/fetch_all_addresses.php"
        const fData=new FormData();
        fData.append('email',email);
        axios.post(url,fData).then(async function(response){
            data=response.data;
            jsonArray = await Object.keys(data).map(key => ({
                key: key,
                value: data[key]
              }));
           setAddress(jsonArray);
        }).catch(function(error){
            console.error(error);
        })
    }
    useEffect(()=>{
        get_address_details();
    },[newAddress])
    return (
        <>
        <ToastContainer autoClose={3000}/>
            <Navbar disabled={true}/>
            <div>
                <div style={{marginTop:"8rem"}}>
                    <Display_address address={address} add_new_address={newAddress} set_new_address={setNewAddress}/>
                {(address.length==0||newAddress)&&<div>
                    <Add_address_details address={address} add_new_address={newAddress} set_new_address={setNewAddress}/>
                </div>}
                </div>
            </div>
        </>
    )
}