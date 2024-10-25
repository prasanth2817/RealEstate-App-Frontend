import { useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { jwtDecode } from "jwt-decode";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import toast from "react-hot-toast";
import AxiosService from "../Common/ApiServices";

const PropertyDetails = () => {
  const location = useLocation();
  const property = location.state?.property;

  const handleAddToFavorites = async () => {
    try {
      const token = localStorage.getItem("User-token");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken?.id;
      const propertyId = property._id;

      const response = await AxiosService.post("/favorites/create", {
        propertyId,
        userId,
      });
      toast.success(response.data.message);
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Failed to add favorite");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const handleContactSeller = () => {
    toast.success(
      `Contact request received for ${property.propertyName}. The seller will get back to you soon.`
    );
  };

  if (!property) {
    return (
      <div className="container mx-auto mt-16 p-4">No property found.</div>
    );
  }

  return (
    <div
      className="container mx-auto mt-16 p-4"
      style={{ marginTop: "0", paddingTop: "0" }}
    >
      <h1 className="text-3xl font-bold mb-6 text-slate-800">
        Property Details
      </h1>
      <h2 className="text-2xl font-bold mb-4 text-cyan-950">
        {property.propertyName}
      </h2>

      <Swiper
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className="mb-6"
      >
        {property.images.map((image, i) => (
          <SwiperSlide key={i}>
            <img
              src={image}
              alt={`property-${i}`}
              className="w-full h-96 object-cover rounded-lg shadow-md"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mb-4 text-xl font-light">
        <p className="font-semibold">Property Type: {property.propertyType}</p>
        <p className="font-semibold">Location: {property.location}</p>
        <p className="font-semibold">Price: ${property.price}</p>
        <p className="font-semibold">Description: {property.description}</p>
        <p className="font-semibold">Status: {property.PropertyStatus}</p>
      </div>

      <div className="mt-4 flex space-x-4">
        <button
          onClick={handleAddToFavorites}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Add to Favorites
        </button>
        <button
          onClick={handleContactSeller}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
        >
          Contact Seller
        </button>
      </div>
    </div>
  );
};

export default PropertyDetails;
