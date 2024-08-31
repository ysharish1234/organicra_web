import React from 'react'
import logo from '../images/logo.jpg';
import './Login.css';
import { useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
function Login(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const location=useLocation();
    const login_valid_check=()=>{
        let data;
        const url="http://localhost/organicra/login.php";
        const fData=new FormData();
        fData.append('email',email);
        fData.append('password',password);
        axios.post(url,fData,{withCredentials: true}).then(
            function(response){
                data=response.data;
                console.log(data);
                if(!data['email_verified']){
                    toast.error("Email does not exist");
                }
                else if(!data['password_verified']){
                    toast.error("Incorrect password");
                }
                else
                {
                    localStorage.setItem('email', email);
                    toast.success("You are successfully logged in!",{autoClose:1000});
                    setTimeout(()=>{
                        toast.success("Redirecting to the home page",{autoClose:1000});
                    },2000)
                    setTimeout(()=>{
                        window.location.href="/";
                    },4000);
                }
            }
        ).catch(function(error){console.log(`Unable to connect ${error}`)});
    }
    useEffect(()=>{
      document.title=`organicra-${location?.state?.At}`;
    },[])
    const inputOnFocusHandler=(event)=>{
        event.target.style.border="0.3rem solid #6E7DA2";
        event.target.style.backgroundColor="AAD7D9";
        event.target.style.boxShadow="0 0 0 0.2rem #78C1F3"
    }
    const inputOnBlurHandler=(event)=>{
        event.target.style.border="2px solid black";
        event.target.style.backgroundColor="white";
        event.target.style.boxShadow="0 0 1rem 0.2rem white"
    }
    const buttonOnMouseEnterHandler=(event)=>{
        event.target.style.backgroundColor="#65B741";
    }
    const buttonOnMouseLeaveHandler=(event)=>{
        event.target.style.backgroundColor="#90D26D";
    }
    return (
        <>
            <ToastContainer autoClose={3000}/>
            <div className="cont">
                <div className="image">
                    <img src={logo}/>
                </div>
                <div className='login'>
                        <h2 style={{fontWeight:"bold",fontSize:"2rem"}}>Login</h2>
                        <p style={{fontWeight:"bold",fontSize:"1rem",marginRight:"13rem"}}>Email address</p>
                        <input type='email' placeholder='Enter email address' style={{fontSize:"1rem"}} onFocus={inputOnFocusHandler} onBlur={inputOnBlurHandler} onChange={(event)=>{setEmail(event.target.value)}}/>
                        <div style={{fontWeight:"bold",fontSize:"1rem",display:"flex",justifyContent:"space-between",width:"100%"}}>
                            <p style={{marginLeft:"2.5rem"}}>Password</p>
                            <Link to='/Forgot_password' state={{At:"Password Assistance"}} style={{textDecoration:"none"}}>
                                <span style={{marginRight:"3rem",color:"#211C6A"}}>Forgot Password</span>
                            </Link>
                        </div>
                        <input type='password' placeholder='Enter password' style={{fontSize:"1rem"}} onFocus={inputOnFocusHandler} onBlur={inputOnBlurHandler} onChange={(event)=>setPassword(event.target.value)}/>
                        <p style={{fontSize:"1rem",color:"#074173"}}>Click on continue to login to organicra</p>
                        <button style={{height:"2.5rem",width:"20rem",backgroundColor:"#90D26D"}} onMouseEnter={buttonOnMouseEnterHandler} onMouseLeave={buttonOnMouseLeaveHandler} onClick={login_valid_check}>CONTINUE</button>
                </div>
            </div>
        </>
    )
}
export default Login