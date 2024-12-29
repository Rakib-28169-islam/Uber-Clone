# Backend API Documentation

## `/users/register` Endpoint

### Description

Registers a new user by creating a user account with the provided information.

### HTTP Method

`POST`

### Request Body

The request body should be in JSON format and include the following fields:

- `fullName` (object):
  - `fName` (string, required): User's first name (minimum 3 characters).
  - `lName` (string, optional): User's last name (minimum 3 characters).
- `email` (string, required): User's email address (must be a valid email).
- `password` (string, required): User's password (minimum 4 characters).

### Example Response

- `user` (object):
  - `fullName` (object):
    - `fName` (string): User's first name.
    - `lName` (string): User's last name.
  - `email` (string): User's email address.
- `token` (string): JWT Token

## `/users/login` Endpoint

### Description

Authenticates a user using their email and password, returning a JWT token upon successful login.

### HTTP Method

`POST`

### Request Body

The request body should be in JSON format and include the following fields:

- `email` (string, required): User's email address (must be a valid email).
- `password` (string, required): User's password (minimum 4 characters).

### Example Response

- `user` (object):
  - `fullName` (object):
    - `fName` (string): User's first name.
    - `lName` (string): User's last name.
  - `email` (string): User's email address.
- `token` (string): JWT Token

## `/users/profile` Endpoint

### Description

Retrieves the profile information of the currently authenticated user.

### HTTP Method

`GET`

### Authentication

Requires a valid JWT token in the Authorization header:
`Authorization: Bearer <token>`

### Example Response

- `user` (object):
  - `fullName` (object):
    - `fName` (string): User's first name.
    - `lName` (string): User's last name.
  - `email` (string): User's email address.

## `/users/logout` Endpoint

### Description

Logs out the current user and blacklists the token provided in the cookie or headers.

### HTTP Method

`GET`

### Authentication

Requires a valid JWT token in the Authorization header or cookie.

### Example Response

- `message` (string): Logged out successfully.