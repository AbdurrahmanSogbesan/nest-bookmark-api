# Bookmarks API Documentation

## About

This is a RESTful API for managing bookmarks built with NestJS. The API allows users to create, retrieve, update, and delete bookmarks. It also provides user management features such as user registration and authentication using JSON Web Tokens (JWT). The API utilizes Prisma as the ORM and PostgreSQL as the database. Docker is used for easy setup and management of the database.

## Prerequisites

Make sure you have the following installed:

- Node.js
- Yarn package manager
- Docker

## Getting Started

1. Clone the repository:

   ```bash
   $ git clone <repository-url>
   $ cd bookmark-api
   ```

2. Install dependencies:

   ```bash
   $ yarn install
   ```

3. Start the PostgreSQL database using Docker:

   ```bash
   $ yarn db:dev:up
   ```

4. Run database migrations:

   ```bash
   $ yarn prisma:dev:deploy
   ```

5. Start the API in development mode:

   ```bash
   $ yarn start:dev
   ```

The API is now running and accessible at `http://localhost:3333`.

## API Endpoints

### Users

- **GET /users/me**

  Retrieves the currently authenticated user.

- **PATCH /users**

  Updates the profile information of the authenticated user.

### Bookmarks

- **GET /bookmarks**

  Retrieves all bookmarks belonging to the authenticated user.

- **GET /bookmarks/:id**

  Retrieves a specific bookmark by its ID.

- **POST /bookmarks**

  Creates a new bookmark for the authenticated user.

- **PATCH /bookmarks/:id**

  Updates a specific bookmark by its ID.

- **DELETE /bookmarks/:id**

  Deletes a specific bookmark by its ID.

### Authentication

The API uses JSON Web Tokens (JWT) for authentication. To authenticate and access protected endpoints, include the JWT token in the `Authorization` header as follows:

```http
Authorization: Bearer <JWT_TOKEN>
```

Replace `<JWT_TOKEN>` with the actual JWT token obtained during the authentication process.

## Testing

To run the API tests, use the following command:

```bash
$ yarn test:e2e
```

## Database

The API uses PostgreSQL as the database. Docker is used for easy database setup and management. The database configuration can be found in the `.env` file.

To start the development database:

```bash
$ yarn db:dev:up
```

To start the test database:

```bash
$ yarn db:test:up
```
