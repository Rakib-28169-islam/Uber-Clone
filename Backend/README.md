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
