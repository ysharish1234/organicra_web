import React,{useEffect} from 'react'
import {useState} from 'react'
import logo from '../images/logo.jpg';
import './Signup.css';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Signup() {
    const location=useLocation();
    const [name,setName]=useState("");
    const [phNumber,setPhNumber]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [otp,setOtp]=useState("");
    useEffect(()=>{
      document.title=`organicra-${location?.state?.At}`;
    },[])
    const [valid,setValid]=useState({flag:1});
    const resendOtp=()=>{
        let data;
        const url="http://localhost/organicra/resendOtp.php";
            let fData=new FormData();
            fData.append('email',email);
            axios.post(url,fData).then(
                function(response){
                    data=response.data;
                    if(data['email']){
                        toast.success(`Otp resent successfully to the mail:${email}`);
                    }
            }).catch(function(error){console.log(`Unable to connect axios:${error}`)});
    }
    const isValid =()=>{
        let name_reg=/^[a-zA-Z ]+$/;
        let mb_reg=/[^0][0-9]{9}/;
        let email_reg=/[a-z]+\@[a-z]+\.[a-z]{2,3}/;
        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        let mobile_no=document.querySelector("#mobile_no");
        let Name=document.querySelector("#name");
        let Email=document.querySelector("#email");
        let Password=document.querySelector("#new_pass");
        let confirm_password=document.querySelector("#confirm_pass");
        let error,warning;
        let data;
        let ele=document.getElementById("sign");
        if(!name_reg.test(Name.value)){
            error="Name must contain only alphabets";
            toast.error(error);
            Name.style.boxShadow="0 0 5px 0.2rem #FA7070";
        }
        else if(!mb_reg.test(mobile_no.value)){
            error="Mobile number must contain 10 digits and cannot start with 0";
            toast.error(error);
            mobile_no.style.boxShadow="0 0 5px 0.2rem #FA7070";
        }
        else if(!email_reg.test(Email.value)){
            error="Email must contain @ and .";
            toast.error(error);
            Email.style.boxShadow="0 0 5px 0.2rem #FA7070";
        }
        else if(!passwordRegex.test(password)){
            warning="Password should have minimum 8 characters with at least one uppercase letter, one lowercase letter, one digit, and one special character";
            toast.warning(warning);
            Password.style.boxShadow="0 0 5px 0.2rem #FA7070";
        }
        else if(Password.value!=confirm_password.value){
            error="confirm password should be same as password";
            toast.error(error);
            confirm_password.style.boxShadow="0 0 5px 0.2rem #FA7070";
        }
        else {
            const url="http://localhost/organicra/signup.php";
            let fData=new FormData();
            fData.append('name',name);
            fData.append('phNumber',phNumber);
            fData.append('email',email);
            fData.append('password',password);
            axios.post(url,fData).then(
                function(response){
                    data=response.data;
                    if(data['dup_email']){
                        console.log("Email already exists");
                        toast.error("Email that you have entered is already exist!");
                    }
                    else if(data['email']){
                        setValid({flag:2});
                        ele.style.height="20rem";
                        toast.success(`Otp sent successfully to the mail:${email}`);
                    }
            }).catch(function(error){console.log(`Unable to connect axios:${error}`)});
        }
    }
    const verifyOtp=()=>{
        let data;
        const url="http://localhost/organicra/verify_otp.php";
        let fData=new FormData();
        fData.append('email',email);
        fData.append('otp',otp);
        fData.append('otp_verify_for',true);
        axios.post(url,fData).then(
            function(response){
                data=response.data;
                console.log(data);
                if(data['verified']){
                    localStorage.setItem('email',email);
                    toast.success("Your Otp verified successfully!",{autoClose:1000});
                    setTimeout(()=>{
                        toast.success("Redirecting to the home page",{autoClose:1000});
                    },2000)
                    setTimeout(()=>{
                        window.location.href="/";
                    },4000);
                }
                else
                {
                    toast.error("Your Otp mismatched");
                }
            }
        )
    }
    const inputOnFocusHandler=(event)=>{
        event.target.style.border="0.3rem solid #6E7DA2";
        event.target.style.backgroundColor="AAD7D9";
        event.target.style.boxShadow="0 0 5px 0.2rem #78C1F3"
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
            <div className="COntainer">
                <div className="image">
                    <img src={logo}/>
                </div>
                <div className='Signup' id="sign">
                        <h2 style={{fontWeight:"bold",fontSize:"2rem"}}>Signup</h2>
                        {valid.flag==1&&<div>
                            <p style={{fontWeight:"bold",fontSize:"1rem",marginRight:"12rem"}}>Enter your Name</p>
                            <input type='text' placeholder='Full Name' id="name"  onFocus={inputOnFocusHandler} onBlur={inputOnBlurHandler} onChange={(event)=>{setName(event.target.value)}} value={name}/>
                            <p style={{fontWeight:"bold",fontSize:"1rem",marginRight:"7rem"}}>Enter your Mobile Number</p>
                            <input type='text' placeholder='Mobile Number' id="mobile_no" onFocus={inputOnFocusHandler} onBlur={inputOnBlurHandler} onChange={(event)=>{setPhNumber(event.target.value)}} value={phNumber}/>
                            <p style={{fontWeight:"bold",fontSize:"1rem",marginRight:"8rem"}}>Enter your email address</p>
                            <input type='email' placeholder='Email address' id="email"  onFocus={inputOnFocusHandler} onBlur={inputOnBlurHandler} onChange={(event)=>{setEmail(event.target.value)}} value={email}/>
                            <p style={{fontWeight:"bold",fontSize:"1rem",marginRight:"13rem"}}>New password</p>
                            <input type='password' placeholder='New password'  id="new_pass" onFocus={inputOnFocusHandler} onBlur={inputOnBlurHandler} onChange={(event)=>{setPassword(event.target.value)}}/>
                            <p style={{fontWeight:"bold",fontSize:"1rem",marginRight:"11.5rem"}} >Confirm password</p>
                            <input type='password' placeholder='Confirm password'  id="confirm_pass" onFocus={inputOnFocusHandler} onBlur={inputOnBlurHandler}/>
                            <button style={{height:"2.5rem",width:"20rem",marginTop:"1rem",backgroundColor:"#90D26D"}} onMouseEnter={buttonOnMouseEnterHandler} onMouseLeave={buttonOnMouseLeaveHandler} onClick={isValid}>SEND OTP</button>
                        </div>}
                        {valid.flag==2&&
                            <div>
                            <div style={{fontWeight:"bold",fontSize:"1rem",display:"flex",justifyContent:"space-between",width:"100%",alignItems:"center"}}>
                                <p style={{fontWeight:"bold",fontSize:"1rem",marginTop:"1rem",marginLeft:"2rem"}}>Enter your OTP(email)</p>
                                <span style={{marginRight:"3rem",color:"#211C6A"}} onClick={resendOtp}>Resend otp</span>
                            </div>
                                <input type='text' placeholder='Enter OTP' style={{marginTop:"1rem",fontSize:"1rem"}} onFocus={inputOnFocusHandler} onBlur={inputOnBlurHandler} onChange={(event)=>{setOtp(event.target.value)}}/>
                                <button style={{height:"2.5rem",width:"20rem",marginTop:"1rem",backgroundColor:"#90D26D"}} onMouseEnter={buttonOnMouseEnterHandler} onMouseLeave={buttonOnMouseLeaveHandler} onClick={verifyOtp}>VERIFY OTP</button>
                            </div>
                        }
                </div> 
            </div>
        </>
    )
}
export default Signup;