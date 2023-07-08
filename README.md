# AutoMarket_API

AutoMarket is an online platform for buying and selling vehicles. It connects buyers and sellers, providing a convenient and secure way to browse, list, and purchase vehicles of various types. with all user authentiocation and authorization.


## API Documentation

### Base URL

The base URL for all API endpoints is: `http://localhost:3000`.

### Endpoints

## User Authentication

This API module allows you to manage User, including Login, Logout, Signup, update Profile and deleting User information.

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

- **GET /profile**
  - Description: Get user profile details.
  - Example: `GET /profile`
  - Headers:
    - Authorization: Bearer access_token

- **PUT /profile**
  - Description: Update user profile and password.
  - Request Body:
    - name: Name of the user (required).
    - email: Email address of the user (required).
    - oldPassword: Old password for authentication (required).
    - newPassword: New password for the user (required, minimum 6 characters).
  - Example: `PUT /profileupdate`
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
  - Example: `DELETE /profiledelete`
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

This API module allows you to manage vehicles, including retrieving, creating, updating, and deleting vehicle information.


- **GET /vehicles**

  - Description: Retrieve all vehicles with pagination, search, sorting, and filtering.
  - Parameters:
    - page (optional): Page number for pagination (default: 1).
    - limit (optional): Number of items per page (default: 10).
    - sort (optional): Sorting options in JSON format.
    - filter (optional): Filtering options in JSON format.
    - search (optional): Search query for name or manufacturer.
  - Example:
    - `GET /vehicles`
    - `GET /vehicles?page=1&limit=10&sort={"createdAt": -1}&filter={"manufacturer": "Ford"}&search=mustang`

- **GET /vehicles/:id**

  - Description: Retrieve a specific vehicle by ID.
  - Parameters:
    - id: ID of the vehicle.
  - Example:
    - `GET /vehicles/:id`

- **POST /vehicles**

  - Description: Create a new vehicle.
  - Request Body:
    - manufacturer: Manufacturer of the vehicle (required).
    - model: Model of the vehicle (required).
    - year: Year of the vehicle (required).
    - price: Price of the vehicle (required).
    - contact:
      - name: Name of the contact person (required).
      - email: Email of the contact person (required).
      - phone: Phone number of the contact person (required).
    - Additional fields as needed.
  - Example:
    - `POST /vehicles`
    - Request Body:
      ```json
      {
        "manufacturer": "Ford",
        "model": "Mustang",
        "year": 2023,
        "price": 35000,
        "contact": {
          "name": "John Doe",
          "email": "johndoe@example.com",
          "phone": "1234567890"
        }
      }
      ```

- **PUT /vehicles/:id**

  - Description: Update a vehicle by ID.
  - Parameters:
    - id: ID of the vehicle.
  - Request Body:
    - manufacturer: Manufacturer of the vehicle (required).
    - model: Model of the vehicle (required).
    - year: Year of the vehicle (required).
    - price: Price of the vehicle (required).
    - contact:
      - name: Name of the contact person (required).
      - email: Email of the contact person (required).
      - phone: Phone number of the contact person (required).
    - Additional fields as needed.
  - Example:
    - `PUT /vehicles/:id`
    - Request Body:
      ```json
      {
        "manufacturer": "Ford",
        "model": "Mustang",
        "year": 2023,
        "price": 40000,
        "contact": {
          "name": "Jane Smith",
          "email": "janesmith@example.com",
          "phone": "9876543210"
        }
      }
      ```

- **DELETE /vehicles/:id**

  - Description: Delete a vehicle by ID.
  - Parameters:
    - id: ID of the vehicle.
  - Example:
    - `DELETE /vehicles/:id`

- **GET /vehicles/search/name**

  - Description: Search vehicles by name or manufacturer.
  - Parameters:
    - searchQuery: Query string to search for.
  - Example:
    - `GET vehicles/search/name?searchQuery=mustang`

## Environment Variables

The following environment variables are used in the project:

- `MONGO_URI`: MongoDB connection URI.
- `PORT`: Port number for the server (default: 3000).

## Getting Started

1. Clone the repository.
2. Install the dependencies: `npm install`.
3. Set up the environment variables by creating a `.env` file (see the example `.env.example` file).
4. Start the server: `npm start`.