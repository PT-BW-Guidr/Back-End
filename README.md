# Guidr Back-End

| Method | Description                           | Endpoint           |
| ------ | ------------------------------------- | ------------------ |
| POST   | Create a user account                 | /auth/register     |
| POST   | Login a user                          | /auth/login        |
| GET    | Gets a user, proile and all trip data | /users/:id         |
| GET    | Gets a users profile by id            | /users/profiles:id |
| GET    | Gets all profiles                     | /profiles          |
| GET    | Gets a profile by a profile ID        | profiles:id        |


#### Base URL: https://guidr1.herokuapp.com/api/
#### Verify Server is Running: https://guidr1.herokuapp.com/

#### Seeded users
```
"username": "nathansl2003",
 "password": "password"

"username": "jsmith",
"password": "jsmith"

"username": "klock",
"password": "klock"
```

## Table Layouts
### Users Table
| Key      | Type    | Required                |
| -------- | ------- | ----------------------- |
| id       | integer | Yes (server controlled) |
| username | string  | Yes                     |
| password | string  | Yes                     |

### Profiles Table
| Key              | Type            | Required                |
| ---------------- | --------------  | ----------------------- |
| id               | integer         | Yes (server controlled) |
| user_id          | integer         | Yes                     |
| profile_title    | string          | Yes                     |
| tagline          | string          | Yes                     |
| guide_specialty  | string          | Yes                     |
| age              | integer         | Yes                     |
| years_experience | integer         | Yes                     |
| avatar_url       | text            | No                      |

### Trips Table
| Key              | Type            | Required                |
| ---------------- | --------------  | ----------------------- |
| id               | integer         | Yes (server controlled) |
| user_id          | integer         | Yes                     |
| trip_title       | text            | Yes                     |
| description      | text            | Yes                     |
| is_private       | integer(0/1)    | Yes                     |
| is_professional  | integer(0/1)    | Yes                     |
| duration         | text            | Yes                     |
| distance         | text            | Yes                     |
| date             | text            | Yes                     |
| trip_type        | text            | Yes                     |


## Register (Non-protected)
**HTTP Method:** *POST*

**URL:** */auth/register*

This registers a new user, it will return the 201 message below with a token, this token needs to be stored in Local Storage.  The token contains the following data
```
{
  "userid": 2,
  "username": "jsmith",
  "iat": 1582819234,
  "exp": 1582822834
}
```

In order to decode the token, you need to install jwt-decode https://github.com/auth0/jwt-decode and install
```
npm i jwt-decode
```

### Example
```
{
   "username": "jsmith",
   "password": "jsmith"
}
```

### Responses
```
Code: 201 (Created)
{
   "message": "Registration successful jsmith!",
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imtsb2NrIiwiaWF0IjoxNTgyODE1NzEyLCJleHAiOjE1ODI4MTkzMTJ9.YaduCwtuESqfPocXdzS2ggRZVxF9lQ5fB0lh7DpXQb8"
}

Code: 500 (Internal Server Error)
{
   "message": "Internal Server Error, Error Returned: <error>"
}
```

## Login (Non-protected)
**HTTP Method:** *POST*

**URL:** */auth/login*

This logs in a user, it will return the 202 message below with a token, this token needs to be stored in Local Storage.  The token contains the following data

### Example
```
{
   "username": "jsmith",
   "password": "jsmith"
}
```

### Responses
```
Code: 202 (Successful Login)
{
   "message": "Welcome jsmith!",
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imtsb2NrIiwiaWF0IjoxNTgyODE1NzEyLCJleHAiOjE1ODI4MTkzMTJ9.YaduCwtuESqfPocXdzS2ggRZVxF9lQ5fB0lh7DpXQb8"
}

Code: 401 (Unauthorized)
{
   "message": "Invalid username or password"
}

Code: 500 (Internal Server Error)
{
   "message": "Internal Server Error, Error Returned: <error>"
}
```

## Get User (Protected)
**HTTP Method:** *GET*

**URL:** */users/:id*

This gets a specific user and returns the user, profile and all trip data, each trip (1 user can have multiple trips) will have profile data and username attached it in case it is needed.

### Example

None

### Responses
```
Code: 200 (OK)
    {
        "username": "jsmith",
        "profile_title": "Bike Touring the Scenic Routes",
        "tagline": "I love riding!",
        "guide_specialty": "Bike Touring",
        "age": 29,
        "years_experience": 10,
        "avatar_url": null,
        "trips_title": "3 Day Midwest Tour",
        "description": "Travel the midwest on paved roads through central Illinois",
        "is_private": 0,
        "is_professional": 1,
        "duration": "3 days",
        "distance": "90 miles",
        "date": "2020-06-01 08:00:00:000",
        "trip_type": "Bike Touring"
    }
    
Code: 401 (Unauthorized)
{
   "message": "Unauthorized access"
}
    
Code: 500 (Internal Server Error)
{
   "message": "Internal Server Error, Error Returned: <error>"
}
```

## Get all Profiles (Protected)
**HTTP Method:** *GET*

**URL:** */profiles*

This returns all profiles

### Example

None

### Responses
```
Code: 200 (OK)
    {
        "id": 1,
        "user_id": 1,
        "title": "Thru-hiking Expert",
        "tagline": "I am happiest in the wilderness",
        "guide_specialty": "Backpacking",
        "age": 43,
        "years_experience": 6,
        "avatar_url": null
    }
    
Code: 401 (Unauthorized)
{
   "message": "Unauthorized access"
}
    
Code: 500 (Internal Server Error)
{
   "message": "Internal Server Error, Error Returned: <error>"
}
```

## Get a Profile by Profile ID (Protected)
**HTTP Method:** *GET*

**URL:** */profiles/:id*

This returns a profile by profile ID

### Example

None

### Responses
```
Code: 200 (OK)
    {
        "id": 1,
        "user_id": 1,
        "title": "Thru-hiking Expert",
        "tagline": "I am happiest in the wilderness",
        "guide_specialty": "Backpacking",
        "age": 43,
        "years_experience": 6,
        "avatar_url": null
    }
    
Code: 401 (Unauthorized)
{
   "message": "Unauthorized access"
}
    
Code: 500 (Internal Server Error)
{
   "message": "Internal Server Error, Error Returned: <error>"
}
```

## Get a Specific Users Profile (Protected)
**HTTP Method:** *GET*

**URL:** */users/profiles/:id*

This returns a the user's profile by user id

### Example

None

### Responses
```
Code: 200 (OK)
    {
        "id": 1,
        "user_id": 1,
        "title": "Thru-hiking Expert",
        "tagline": "I am happiest in the wilderness",
        "guide_specialty": "Backpacking",
        "age": 43,
        "years_experience": 6,
        "avatar_url": null
    }
    
Code: 401 (Unauthorized)
{
   "message": "Unauthorized access"
}
    
Code: 500 (Internal Server Error)
{
   "message": "Internal Server Error, Error Returned: <error>"
}
```

## Post New Profile (Protected)
**HTTP Method:** *POST*

**URL:** */profiles*

Adds a new profile to the database.  **Note: you cannot add a user_id that does not exist due to foriegn key constraints nor can you add a profile from with a user_id that already exists in the database, a user can only have 1 profile.**

### Example

```
{
     "user_id": 6,
     "title": "Thru-hiking Obsessionist",
     "tagline": "I am in love with the woods",
     "guide_specialty": "All things wilderness",
     "age": 48,
     "years_experience": 25,
     "avatar_url": null
}
 ```

### Responses
```
Code: 200 (OK)
{
   6
}
    
Code: 401 (Unauthorized)
{
   "message": "Unauthorized access"
}
    
Code: 500 (Internal Server Error)
{
   "message": "Internal Server Error, Error Returned: <error>"
}
```

## Get all Trips (Protected)
**HTTP Method:** *GET*

**URL:** */trips*

This returns all trips

### Example

None

### Responses
```
Code: 200 (OK)
{
        "id": 1,
        "title": "7 Long Trail Section Hike",
        "description": "Hike from the Appalachian approach trail where the Long Trail southern terminus is for a 7 day adventure",
        "is_private": 1,
        "is_professional": 0,
        "duration": "7 days",
        "distance": "70 miles",
        "date": "2020-06-01 08:00:00:000",
        "trip_type": "Backpacking",
        "user_id": 1
    }
    
Code: 401 (Unauthorized)
{
   "message": "Unauthorized access"
}
    
Code: 500 (Internal Server Error)
{
   "message": "Internal Server Error, Error Returned: <error>"
}
```

## Get a trip by trip ID (Protected)
**HTTP Method:** *GET*

**URL:** */trip/:id*

This returns a trip by trip ID

### Example

None

### Responses
```
Code: 200 (OK)
{
        "id": 1,
        "title": "7 Long Trail Section Hike",
        "description": "Hike from the Appalachian approach trail where the Long Trail southern terminus is for a 7 day adventure",
        "is_private": 1,
        "is_professional": 0,
        "duration": "7 days",
        "distance": "70 miles",
        "date": "2020-06-01 08:00:00:000",
        "trip_type": "Backpacking",
        "user_id": 1
    }
    
Code: 401 (Unauthorized)
{
   "message": "Unauthorized access"
}
    
Code: 500 (Internal Server Error)
{
   "message": "Internal Server Error, Error Returned: <error>"
}
```

## Get a Specific Users Trips (Protected)
**HTTP Method:** *GET*

**URL:** */users/trips/:id*

This returns a the user's trips by user id

### Example

None

### Responses
```
Code: 200 (OK)
{
        "id": 1,
        "title": "7 Long Trail Section Hike",
        "description": "Hike from the Appalachian approach trail where the Long Trail southern terminus is for a 7 day adventure",
        "is_private": 1,
        "is_professional": 0,
        "duration": "7 days",
        "distance": "70 miles",
        "date": "2020-06-01 08:00:00:000",
        "trip_type": "Backpacking",
        "user_id": 1
    }
    
Code: 401 (Unauthorized)
{
   "message": "Unauthorized access"
}
    
Code: 500 (Internal Server Error)
{
   "message": "Internal Server Error, Error Returned: <error>"
}
```

## Post New Trip (Protected)
**HTTP Method:** *POST*

**URL:** */trips*

Adds a new trip to the database.  **Note: you cannot add a user_id that does not exist due to foriegn key constraints (Note this is not functional yet).**

### Example

```
{
    "title": "Appalachain trail hike in Pennsylvania",
    "description": "We will pick a random spot on the AT in Pennsylvania and start hiking!",
    "is_private": 1,
    "is_professional": 0,
    "duration": "3 days",
    "distance": "30 miles",
    "date": "2020-06-25 08:00:00:000",
    "trip_type": "Backpacking",
    "user_id": 1
}
    ```

### Responses
```
Code: 200 (OK)
{
   6
}
    
Code: 401 (Unauthorized)
{
   "message": "Unauthorized access"
}
    
Code: 500 (Internal Server Error)
{
   "message": "Internal Server Error, Error Returned: <error>"
}
```
