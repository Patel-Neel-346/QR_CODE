# QR Code API

## User Routes

### Register a new user
**Endpoint:** `/api/user/register`  
**Method:** `POST`  
**Body:**
```json
{
  "Username": "exampleUser",
  "Email": "user@example.com",
  "Password": "password123"
}
```
**Response:**
```json
{
  "success": true,
  "token": "jwt_token",
  "user": {
    "_id": "user_id",
    "Username": "exampleUser",
    "Email": "user@example.com",
    "Password": "hashed_password"
  }
}
```

### Login a user
**Endpoint:** `/api/user/login`  
**Method:** `POST`  
**Body:**
```json
{
  "Email": "user@example.com",
  "Password": "password123"
}
```
**Response:**
```json
{
  "success": true,
  "token": "jwt_token",
  "user": {
    "_id": "user_id",
    "Username": "exampleUser",
    "Email": "user@example.com",
    "Password": "hashed_password"
  }
}
```

### Logout a user
**Endpoint:** `/api/user/logout`  
**Method:** `GET`  
**Headers:**
```json
{
  "Authorization": "Bearer jwt_token"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Logged Out"
}
```

### Get user data
**Endpoint:** `/api/user/get`  
**Method:** `GET`  
**Headers:**
```json
{
  "Authorization": "Bearer jwt_token"
}
```
**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "user_id",
    "Username": "exampleUser",
    "Email": "user@example.com",
    "Password": "hashed_password"
  }
}
```

### Reset password
**Endpoint:** `/api/user/reset`  
**Method:** `POST`  
**Body:**
```json
{
  "newPassword": "newpassword123",
  "Email": "user@example.com"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

## OTP Routes

### Send OTP
**Endpoint:** `/api/otp/send-otp`  
**Method:** `POST`  
**Body:**
```json
{
  "Email": "user@example.com"
}
```
**Response:**
```json
{
  "success": true,
  "message": "OTP send SuccessFully"
}
```

### Verify OTP
**Endpoint:** `/api/otp/verify-otp`  
**Method:** `POST`  
**Body:**
```json
{
  "otp": "123456"
}
```
**Response:**
```json
{
  "success": true,
  "message": "OTP verified successfully",
  "otp": "123456"
}
```

## QR Code Routes

### Create QR Code
**Endpoint:** `/api/qrCode/create`  
**Method:** `POST`  
**Headers:**
```json
{
  "Authorization": "Bearer jwt_token"
}
```
**Body:**
```json
{
  "data": "https://example.com",
  "style": {
    "border": "solid",
    "color": "#000000"
  },
  "frameText": "SCAN ME"
}
```
**Response:**
```json
{
  "success": true,
  "qrCode": {
    "_id": "qr_code_id",
    "data": "https://example.com",
    "style": {
      "border": "solid",
      "color": "#000000"
    },
    "frameText": "SCAN ME",
    "user": "user_id"
  }
}
```

### Get QR Codes
**Endpoint:** `/api/qrCode/get`  
**Method:** `GET`  
**Headers:**
```json
{
  "Authorization": "Bearer jwt_token"
}
```
**Response:**
```json
{
  "success": true,
  "qrCodes": [
    {
      "_id": "qr_code_id",
      "data": "https://example.com",
      "style": {
        "border": "solid",
        "color": "#000000"
      },
      "frameText": "SCAN ME",
      "user": "user_id"
    }
  ]
}
```
