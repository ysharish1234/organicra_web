import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import {useState,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import './Forgot_password.css';
import logo from '../images/logo.jpg';
function Forgot_password() {
    const [email,setEmail]=useState("");
    const location=useLocation();
    const [otp,setOtp]=useState("");
    const [password,setPassword]=useState("");
    const [valid,setValid]=useState({flag:1});
    const inputOnFocusHandler=(event)=>{
        event.target.style.border="0.3rem solid #6E7DA2";
        event.target.style.backgroundColor="AAD7D9";
        event.target.style.boxShadow="0 0 0 0.2rem #78C1F3";
    }
    const inputOnBlurHandler=(event)=>{
        event.target.style.border="2px solid black";
        event.target.style.backgroundColor="white";
        event.target.style.boxShadow="0 0 1rem 0.2rem white";
    }
    const buttonOnMouseEnterHandler=(event)=>{
        event.target.style.backgroundColor="#65B741";
    }
    const buttonOnMouseLeaveHandler=(event)=>{
        event.target.style.backgroundColor="#90D26D";
    }
    const send_otp=()=>{
        let data;
        let ele=document.getElementById("pass_assist");
        const url="http://localhost/organicra/password_assistance.php";
            let fData=new FormData();
            fData.append('email',email);
            axios.post(url,fData).then(
                function(response){
                    data=response.data;
                    if(!data['email']){
                        toast.error("Email that you have entered dose not exist!");
                    }
                    else if(data['email']){
                        setValid({flag:2});
                        ele.style.height="15rem";
                        toast.success(`Otp sent successfully to the mail:${email}`);
                    }
            }).catch(function(error){console.log(`Unable to connect axios:${error}`)});
        }
        const verifyOtp=()=>{
            let data;
            let ele=document.getElementById("pass_assist");
            const url="http://localhost/organicra/verify_otp.php";
            let fData=new FormData();
            fData.append('email',email);
            fData.append('otp',otp);
            axios.post(url,fData).then(
                function(response){
                    data=response.data;
                    if(data['verified']){
                        setValid({flag:3});
                        ele.style.height="18rem";
                        toast.success("Your Otp verified");
                    }
                    else
                    {
                        toast.error("Your Otp mismatched");
                    }
                }
            ).catch(function(error){console.log(`Unable to connect axios:${error}`)});
        }
        const password_update=()=>{
            let data;
            let warning,error;
            let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            let confirm_password=document.querySelector("#confirm_pass");
            let Password=document.querySelector("#new_pass");
            if(!passwordRegex.test(password)){
                warning="Password should have minimum 8 characters with at least one uppercase letter, one lowercase letter, one digit, and one special character";
                toast.warning(warning);
                Password.style.boxShadow="0 0 5px 0.2rem #FA7070";
            }
            else if(Password.value!=confirm_password.value){
                error="confirm password should be same as password";
                toast.error(error);
                confirm_password.style.boxShadow="0 0 5px 0.2rem #FA7070";
            }else{
                const url="http://localhost/organicra/update_password.php";
                let fData=new FormData();
                fData.append('email',email);
                fData.append('password', password);
                axios.post(url,fData).then(
                    function(response){
                        data=response.data;
                        console.log(data);
                        if(data['upd_pass']){
                            toast.success("Your password has been updated successfully",{autoClose:1000});
                            setTimeout(()=>{
                                toast.success("Redirecting to the home page",{autoClose:1000});
                            },2000)
                            setTimeout(()=>{
                                window.location.href="/";
                            },4000);
                        }
                        else{
                            toast.error("Some error took place");
                        }
                    }
                ).catch(function(error){console.log(`Unable to connect axios:${error}`)});
            }
        }
        useEffect(()=>{
            document.title=`organicra-${location?.state?.At}`;
          },[])
    return (
        <>
            <ToastContainer autoClose={3000}/>
            <div className="container">
                <div className="image">
                    <img src={logo}/>
                </div>
                <div  className="forgot_password" id="pass_assist">
                   {valid.flag==1&&<div>
                            <h2 style={{fontWeight:"bold",fontSize:"1.5rem",marginLeft:"4rem"}}>Password Assistance</h2>
                            <p style={{fontSize:"0.9rem",width:"80%",color:"#6196A6"}}>Enter the email address associated with your organicra account</p>
                            <p style={{fontWeight:"bold",fontSize:"1rem"}}>Email address</p>
                            <input type='email' placeholder='Email address' style={{fontSize:"1rem"}} onFocus={inputOnFocusHandler} onBlur={inputOnBlurHandler} onChange={(event)=>{setEmail(event.target.value)}}/>
                            <button style={{height:"2.5rem",width:"20rem",backgroundColor:"#90D26D",marginTop:"1.5rem"}} onMouseEnter={buttonOnMouseEnterHandler} onMouseLeave={buttonOnMouseLeaveHandler} onClick={send_otp}>SEND OTP</button>
                    </div>}
                    {valid.flag==2&&<div>
                        <h2 style={{fontWeight:"bold",fontSize:"1.5rem",marginLeft:"4rem"}}>Password Assistance</h2>
                            <p style={{fontWeight:"bold",fontSize:"1rem",marginRight:"10rem"}}>Enter your OTP(email)</p>
                            <input type='text' placeholder='Enter OTP' style={{marginTop:"1rem",fontSize:"1rem"}} onFocus={inputOnFocusHandler} onBlur={inputOnBlurHandler} onChange={(event)=>{setOtp(event.target.value)}}/>
                            <button style={{height:"2.5rem",width:"20rem",backgroundColor:"#90D26D",marginTop:"1.5rem"}} onMouseEnter={buttonOnMouseEnterHandler} onMouseLeave={buttonOnMouseLeaveHandler} onClick={verifyOtp}>VERIFY OTP</button>
                    </div>}
                    {valid.flag==3&&<div>
                            <h2 style={{fontWeight:"bold",fontSize:"1.5rem",marginLeft:"4rem"}}>Password Assistance</h2>
                            <p style={{fontWeight:"bold",fontSize:"1rem",marginRight:"13rem"}}>New password</p>
                            <input type='password' placeholder='New password' style={{fontSize:"1rem"}} id="new_pass" onFocus={inputOnFocusHandler} onBlur={inputOnBlurHandler} onChange={(event)=>{setPassword(event.target.value)}}/>
                            <p style={{fontWeight:"bold",fontSize:"1rem",marginRight:"11.5rem"}} >Confirm password</p>
                            <input type='password' placeholder='Confirm password' style={{fontSize:"1rem"}} id="confirm_pass" onFocus={inputOnFocusHandler} onBlur={inputOnBlurHandler}/>
                            <button style={{height:"2.5rem",width:"20rem",backgroundColor:"#90D26D",marginTop:"1.5rem"}} onMouseEnter={buttonOnMouseEnterHandler} onMouseLeave={buttonOnMouseLeaveHandler} onClick={password_update}>CONTINUE</button>
                    </div>
                    }
                </div>
            </div>
        </>
    )
}
export default Forgot_password;