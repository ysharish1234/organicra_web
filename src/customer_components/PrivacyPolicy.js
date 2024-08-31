import React,{useEffect} from 'react';
import './AboutUs.css'
import Navbar from './Navbar';
import Footer from './Footer';
import privacy from '../images/privacy.png'
import { useLocation } from 'react-router-dom';
function PrivacyPolicy() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0); 
      }, [pathname]);
  return (
    <>
    <Navbar disabled={true}/>
    <div className="aboutus">
        <div>
            <h1>Privacy Policy</h1>
            <p>Your privacy is important to us. This Privacy Policy explains how Organicra collects, uses, and protects your personal information when you use our website.</p>
            
            <h2>Information We Collect</h2>
            <p>When you use Organicra, we may collect the following types of information:</p>
            <ul>
                <li>Personal Information: This may include your name, email address, shipping address, and payment information when you make a purchase.</li>
                <li>Usage Data: We may collect information about how you interact with our website, such as the pages you visit and the actions you take.</li>
                <li>Cookies: We use cookies to enhance your browsing experience and track usage patterns on our website.</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We may use the information we collect for the following purposes:</p>
            <ul>
                <li>To process orders and transactions</li>
                <li>To improve our products and services</li>
                <li>To personalize your experience</li>
                <li>To communicate with you about your orders and account</li>
                <li>To send promotional offers and marketing communications</li>
            </ul>

            <h2>Information Sharing</h2>
            <p>We may share your information with third-party service providers who assist us in operating our website and providing services to you. We may also share your information as required by law or to protect our rights.</p>

            <h2>Security</h2>
            <p>We take the security of your personal information seriously and use industry-standard measures to protect it from unauthorized access, disclosure, or alteration.</p>

            <h2>Changes to This Privacy Policy</h2>
            <p>We reserve the right to update or change this Privacy Policy at any time. Any changes will be posted on this page, and your continued use of Organicra after the changes have been made will constitute your acceptance of the revised Privacy Policy.</p>

            <h2>Contact Us</h2>
            <p>If you have any questions or concerns about our Privacy Policy, please contact us at privacy@organicra.com.</p>
            </div>
            <div>
                <img src={privacy}/>
            </div>
        </div>
    <Footer/>
    </>
  );
}

export default PrivacyPolicy;
