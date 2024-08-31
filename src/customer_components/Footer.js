import React from 'react'
import './Footer.css';
import logo from '../images/logo.jpg'
import { GrFacebookOption } from "react-icons/gr";
import { FaInstagram } from "react-icons/fa";
import { SlSocialTwitter } from "react-icons/sl";
import { Link } from 'react-router-dom';
export default function Footer() {
    return (
        <>  
                <div className="footer">
                    <div className='footer_info'>
                        <div style={{display: 'flex', flexDirection: 'column',alignItems:"flex-start",justifyContent:"space-evenly",height:"100%"}}>
                            <li style={{fontWeight:'bold',fontSize:"1.2rem",cursor:"pointer"}}>organicra</li>
                            <Link to="/AboutUs" style={{textDecoration:"none",color:"white"}}>
                                <li style={{cursor:"pointer"}}>About us</li>
                            </Link>
                            <Link to="/privacy-policy" style={{textDecoration:"none",color:"white"}}>
                                <li style={{cursor:"pointer"}}>Privacy Policy</li>
                            </Link>
                            <Link to="/terms-conditions" style={{textDecoration:"none",color:"white"}}>
                            <li style={{cursor:"pointer"}}>Terms and conditions</li>
                            </Link>
                        </div>
                        <div  style={{display: 'flex', flexDirection: 'column',alignItems:"flex-start",justifyContent:"space-evenly",height:"80%"}}>
                            <li style={{fontWeight:'bold',fontSize:"1.2rem",cursor:"pointer"}}>Help</li>
                            <Link to="/FAQ" style={{textDecoration:"none",color:"white"}}>
                                <li style={{cursor:"pointer"}}>FAQs</li>
                            </Link>
                            <Link to="/contactus" style={{textDecoration:"none",color:"white"}}>
                                <li style={{cursor:"pointer"}}>Contact us</li>
                            </Link>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column',alignItems:"center",justifyContent:"space-evenly",height:"120%",width:"10rem"}}>
                            <img src={logo} style={{width:"7rem",height:"7rem",borderRadius:"4rem"}}/>
                            <div style={{display: 'flex',flexDirection: 'row',justifyContent:"space-evenly",width:"100%"}}>
                                <li className='SN'><GrFacebookOption fontSize="1.5rem"/></li>
                                <a href="https://www.instagram.com/organic_ra/"  target="_blank" style={{textDecoration:"none",color:"white"}}><li className='SN'><FaInstagram fontSize="1.5rem"/></li></a>
                                <li className='SN'><SlSocialTwitter fontSize="1.5rem"/></li>
                            </div>
                        </div>
                     </div>
                     <div className="dotted-row"></div>
                </div>
        </>
    )
}