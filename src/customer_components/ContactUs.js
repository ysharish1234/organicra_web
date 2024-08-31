import React,{useEffect} from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './AboutUs.css';
import contact from '../images/contact.png';
import { useLocation } from 'react-router-dom';
function ContactUs() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0); 
      }, [pathname]);
  return (
    <>
    <Navbar disabled={true}/>
    <div className="aboutus">
        <div>
        <h1>Contact Us</h1>
        <p>If you have any questions, feedback, or inquiries, please feel free to contact us using the information below:</p>

        <h2>Email</h2>
        <p>For general inquiries: info@organicra.com</p>
        <p>For customer support: support@organicra.com</p>
        <p>For sales inquiries: sales@organicra.com</p>

        <h2>Phone</h2>
        <p>Main office: +91 8639357075</p>
        <p>Customer support: +91 90146 10904</p>

        <h2>Address</h2>
        <p>Organicra Headquarters</p>
        <p>Mangalpalli</p>
        <p>Rayachoty, AP,516268</p>
        <p>India</p>

        <h2>Follow Us</h2>
        <p>Stay connected with us on social media:</p>
        <ul>
            <li>Facebook: facebook.com/organicra</li>
            <li>Twitter: twitter.com/organicra</li>
            <li>Instagram: organic_ra</li>
        </ul>

        <p>We look forward to hearing from you!</p>
        </div>
        <div>
            <img src={contact} style={{width:"70%"}}/>
        </div>
    </div>
    <Footer/>
    </>
  );
}

export default ContactUs;
