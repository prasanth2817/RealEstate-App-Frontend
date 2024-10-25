import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const PropertyCard = ({ properties }) => {

  const navigate = useNavigate();

  const handleEdit = (propertyId) => {
    console.log(`Edit property with ID: ${propertyId}`);
    navigate(`/edit/${propertyId}`);
  };

  const handleDelete = (propertyId) => {
    console.log(`Delete property with ID: ${propertyId}`);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {properties.map((property, index) => (
                <div key={index} className="border rounded p-4 shadow">
                    <img src={property.images[0]} alt={property.propertyName} className="w-full h-48 object-cover rounded" />
                    <h3 className="text-xl font-bold mt-2">{property.propertyName}</h3>
                    <p>Type: {property.propertyType}</p>
                    <p>Location: {property.location}</p>
                    <p>Price: ${property.price}</p>
                    <p>{property.description}</p>
                    <p>Status: {property.PropertyStatus}</p>
                    <div className="mt-4 flex justify-between">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => handleEdit(property.id)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => handleDelete(property.id)}
            >
              Delete
            </button>
          </div>
                </div>
            ))}
        </div>
  );
};

PropertyCard.propTypes = {
  properties: PropTypes.arrayOf(
      PropTypes.shape({
          images: PropTypes.arrayOf(PropTypes.string).isRequired,
          propertyName: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
          propertyType: PropTypes.string.isRequired,
          location: PropTypes.string.isRequired,
          price: PropTypes.number.isRequired,
          PropertyStatus: PropTypes.string.isRequired,
      })
  ).isRequired,
};

export default PropertyCard;


