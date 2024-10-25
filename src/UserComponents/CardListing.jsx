import React from "react";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/property/${property._id}`, { state: { property } });
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer border border-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative">
        <img
          src={property.images[0]}
          alt={property.propertyName}
          className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-3">
        <h3 className="text-lg font-semibold mb-1">{property.propertyName}</h3>
        <p className="text-gray-700 text-sm mb-1">{property.location}</p>
        <p className="text-gray-700 text-sm mb-1">${property.price}</p>
        <p className="text-gray-700 text-sm">{property.propertyType}</p>
      </div>
    </div>
  );
};

export default PropertyCard;
