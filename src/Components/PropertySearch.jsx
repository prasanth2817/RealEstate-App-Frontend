import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AxiosService from "../Common/ApiServices";

function PropertySearch() {
  const [query, setQuery] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query && !propertyType && !minPrice && !maxPrice) {
        toast.error("Please fill in at least one search field.");
        return;
      }
    
      // Validation for propertyType field if required
      if (propertyType === "") {
        toast.error("Please select a property type.");
        return;
      }
    
      // Validation for price range
      if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
        toast.error("Min price should be less than Max price.");
        return;
      }

      try {
        setIsLoading(true);
        const response = await AxiosService.get(
          "http://localhost:8000/property/search",
          {
            params: {
              query,
              propertyType,
              minPrice,
              maxPrice,
            },
          }
        );
        
        // Check for successful response
        if (response.status === 200) {
          navigate("/listings", { state: { properties: response.data } });
        } else {
          toast.error(response.data.error || "Unexpected error occurred.");
        }
      } catch (error) {
        // Error handling block
        if (error.response) {
          // Check for specific error responses
          if (error.response.status === 401) {
            toast.error("Session expired. Please log in again.");
            localStorage.removeItem("User-token");
            navigate("/login");
          } else {
            toast.error(
              error.response.data.message || "Error searching properties. Please try again."
            );
          }
        } else {
          // Handle network errors or other types of errors
          toast.error("Network error. Please check your connection.");
        }
        console.error("Error searching properties:", error);
      } finally {
        setIsLoading(false);
      }
  };

  return (
    <div className="container xl:mx-40 xl:my-10 md:mx-20 md:my-8 bg-slate-900 bg-opacity-70 p-6 rounded-md shadow-md">
      <h1 className="text-center text-xl font-bold p-2 text-gray-200">
        {" "}
        Search Properties{" "}
      </h1>
      <div className="flex flex-col justify-center xl:gap-8 md:gap-8">
        <div className="flex gap-6 field relative">
          <input
            type="text"
            placeholder="Search by Property Name or Location"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className=" w-full p-2 text-base border rounded-lg bg-slate-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-9/12 p-1 border rounded text-gray-500 bg-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value=""> Property Type</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Condo">Condo</option>
            <option value="villa">Villa</option>
          </select>
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-6/12 p-1 border bg-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-6/12 p-2 border bg-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={handleSearch}
            className={`w-3/12 p-2 text-center hover:divide-teal-500 bg-blue-500 text-white rounded ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PropertySearch;
