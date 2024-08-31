import React,{useEffect} from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './AboutUs.css'
import terms from '../images/terms.png';
import { useLocation } from 'react-router-dom';
function TermsAndConditions() {
  const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0); 
      }, [pathname]);
  return (
    <>
      <Navbar disabled={true}/>
      <div className="aboutus">
          <div>
            <h1>Terms and Conditions</h1>
            <p>Welcome to Organicra! These terms and conditions outline the rules and regulations for the use of Organicra's Website, located at www.organicra.com.</p>

            <h2>Interpretation and Definitions</h2>
            <p>Interpretation: The words of which the initial letter is capitalized have meanings defined under the following conditions.</p>

            <h2>License to Use Website</h2>
            <p>Unless otherwise stated, Organicra and/or its licensors own the intellectual property rights for all material on Organicra. All intellectual property rights are reserved. You may access this from Organicra for your own personal use subjected to restrictions set in these terms and conditions.</p>

            <h2>Restrictions</h2>
            <p>You are specifically restricted from all of the following:</p>
            <ul>
              <li>publishing any Website material in any other media;</li>
              <li>selling, sublicensing and/or otherwise commercializing any Website material;</li>
              <li>publicly performing and/or showing any Website material;</li>
              <li>using this Website in any way that is or may be damaging to this Website;</li>
              <li>using this Website in any way that impacts user access to this Website;</li>
              <li>using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity;</li>
            </ul>

            <h2>Termination</h2>
            <p>We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>

            <h2>Changes to This Agreement</h2>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms of Service by posting the updated terms on the Site. Your continued use of the Site after any such changes constitutes your acceptance of the new Terms of Service.</p>

            <h2>Contact Us</h2>
            <p>If you have any questions or concerns about our Terms and Conditions, please contact us at terms@organicra.com.</p>
          </div>
          <div>
              <img src={terms}/>
          </div>
        </div>
        <Footer/>
    </>
  );
}

export default TermsAndConditions;
