import React from "react";
import "./footer.css"
import { NavLink } from "react-router-dom";



const Footer = () => {

    const year = new Date().getFullYear();
    console.log(year);




  return (
    <footer>
    <div className="header"><center><h2>Contact US</h2></center></div>
      <div className="footer_container">
        <div className="footr_details_one">
        <div className="footr_details_1">
        <ion-icon name="logo-instagram"></ion-icon>
        </div>
        </div>
        <div className="footr_details_one">
        <div className="footr_details_2">
        <ion-icon name="logo-facebook" id="facebook"></ion-icon>
        </div>
        </div>
        
        <div className="footr_details_one forres">
        <div className="footr_details_3">
        <ion-icon name="logo-linkedin"></ion-icon>
        </div>
        </div>
      </div>
      <div className="lastdetails">
        <img src="./shopaholic-logo1.png" alt="" />
        <p>Conditions of Use & Sale &nbsp; &nbsp;&nbsp;  Privacy Notice  &nbsp; &nbsp;&nbsp; Interest-Based Ads  &nbsp; &nbsp;&nbsp;  © 2022-{year}, Shopaholic, Inc. or its affiliates</p>
      </div>
    </footer>
  );
};

export default Footer;
