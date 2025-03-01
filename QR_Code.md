# QR Code Generator

### Live Link Here
- **QR Code Generator**: qr-code-frontend-zeta.vercel.app


## Overview

This project is a QR Code Generator application built with React and Vite. It allows users to generate, customize, and save QR codes. Users can also register, login, and manage their QR codes.

## Features

- **User Authentication**: Register, login, and logout functionality.
- **QR Code Generation**: Generate QR codes with custom data, frame text, border style, and color.
- **Save and Retrieve QR Codes**: Save generated QR codes and retrieve them later.
- **Download QR Codes**: Download generated QR codes as PNG images.
- **Password Reset**: Reset password functionality with OTP verification.

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-repo/qr-code-generator.git
    cd qr-code-generator
    ```

2. Install dependencies:
    ```sh
    npm install
    # or
    yarn install
    ```

### Setting Up Environment Variables

1. Create a `.env` file in the root of the project:
    ```sh
    touch .env
    ```

2. Add the following environment variable to the `.env` file:
    ```properties
    VITE_BACKEND_URL="http://localhost:5000"
    ```

### Setting Up Tailwind CSS

1. Install Tailwind CSS:
    ```sh
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    ```

2. Configure `tailwind.config.js`:
    ```js
    // tailwind.config.js
    module.exports = {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    }
    ```

3. Add Tailwind directives to your CSS file:
    ```css
    /* src/index.css */
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

### Running the Application

1. Start the development server:
    ```sh
    npm run dev
    # or
    yarn dev
    ```

2. Open your browser and navigate to `http://localhost:3000`.

## Backend Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account

### Installation

1. Navigate to the `server` directory:
    ```sh
    cd server
    ```

2. Install dependencies:
    ```sh
    npm install
    # or
    yarn install
    ```

### Setting Up Environment Variables

1. Create a `.env` file in the `server` directory:
    ```sh
    touch .env
    ```

2. Add the following environment variables to the `.env` file:
    ```properties
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET="your_jwt_secret"
    EMAIL_USER="your_email@example.com"
    EMAIL_PASS="your_email_password"
    ```

### Running the Backend Server

1. Start the backend server:
    ```sh
    npm start
    # or
    yarn start
    ```

2. The backend server will run on `http://localhost:5000`.

## Fetching Data from Backend

To fetch data from the backend API, you can use the `fetch` API or any HTTP client like `axios`. Below is an example using `fetch`:

```js
// Example of fetching user data
const fetchUserData = async () => {
  const response = await fetch('http://localhost:5000/api/user/get', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await response.json();
  console.log(data);
};
```

Make sure to replace `http://localhost:5000` with your backend URL if it's different.

## Usage

- **Register**: Create a new account.
- **Login**: Log into your account.
- **Generate QR Code**: Enter the data, customize the QR code, and click "Generate QR".
- **Save QR Code**: The generated QR code will be saved to your account.
- **Download QR Code**: Click "Download" to save the QR code as a PNG image.
- **Reset Password**: Use the "Forgot password?" link to reset your password using OTP verification.

## Project Structure

- `src/main.jsx`: Entry point of the application.
- `src/context/AuthContext.jsx`: Authentication context for managing user state.
- `src/components/QRGenerator.jsx`: Component for generating and displaying QR codes.
- `src/components/ProtectedRoute.jsx`: Component for protecting routes.
- `src/components/Navbar.jsx`: Navigation bar component.
- `src/components/Auth`: Components for authentication (Login, Register, Forgot Password).

## Contributing

Feel free to open issues or submit pull requests for any improvements or bug fixes.

## License

This project is licensed under the MIT License.
