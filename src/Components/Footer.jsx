import React from "react";

function Footer() {
  return (
    <footer className="container footer-sides">
      <div className="footer-content row">
        <div className="col-12 col-md-6 col-lg-3 mb-4">
          <div className="footer-text">
            <h1 className="footer-headtext text-center">Company</h1>
            <span className="d-block text-center">About</span>
            <span className="d-block text-center">Careers</span>
            <span className="d-block text-center">Mobile</span>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-3 mb-4">
          <div className="footer-text">
            <h1 className="footer-headtext text-center">Contact</h1>
            <span className="d-block text-center">Help/FAQ</span>
            <span className="d-block text-center">Press</span>
            <span className="d-block text-center">Affiliates</span>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-3 mb-4">
          <div className="footer-text">
            <h1 className="footer-headtext text-center">More</h1>
            <span className="d-block text-center">Airlinefees</span>
            <span className="d-block text-center">Airline</span>
            <span className="d-block text-center">Low fare tips</span>
          </div>
        </div>
      </div>
      <div className="footer-copyrights col-12 text-center">
        All rights reserved @ MyEstates.com
      </div>
    </footer>
  );
}

export default Footer;