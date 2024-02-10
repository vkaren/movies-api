# Movies REST API

## Overview

This Movies REST API is built using Node.js and Express, incorporating various middleware and tools to ensure robust functionality. The API allows users to perform operations such as retrieving, filtering, creating, updating, and deleting movies, as well as managing movie genres.

## Technologies Used

- **Express**: A minimal and flexible Node.js web application framework.
- **CORS**: Middleware for handling Cross-Origin Resource Sharing.
- **Dotenv**: Used for managing environment variables.
- **@hapi/boom**: A utility for handling HTTP errors.
- **Joi**: A powerful schema description language and data validator.
- **Sequelize**: An ORM (Object-Relational Mapping) for interacting with databases.
- **Sequelize CLI**: Command-line interface for Sequelize migrations.
- **PostgreSQL**: A powerful, open-source relational database system.
- **pg** and **pg-hstore**: Drivers for interacting with PostgreSQL database.

## Endpoints

### Get all movies

Retrieve a list of all movies.

Request:

```
[GET] https://movies-api-lr5x.onrender.com/api/v2/movies
```

### Get a movie

Retrieve information about a specific movie by providing the title as a parameter.

Request:

```
[GET] https://movies-api-lr5x.onrender.com/api/v2/movies/title/Shrek
```

### Filter movies by genre, year, or ranking

Filter movies based on genre, year, and/or ranking using the `/filter` endpoint.

Request:

```
[GET] https://movies-api-lr5x.onrender.com/api/v2/movies/filter?genre=comedy&year=2004
```

### Create a movie

Create a new movie by sending a POST request to the `/movies` endpoint with the necessary details in the request body.

Request:

```
[POST] https://movies-api-lr5x.onrender.com/api/v2/movies

# Body - It can be an application/json or multipart/form-data content type

{
"title": "Shrek",
"genres": ["comedy", "fantasy"],
"year": 2001,
"ranking": 0,
"poster": ""
}
```

### Update a movie

Update a movie by sending a POST request with the updated details and the movie's ID as a parameter.

Request:

```
[POST] https://movies-api-lr5x.onrender.com/api/v2/movies/1


# Body - It can be an application/json or multipart/form-data content type

{
"title": "Shrek 2",
"year": 2004,
}
```

### Delete a movie

Delete a movie by providing its ID as a parameter.

Request:

```
[DELETE] https://movies-api-lr5x.onrender.com/api/v2/movies/1
```

## Genres

### Get all genres

Retrieve a list of all available genres.

Request:

```
[GET] https://movies-api-lr5x.onrender.com/api/v2/genres
```

### Get a genre

Retrieve information about a specific genre by providing its name as a parameter.

Request:

```
[GET] https://movies-api-lr5x.onrender.com/api/v2/genres/comedy
```

### Create a genre

Create a new genre by sending a POST request to the `/genres` endpoint with the genre name in the request body.

Request:

```
[POST] https://movies-api-lr5x.onrender.com/api/v2/genres

# Body

{
"name": "drama"
}
```
