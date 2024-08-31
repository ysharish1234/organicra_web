import React, { useEffect, useState } from 'react'
import { IoIosLogIn } from "react-icons/io";
import { SiGnuprivacyguard } from "react-icons/si";
import {Link} from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import './Profile.css'
import axios from 'axios';
import { CiLogout } from "react-icons/ci";
import logo from '../images/logo.jpg';
export default function Profile() {
    const [userIn,setUserIn] =useState({flag:false});
    const[username,setUsername]=useState("");
    const[phoneNumber,setPhoneNumber]=useState("");
    const[email,setEmail]=useState("");
    const Logout=()=>{
        if (localStorage.getItem('email')!==null) {
            localStorage.removeItem('email');
            setUserIn({flag:false});
        }
    }
    useEffect(()=>{
        if (localStorage.getItem('email')===null) {
            setUserIn({flag:false});
        }
        else{
            let data;
            setUserIn({flag:true});
            setEmail(localStorage.getItem('email'));
            const url="http://localhost/organicra/user_profile.php";
            let fData=new FormData();
            fData.append('email',localStorage.getItem('email'));
            axios.post(url,fData,{withCredentials: true}).then(
                function(response){
                    data=response.data;
                    setUsername(data.user_name);
                    setPhoneNumber(data.phone_number);
                }
            ).catch((error)=>{console.log(error);})
    }
},[])
    return (
        <>
        <div>
            {!userIn.flag&&<div className="profile_container">
                <Link to="/login" state={{At:"Login"}} style={{textDecoration:"none",color:"black"}}>
                    <div className="signup">
                        <IoIosLogIn fontSize="2rem"/><br/>
                        <li className="item_text">Login</li>
                    </div>
                </Link>
                <Link to="/signup" state={{At:"Signup"}} style={{textDecoration:"none",color:"black"}}>
                    <div className="signup">
                        <SiGnuprivacyguard fontSize="2rem"/><br/>
                         <li className="item_text">Signup</li>
                    </div>
                </Link>
            </div>}
            {userIn.flag&&<div className="profile_information">
                <div className='Prof'>
                    <h1 style={{fontSize:"1.5rem",color:"#124076"}}>Profile</h1>
                </div>
                <pre><p style={{fontWeight:"bold",fontFamily: 'Playfair Display,serif'}}>Name:   {username}</p>
                <p style={{fontWeight:"bold",fontFamily: 'Playfair Display,serif'}}>Mobile Number:   +91{phoneNumber}</p>
                <p style={{fontWeight:"bold",fontFamily: 'Playfair Display,serif'}}>Email:   {email}</p></pre>
                <div className="Logout_logo">
                    <img src={logo} style={{height:"100px",width:"100px"}}/>
                    <div className="signup" onClick={Logout} style={{marginLeft:"3rem"}}>
                        <CiLogout fontSize="2rem"/><br/>
                        <li className="item_text">Logout</li>
                    </div>
                    <Link to="/orders" style={{textDecoration:"none",color:"black"}}>
                        <div className="signup">
                            <FaShoppingCart fontSize="2rem"/><br/>
                            <li className="item_text">Orders</li>
                        </div>
                    </Link>
                </div>
            </div>}
        </div>
    </>
    )
}
