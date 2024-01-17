import React from "react";
import './footer.css'
const Footer = () => {
    return(
        <footer>
            <div className="footer-section">
                <h3>Address</h3>
                <p>Your Address Here</p>
            </div>
            <div className="footer-section">
                <h3>Contact Us</h3>
                <p>Email: info@example.com</p>
                <p>Phone: +123456789</p>
            </div>
            <div className="footer-section">
                <h3>Socials</h3>
                <p>Follow us on social media:</p>
                {/* Add your social media icons or links here */}
            </div>
            <div className="footer-section">
                <h3>Terms of Service</h3>
                <p>Read our terms of service here.</p>
            </div>
        </footer>
    )
}
export default Footer;