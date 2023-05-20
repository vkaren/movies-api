

# Movies REST API

## Movies
### Get all movies
You can access the list of movies by using the /movies endpoint.  

Request:
```
[GET] https://movies-api-lr5x.onrender.com/api/v1/movies
```

### Get a movie
You can get a movie by adding the title as a parameter: /title/<title>  

Request:
```
[GET] https://movies-api-lr5x.onrender.com/api/v1/movies/title/Shrek
```

### Filter movies by genre, year or ranking
By using the /filter endpoint and passing genre, year and/or ranking as a query parameter, you can filter movies   

Request:
```
[GET] https://movies-api-lr5x.onrender.com/api/v1/movies/filter?genre=comedy&year=2004
```

### Create a movie
You can create a movie by sending an object like the following to /movies  

Request:
```
[POST] https://movies-api-lr5x.onrender.com/api/v1/movies

# Body
{
 "title": "Shrek",
 "genres": ["comedy", "fantasy"],
 "year": 2001,
 "ranking": 0, 
  "poster": "https://indiehoy.com/wp-content/uploads/2020/12/shrek.jpg"
}
```

### Update a movie
You can update a movie by sending an object like the following and adding the id as a parameter: /movies/<id>  

Request:
```
[POST] https://movies-api-lr5x.onrender.com/api/v1/movies/1

# Body
{
 "title": "Shrek 2",
 "year": 2004,
}
```

### Delete a movie
You can delete a movie by adding the id as a parameter: /movies/<id>  

Request:
```
[DELETE] https://movies-api-lr5x.onrender.com/api/v1/movies/1
```

## Genres
### Get all genres
You can access the list of genres by using the /genres endpoint.  

Request:
```
[GET] https://movies-api-lr5x.onrender.com/api/v1/genres
```

### Get a genre
You can get a genre by adding the name as a parameter: /name/<name>  

Request:
```
[GET] https://movies-api-lr5x.onrender.com/api/v1/genres/comedy
```

### Create a genre
You can create a genre by sending an object like the following to /genres  

Request:
```
[POST] https://movies-api-lr5x.onrender.com/api/v1/genres

# Body
{
 "name": "drama"
}
```

### Add a movie to a genre
You can add a movie to a genre by sending an object like the following to /add-movie/<genreId>/<movieId>  

Request:
```
[POST] https://movies-api-lr5x.onrender.com/api/v1/addMovie/3/1
```

## Year
### Get all years
You can access the list of years by using the /year endpoint.  

Request:
```
[GET] https://movies-api-lr5x.onrender.com/api/v1/year
```

### Get a year
You can get a year by adding the year as a parameter: /year/<year>  

Request:
```
[GET] https://movies-api-lr5x.onrender.com/api/v1/year/2004
```

### Create a year
You can create a year by sending an object like the following to /year  

Request:
```
[POST] https://movies-api-lr5x.onrender.com/api/v1/year

# Body
{
 "year": 1980
}
```
