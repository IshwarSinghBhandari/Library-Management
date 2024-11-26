# Library Management System README

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Authentication](#authentication)
4. [Book Management](#book-management)
5. [Security](#security)
6. [Installation](#installation)
7. [Usage](#usage)

## Overview
This library management system is designed to manage books and users. It provides features for user authentication, book CRUD operations, and secure login using JWT and bcrypt.

## Features
- User Management:
  - Add User
  - Login
- Book Management:
  - Add Book
  - Delete Book
  - Update Book
  - Change Book Status

## Authentication
The system uses JWT (JSON Web Token) for secure login. When a user logs in, a JWT token is generated and sent to the client. This token is then used to authenticate the user for subsequent requests.

## Book Management
The system provides CRUD operations for book management:
- Add Book: Add a new book to the library.
- Delete Book: Delete a book from the library.
- Update Book: Update the details of a book.
- Change Book Status: Change the status of a book (e.g., from available to borrowed).

## Security
The system uses bcrypt to hash passwords, ensuring secure storage of user credentials.

## Installation
To install the library management system, follow these steps:
1. Clone the repository: `git clone https://github.com/your-username/library-management-system.git`
2. Install dependencies: `npm install`
3. Start the server: `npm start`

## Usage
To use the library management system, follow these steps:
1. Register a new user: Send a POST request to `/api/users/register` with the user's details.
2. Login: Send a POST request to `/api/users/login` with the user's credentials.
3. Get JWT token: Use the JWT token sent in the login response to authenticate subsequent requests.
4. Manage books: Use the book CRUD operations to manage books in the library.

Example API Endpoints:

- Register User: `POST /api/users/register`
- Login: `POST /api/users/login`
- Add Book: `POST /api/books`
- Delete Book: `DELETE /api/books/:id`
- Update Book: `PUT /api/books/:id`
- Change Book Status: `PATCH /api/books/:id/status`