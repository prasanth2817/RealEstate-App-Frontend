import { useLocation, useNavigate ,useParams } from 'react-router-dom';

const SearchedResults = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const properties = location.state?.properties || [];

    const handleEdit = (propertyId) => {
        console.log(`Edit property with ID: ${propertyId}`);
        navigate(`/edit/${propertyId}`);
      };
    
      const handleDelete = (propertyId) => {
        console.log(`Delete property with ID: ${propertyId}`);
      };

    return (
        <div className="container mx-auto mt-16 p-4">
            <h1 className="text-2xl font-bold mb-4 text-slate-800">Searched Results :</h1>
            {properties.length > 0 ? (
                properties.map((property, index) => (
                    <div key={index} className="mb-4 text-xl font-light">
                        <h2 className="text-2xl font-bold p-4 text-cyan-950">Name of the property : {property.propertyName}</h2>
                        {property.images && property.images.map((image, i) => (
                            <img key={i} src={image} alt={`property-${i}`} className="w-full h-auto" />
                        ))}
                        <p>property type : {property.propertyType}</p>
                        <p>location : {property.location}</p>
                        <p>price : {property.price}</p>
                        <p>description : {property.description}</p>
                        <p>status : {property.PropertyStatus}</p>
                        <div className="mt-4 flex justify-between">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => handleEdit(id)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => handleDelete(id)}
            >
              Delete
            </button>
          </div>
                    </div>
                ))
            ) : (
                <p>No properties found.</p>
            )}
        </div>
    );
};

export default SearchedResults;




