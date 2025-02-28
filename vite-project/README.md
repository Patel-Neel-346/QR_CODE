
## Features

### Authentication

- User registration and login
- Password reset with OTP verification
- Protected routes

### QR Code Generation

- Generate QR codes with customizable styles
- Save and display generated QR codes
- Download QR codes as images

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with the following content:
   ```
   VITE_BACKEND_URL=<your_backend_url>
   ```
4. Start the development server: `npm run dev`

## Usage

- Open the application in your browser
- Register or login to access the QR code generator
- Customize and generate QR codes
- Save and download generated QR codes

## Environment Setup

Ensure you have the following installed:

- Node.js (v14 or higher)
- npm (v6 or higher)

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Runs ESLint to check for linting errors.

## API Endpoints

### Authentication

- `POST /api/user/register`: Register a new user.
- `POST /api/user/login`: Login an existing user.
- `POST /api/user/reset`: Reset user password.
- `GET /api/user/get`: Get user details.

### OTP

- `POST /api/otp/send-otp`: Send OTP to user's email.
- `POST /api/otp/verify-otp`: Verify the OTP.

### QR Code

- `POST /api/qrCode/create`: Create a new QR code.
- `GET /api/qrCode/get`: Get saved QR codes.

## Contributing

If you would like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License

This project is licensed under the MIT License.
