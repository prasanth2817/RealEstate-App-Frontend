# RealEstate Listing Application

A comprehensive real estate listing application built using the MERN stack (MongoDB, Express, React, Node.js). 
This application allows users to search for properties, manage property listings, and update property statuses.

## Features

- Property listing management
- Property search functionality
- Image upload for properties
- Property status updates
- Filtering properties by type and price

## Installation

### Prerequisites

- Node.js (v18.18.0)
- MongoDB
- Git

### Clone the Repository

```bash
git clone https://github.com/prasanth2817/RealEstate-Listing-Application.git
cd RealEstate-Listing-Application

Usage
Open your browser and navigate to http://localhost:3000 to access the application.
Use Postman or any API testing tool to interact with the backend APIs.
API Endpoints
Properties
Create Property

POST /properties/create
Body: multipart/form-data with property details and images
Get Property by ID

GET /properties/:id
Params: id - Property ID
Get All Properties

GET /properties
Search Properties

GET /properties/search
Query Params: query, propertyType, minPrice, maxPrice
Edit Property

PUT /properties/:id
Params: id - Property ID
Body: multipart/form-data with updated property details and images
Delete Property

DELETE /properties/:id
Params: id - Property ID
Update Property Status

PATCH /properties/status/:id
Params: id - Property ID
Body: json with status field

Technologies
Frontend: React.js, Tailwind CSS
Backend: Node.js, Express.js
Database: MongoDB
Storage: Cloudinary (for image storage)
