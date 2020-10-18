# Auth Backend With JWT

Hey, there! This repo is about a simple Node API using JWT and Mongoose (built on top of mongodb). 

### API has 2 main routes:

1. **`api/user/register`**: Use a tool like Postman to make request to this endpoint with a json data like 👇

```json
{
    "name": "Jai Sharma",
    "email": "sendtojsharma@gmail.com",
    "password": "password" 
}
```

2. **`api/user/login`**: Use a tool like Postman to make request to this endpoint with json data like 👇
```json
{
    "email": "sendtojsharma@gmail.com",
    "password": "password"
}
```

It will return a response with JWT as follows 👇
```json
{
    "id": "5f8be169fdfb3500179614bf",
    "name": "Jai Sharma",
    "email": "sendtojsharma@gmail.com",
    "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmOGJlMTY5ZmRmYjM1MDAxNzk2MTRiZiIsIm5hbWUiOiJKYWkgU2hhcm1hIiwiZW1haWwiOiJzZW5kdG9qc2hhcm1hQGdtYWlsLmNvbSIsImlhdCI6MTYwMzAwMjc1MX0.Oi-VKAMymL7JzaHWUPqs4_NiR3x_gbnTZGGzOahcqy4"
}
```

You can use this JWT to make requests to private/protected routes by attaching this token with the header `auth-token` in the request.

For example: Make a request to **`/api/users`** with the `auth-token` header as the JWT token you recived from the login endpoint.

#### NOTE: I used this awesome tutorial by dev ed from Youtube. Check it out [here](https://www.youtube.com/watch?v=2jqok-WgelI) ❤