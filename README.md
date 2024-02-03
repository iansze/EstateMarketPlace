# EstateMarketPlace

EstateMarketPlace is a comprehensive full-stack application tailored for the real estate industry, enabling users to seamlessly engage in buying, selling, and renting properties. It features a robust authentication system, interactive property listings, and an intuitive search mechanism.

## Features

- **User Authentication**: Implements a secure authentication system, including options for Google OAuth.
- **Property Listings**: Users can manage (create, view, edit, and delete) listings with detailed descriptions and photos.
- **Advanced Search**: Facilitates property searches based on various criteria like location, price, and type.
- **Responsive Design**: Ensures a consistent user experience across desktop and mobile devices.

## Tech Stack

### Backend

- **Node.js**: For server-side logic.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: Document-oriented database for storing application data.
- **Firebase Authentication**: For managing user authentication securely.

### Frontend

- **React**: For building the user interface.
- **Redux**: State management library for React.
- **Tailwind CSS**: Utility-first CSS framework for designing custom interfaces.
- **Firebase**: Used for Google OAuth integration and storing images.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
- Node.js
- npm
  
```bash
# Clone the repository
git clone https://github.com/iansze/EstateMarketPlace.git
cd EstateMarketPlace

# Setup and start the backend
cd backend
npm install
npm start

# Setup and start the frontend in a new terminal window
cd ../client
npm install
npm run dev


