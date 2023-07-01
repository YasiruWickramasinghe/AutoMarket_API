# AutoMarket_API

AutoMarket is an online platform for buying and selling vehicles. It connects buyers and sellers, providing a convenient and secure way to browse, list, and purchase vehicles of various types. with all user authentiocation and authorization.


## API Documentation

### Base URL

The base URL for all API endpoints is: `http://localhost:3000`.

### Endpoints

## User Authentication

- **POST /register**
  - Description: Register a new user.
  - Request Body:
    - name: Name of the user (required).
    - email: Email address of the user (required).
    - password: Password for the user (required, minimum 6 characters).
  - Example: `POST /register`
    ```json
    {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "password": "password123"
    }
    ```

- **POST /login**
  - Description: Log in a user and obtain access and refresh tokens.
  - Request Body:
    - email: Email address of the user (required).
    - password: Password for the user (required).
  - Example: `POST /login`
    ```json
    {
      "email": "johndoe@example.com",
      "password": "password123"
    }
    ```

- **PUT /profile**
  - Description: Update user profile and password.
  - Request Body:
    - name: Name of the user (required).
    - email: Email address of the user (required).
    - oldPassword: Old password for authentication (required).
    - newPassword: New password for the user (required, minimum 6 characters).
  - Example: `PUT /profile`
    ```json
    {
      "name": "Harry Doe",
      "email": "harrydoe@example.com",
      "oldPassword": "password123",
      "newPassword": "123password"
    }
    ```
  - Headers:
    - Authorization: Bearer access_token

- **DELETE /profile**
  - Description: Delete user profile.
  - Example: `DELETE /profile`
  - Headers:
    - Authorization: Bearer access_token

- **POST /logout**
  - Description: Log out a user and invalidate the access token.
  - Example: `POST /logout`
  - Headers:
    - Authorization: Bearer access_token

- **GET /admin**
  - Description: Protected admin route (only accessible by admin users).
  - Example: `GET /admin`
  - Headers:
    - Authorization: Bearer access_token

## Vehicle CRUD   


## Environment Variables

The following environment variables are used in the project:

- `MONGO_URI`: MongoDB connection URI.
- `PORT`: Port number for the server (default: 3000).

## Getting Started

1. Clone the repository.
2. Install the dependencies: `npm install`.
3. Set up the environment variables by creating a `.env` file (see the example `.env.example` file).
4. Start the server: `npm start`.