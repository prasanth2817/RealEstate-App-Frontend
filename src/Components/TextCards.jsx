import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../Common/Images/section-image-realEstate.png"

function TextCards() {
  return (
    <section className="container mx-auto flex flex-col items-center justify-center gap-8 p-4">
      <div className="flex flex-col text-center">
        <h6 className="font-bold my-2">ALL PROPERTY NEEDS - ONE PORTAL</h6>
        <h1 className="my-4 text-center">
          Find Better Places to Live,
          <br /> Work and Wonder...
        </h1>
      </div>
      <div className="flex flex-col md:flex-row md:gap-10 relative w-full max-w-5xl">
        {/* Left Side - Image */}
        <div className="w-full md:w-1/2 overflow-hidden rounded-lg">
          <img
            className="w-full h-80 object-cover transition-transform duration-500 hover:scale-105"
            src={BannerImage}
            alt="banner"
          />
        </div>
        {/* Right Side - Text */}
        <div className="p-4 md:p-8 my-2 md:w-1/2 flex flex-col justify-center">
          <h6 className="font-bold">BUY A HOME</h6>
          <h1 className="font-medium text-xl">
            Find, Buy & Own Your Dream Home
          </h1>
          <h5 className="font-normal text-lg">
            Explore from Apartments, land, builder floors, villas and more
          </h5>
          <Link to="/allproperties">
            <button className="w-6/12 mt-4 px-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
              Explore More
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default TextCards;
