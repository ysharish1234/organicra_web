import React,{useEffect} from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import about from '../images/about.jpg';
import './AboutUs.css'
import { useLocation } from 'react-router-dom';
function AboutUs() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0); 
      }, [pathname]);
  return (
    <>
        <Navbar disabled={true}/>
        <div className="aboutus">
            <div>
                <h1>About Organicra</h1>
                <p>Welcome to Organicra, your go-to platform for organic products! At Organicra, we are committed to providing high-quality organic products to our customers while supporting local farmers in selling their organic produce.</p>
                <h2>Our Mission</h2>
                <p>Our mission at Organicra is to promote healthy living and sustainable agriculture by connecting customers with organic products and empowering farmers to sell their produce directly to consumers.</p>
                <h2>Our Values</h2>
                <ul>
                    <li>Quality: We believe in providing only the highest quality organic products to our customers.</li>
                    <li>Sustainability: We are committed to promoting sustainable farming practices and reducing our environmental footprint.</li>
                    <li>Community: We strive to build a community of like-minded individuals who share our passion for organic living.</li>
                    <li>Transparency: We believe in transparency and strive to provide customers with information about the origin and quality of our products.</li>
                </ul>
                <h2>Why Choose Organicra?</h2>
                <p>Organicra offers a wide range of organic products, including fresh fruits and vegetables, grains, dairy products, meats, and more. Here are some reasons why you should choose Organicra:</p>
                <ul>
                    <li>Freshness: Our products are sourced directly from local farmers, ensuring freshness and quality.</li>
                    <li>Health Benefits: Organicra products are free from synthetic pesticides, hormones, and other harmful chemicals, making them healthier for you and the environment.</li>
                    <li>Support Local Farmers: By shopping with Organicra, you are supporting local farmers and promoting sustainable agriculture in your community.</li>
                    <li>Convenience: With Organicra, you can shop for organic products from the comfort of your home and have them delivered right to your doorstep.</li>
                </ul>
                <h2>Our Team</h2>
                <p>Organicra was founded by a team of passionate individuals who share a common goal of promoting organic living and supporting local farmers. Meet the faces behind Organicra:</p>
                <ul>
                    <li>Nallannagri Reddaiah - Founder & CEO</li>
                    <li>Yarram sai harish - Chief Operating Officer</li>
                    <li>Bujji Reddy sai kishore Reddy- Head of Marketing</li>
                    <li>Borra Karthik - Head of Customer Relations</li>
                </ul>
            </div>
            <div >
                <img src={about}/>
            </div>
        </div>
        <Footer/>
    </>
  );
}

export default AboutUs;
