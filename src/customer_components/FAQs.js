import React,{useEffect} from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Faq from '../images/FAQ.png'
import './AboutUs.css';
import { useLocation } from 'react-router-dom';
function FAQ() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0); 
      }, [pathname]);
  return (
    <> 
        <Navbar disabled={true}/>
        <div className='aboutus'>
            <div>
            <h1>Frequently Asked Questions (FAQ)</h1>

            <h2>Q: What organic products do you offer?</h2>
            <p>A: We offer a wide range of organic products, including fresh fruits and vegetables, grains, dairy products, meats, and more.</p>

            <h2>Q: How can I place an order?</h2>
            <p>A: To place an order, simply browse our website, add the desired products to your cart, and proceed to checkout. Follow the prompts to enter your shipping and payment information to complete your order.</p>

            <h2>Q: What payment methods do you accept?</h2>
            <p>A: We accept all major credit and debit cards, as well as PayPal, for online payments.</p>

            <h2>Q: How long will it take to receive my order?</h2>
            <p>A: Delivery times may vary depending on your location and the availability of products. We strive to process and ship orders as quickly as possible. You can track the status of your order using the tracking information provided.</p>

            <h2>Q: Can I return or exchange products?</h2>
            <p>A: Yes, we have a hassle-free return and exchange policy. If you're not satisfied with your purchase for any reason, you can return the product within [number] days for a full refund or exchange.</p>

            <h2>Q: How can I contact customer support?</h2>
            <p>A: If you have any questions or need assistance, please contact our customer support team at support@organicra.com. We're here to help!</p>

            <h2>Q: Do you offer bulk discounts?</h2>
            <p>A: Yes, we offer discounts on bulk orders. Please contact our sales team at sales@organicra.com for more information.</p>

            <h2>Q: Are your products certified organic?</h2>
            <p>A: Yes, all of our products are certified organic by [certification body]. We adhere to strict organic standards to ensure the quality and integrity of our products.</p>

            <h2>Q: Do you offer international shipping?</h2>
            <p>A: Currently, we only offer shipping within [country/region]. We hope to expand our shipping options in the future.</p>

            <h2>Q: How can I stay updated on promotions and new products?</h2>
            <p>A: To stay updated on promotions, new products, and other announcements, you can sign up for our newsletter or follow us on social media.</p>
            </div>
            <div>
                <img src={Faq}/>
            </div>
        </div>
        <Footer/>
    </>
  );
}

export default FAQ;
