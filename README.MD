# places application

simple backend application that exposes signup, login, get all registered users, create a place, get a place by ID, get a place by user ID, update a place and delete a place API  using Express and MongoDB.
This collection contains sample requests from this [API](https://node-places.herokuapp.com/api)

It contains the following routes

• Signup a user (POST) [/users/signup](https://node-places.herokuapp.com/api/users/signup)

• Login a user with given credentials (POST) [/users/login](https://node-places.herokuapp.com/api/users/login)

• Get all registered user (GET) [/users](https://node-places.herokuapp.com/api/users)

• Create a place (POST) [/places](https://node-places.herokuapp.com/api/places)

• Get a place by place ID (GET) [/places/:placeId](https://node-places.herokuapp.com/api/places/:placeId)

• Get a place by user ID (GET) [/places/user/:placeId](https://node-places.herokuapp.com/api/places/user/:userId)

• Update a place by place ID (PATCH) [/places/:placeId](https://node-places.herokuapp.com/api/places/:userId)

• Delete a place (PATCH) [/places/:placeId](https://node-places.herokuapp.com/api/places/:userId)

# signup route

• EndPoint "/users/signup"

• Request type: POST

• payload (form-data): name, email, image, password

• A successful registration will result in a HTTP 201 Status Code and a response object 
```
{ 
  "userId": "user Id", 
  "email": "user Email",
  "token": "generated token" 
}

```
# login route

• EndPoint "/users/login"

• Request type: POST

• payload :  email, password

• A successful login will result in a HTTP 200 Status Code and a response object 
```
{ 
  "userId": "user Id", 
  "email": "user Email",
  "token": "generated token" 
}

```
# get all users route

• EndPoint "/users"

• Request type: GET

• A successful API request will return a HTTP 200 Status Code and a response object of 
```
{ 
    "users": [
        {
            "places": [
                "place Id"
            ],
            "_id": "userId",
            "name": "name",
            "email": "email",
            "image": "image URL",
            "id": "userId"
        }
    ]
}

```
# create a place route

• EndPoint "/places"

• payload (form-data): title, description, address, image

• Request type: POST

• A successful API request will return a HTTP 200 Status Code and a response object of 
```
{
    "place": {
        "_id": "place ID",
        "title": "place title",
        "description": "place description",
        "address": "place address",
        "location": {
            "lat": latitude,
            "lng": longitude
        },
        "image": "image URL",
        "creator": "userId"
    }
}

```
# get a place by place ID route

• EndPoint "/places/:placeId"

• Request type: GET

• A successful API request will return a HTTP 200 Status Code and a response object of 
```
{
    "place": {
        "_id": "place ID",
        "title": "place title",
        "description": "place description",
        "address": "place address",
        "location": {
            "lat": latitude,
            "lng": longitude
        },
        "image": "image URL",
        "creator": "userId"
    }
}

```
# get a place by user ID route

• EndPoint "/places/user/:placeId"

• Request type: GET

• A successful API request will return a HTTP 200 Status Code and a response object of 
```
{
    "place": [
        {
            "_id": "place ID",
            "title": "place title",
            "description": "place description",
            "address": "place address",
            "location": {
                "lat": latitude,
                "lng": longitude
            },
            "image": "image URL",
            "creator": "userId"
        }
    ]
}

```
# update a place by place ID

• EndPoint "/places/:placeId"

• Request type: PATCH

• payload: title, description

• A successful API request will return a HTTP 200 Status Code and a response object of 

```
{
    "place": {
        "_id": "place ID",
        "title": "updated title",
        "description": "updated description",
        "address": "place address",
        "location": {
            "lat": latitude,
            "lng": longitude
        },
        "image": "image URL",
        "creator": "userId"
    }
}

```
# delete a place

• EndPoint "/places/:placeId"

• Request type: delete

• A successful API request will return a HTTP 200 Status Code and a response object of 
```
{
    "places": {
        "message": "place deleted"
    }
}

```
[Link to the API documentation with sample requests](https://documenter.getpostman.com/view/9775449/TzY6AEzc)