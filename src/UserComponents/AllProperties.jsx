import React, { useState, useEffect } from "react";
import PropertyCard from "./CardListing";
import AxiosService from "../Common/ApiServices";

const AllPropertyListing = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [checkboxes, setCheckboxes] = useState({
    apartment: false,
    house: false,
    villa: false,
  });

  // Fetch all properties
  useEffect(() => {
    const fetchAllProperties = async () => {
      try {
        const response = await AxiosService.get("/property");
        setAllProperties(response.data);
        setFilteredProperties(response.data);
      } catch (error) {
        console.error("Error fetching all properties:", error);
      }
    };
    fetchAllProperties();
  }, []);

  // Enable the filter button if any filter inputs are provided
  useEffect(() => {
    if (
      searchTerm ||
      propertyType.length > 0 ||
      minPrice ||
      maxPrice ||
      sortBy
    ) {
      setIsFilterApplied(true);
    } else {
      setIsFilterApplied(false);
    }
  }, [searchTerm, propertyType, minPrice, maxPrice, sortBy]);

  // Handle filtering and sorting
  const handleFilter = () => {
    let filtered = allProperties; // Always filter from allProperties

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((property) =>
        property.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by property type

    if (propertyType.length > 0) {
      filtered = filtered.filter((property) =>
        propertyType.includes(property.propertyType)
      );
    }

    // Filter by price range
    if (minPrice) {
      filtered = filtered.filter(
        (property) => Number(property.price) >= Number(minPrice)
      );
    }
    if (maxPrice) {
      filtered = filtered.filter(
        (property) => Number(property.price) <= Number(maxPrice)
      );
    }

    // Sort properties
    if (sortBy === "low-to-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "high-to-low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProperties(filtered);
  };

  // Handle property type change
  const handlePropertyTypeChange = (e) => {
    const { value, checked } = e.target;

    // Update checkbox state
    setCheckboxes((prevState) => ({
      ...prevState,
      [value]: checked,
    }));

    if (checked) {
      // Add the property type to the array
      setPropertyType((prevTypes) => [...prevTypes, value]);
    } else {
      // Remove the property type from the array
      setPropertyType((prevTypes) =>
        prevTypes.filter((type) => type !== value)
      );
    }
  };

  // Reset filters to original state
  const resetFilters = () => {
    setSearchTerm("");
    setPropertyType([]);
    setMinPrice("");
    setMaxPrice("");
    setSortBy("");
    setFilteredProperties(allProperties);
    setCheckboxes({
      apartment: false,
      house: false,
      villa: false,
    });
  };

  return (
    <div className="flex flex-col lg:flex-row p-2 min-h-screen">
      {/* Sidebar for filters */}
      <div className="w-full lg:w-1/4 p-4 bg-gray-100 overflow-auto">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>

        {/* Search by property location */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Search by location</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border bg-slate-700 border-gray-300 rounded text-white"
            placeholder="Search by property location"
          />
        </div>

        {/* Property Type Filter (Checkboxes) */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Property Type</label>
          <div>
            <label className="block">
              <input
                type="checkbox"
                value="apartment"
                checked={checkboxes.apartment}
                onChange={handlePropertyTypeChange}
              />{" "}
              Apartment
            </label>
            <label className="block">
              <input
                type="checkbox"
                value="house"
                checked={checkboxes.house}
                onChange={handlePropertyTypeChange}
              />{" "}
              House
            </label>
            <label className="block">
              <input
                type="checkbox"
                value="villa"
                checked={checkboxes.villa}
                onChange={handlePropertyTypeChange}
              />{" "}
              Villa
            </label>
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Min Price</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full p-2 border bg-slate-700 border-gray-300 rounded text-white"
            placeholder="Min price"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Max Price</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full p-2 border bg-slate-700 border-gray-300 rounded text-white"
            placeholder="Max price"
          />
        </div>

        {/* Sort By */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Sort by Price</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full p-2 border bg-slate-700 text-white border-gray-300 rounded"
          >
            <option value="">Select</option>
            <option value="low-to-high">Low to High</option>
            <option value="high-to-low">High to Low</option>
          </select>
        </div>

        {/* Apply Filter Button */}
        <button
          onClick={handleFilter}
          disabled={!isFilterApplied}
          className={`w-full p-2 text-white rounded flex items-center justify-center ${
            isFilterApplied
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Apply Filters
        </button>

        <button
          onClick={resetFilters}
          className="w-full p-2 text-white rounded mt-4 bg-red-400 hover:bg-red-600"
        >
          Reset Filters
        </button>
      </div>

      {/* Property Cards */}
      <div className="w-full lg:w-3/4 p-4">
        <h2 className="text-lg font-semibold mb-4">Property Listings</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property, index) => (
              <PropertyCard key={index} property={property} />
            ))
          ) : (
            <p className="w-full text-center text-2xl">
              No properties found matching the criteria.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllPropertyListing;
