import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropertyCard from "../UserComponents/CardListing";
import AxiosService from "../Common/ApiServices";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await AxiosService.get(
          "http://localhost:8000/property"
        );
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  // Take only the first 3 properties for the preview
  const previewProperties = properties.slice(0, 3);

  return (
    <div className="container mx-auto w-full p-4">
      <h2 className="text-lg font-semibold mb-4">Property Listings</h2>

      {/* Grid displaying only first 3 properties */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {previewProperties.map((property, index) => (
          <PropertyCard key={index} property={property} />
        ))}
      </div>

      {/* View More Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => navigate('/allProperties')}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default PropertyList;
