# tripXP REST API

**Production API:** <https://travelplannerapi-production.up.railway.app/>

**Description:** The REST API for tripXP is implemented via NodeJS with the help of the Express.js framework.

## Development

- Make sure that you're within the `backend` directory when working on the API.
- No special tooling is required at this time. `npm intall` will install [nodemon](https://www.npmjs.com/package/nodemon) as a dev dependency. nodemon is useful for automatically restarting the node application any time that a file changes in the directory.
- Make sure that you create a local `.env` file (in the root of the /backend dir) and configure it with the minimum variables as follows:
```
# DB connection via sequelize; See Sequelize Docs for format and supported DBs.
DB_CONNECTION_STRING='postgres://user:pass@example.com:5432/dbname'

# Google Identity for JWT validation; See https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#get_your_google_api_client_id
GOOGLE_IDENTITY_CLIENT_ID='INSERT GOOGLE IDENTITY CLIENT ID (SEE ABOVE)'

# For Multer file uploads; specify the folder for experience image uploads on the API server (e.g. absolute path from root)
RAILWAY_VOLUME_MOUNT_PATH='/uploads'

# Specify the address that your frontend is being served from. Required for CORS support. 
FRONTEND_URL='http://localhost:5173'
```

- Run the following commands to start the sever:
```
git clone git@github.com:alclary/travelplanner.git
cd travelplanner/backend
npm install
npm run dev
```

## Deployment and Production

- When a pull request is accepted into the main branch (requires code review), Github Actions will coordinate with Railway and attempt to automatically deploy the latest code to the production URL shared above.
  - If the PR only contains backend changes, then only the backend should be rebuilt and redeployed in Railway.
- If the Railway build and deployment fails to build and serve the nodeJS app, both Github and Railway _should_ announce the failure. Please see either the [#railway](https://discordapp.com/channels/1225842180912971926/1230325947404652584) channel in our group discord server or log in to the Railway dashboard itself to view more details on any failure.
- Production handles its own [set of environmental variables](https://docs.railway.app/guides/variables), navigate to the Railway dashboard to view and configure those.

## Using the API

### JWT Authentication and Authorization
- Bearer Token Authorization via a valid JWT in the Authorization header is required for endpoints listed below. The JWT must be valid and issued by Google Identity Services (i.e. Google Sign On). 
  - All /trip endpoints
  - All /user endpoints

### Experiences

#### Create a new Experience

- To create a new Experience, send a POST request using the path '/experience'.
- No parameters are required.
- The body of the request should include the following:
  - title: STRING - Cannot be NULL
  - description: STRING - Cannot be NULL
  - latitude: REAL - Cannot be NULL
  - longitude: REAL - Cannot be NULL
  - image_url: STRING
  - rating: REAL - Cannot be NULL
  - location: STRING
  - keywords: JSON
  - user_id: INTEGER
- The Primary Key id will be created automatically
- Timestamps will be added automatically to the createdAt and updatedAt fields
- A 200 status code, status bool, and success message will be returned upon successful creation.
- A 400 status code, status bool, and failure message are returned if the body of the request is empty.
- A 500 status code, status bool, and error message is returned upon error.

##### EXAMPLE - Request body

```json
{
  "title": "Test Experience 3",
  "description": "Yet another sentence describing the experience.",
  "latitude": 12.789,
  "longitude": -23.7654,
  "image_url": "/path/to/image3.jpg",
  "rating": 4.99,
  "location": "A super duper cool place.",
  "keywords": null,
  "user_id": 2
}
```

##### EXAMPLE - Response

```json
{
  "status": true,
  "data": "Successfully created new experience."
}
```

#### Read All Existing Experience Matching Parameters

- To read Experiences, send a GET request using the path '/experience'.
- The provided parameters will be used to generate an SQL query and all
  Experiences matching the query will be returned.
- This means, for instance, that providing a User ID as a parameter will
  return all the Experiences created by that user.
- A request with no parameters will return all Experiences.
- A 200 status code, status bool, and the retrieved data will be returned upon success.
- A 500 status code, status bool, and error message is returned upon error.

##### EXAMPLE #1 - Response to GET Request Sent to '/'

```json
{
  "status": true,
  "data": [
    {
      "id": 1,
      "title": "Test Experience 1",
      "description": "A sentence describing the experience.",
      "latitude": 12.3456,
      "longitude": -23.4567,
      "image_url": "/path/to/image.jpg",
      "rating": 4.73,
      "location": "A super cool place.",
      "keywords": null,
      "user_id": 1,
      "createdAt": "2024-04-20T08:33:12.000Z",
      "updatedAt": "2024-04-20T08:33:12.000Z"
    },
    { ... ALL OTHER EXPERIENCES }
  ]
}
```

##### EXAMPLE #2 - Response to GET Request Sent to 'experience?title=Test%20Experience%202'

```json
{
  "status": true,
  "data": [
    {
      "id": 2,
      "title": "Test Experience 2",
      "description": "A different sentence describing the experience.",
      "latitude": -12.3456,
      "longitude": 23.4567,
      "image_url": "/path/to/image2.jpg",
      "rating": 4.38,
      "location": "A moderately cool place.",
      "keywords": null,
      "user_id": 2,
      "createdAt": "2024-04-20T11:53:41.000Z",
      "updatedAt": "2024-04-20T11:53:41.000Z"
    }
  ]
}
```

#### Read a Specific Experience based on ID

- To read Experiences, send a GET request using the path '/experience/:ExperienceID'.
- The INTEGER named by 'ExperienceID' as a URL parameter will search for that experience ID in the database.
- A 200 status code, status bool, and the retrieved data will be returned upon success.
- A 500 status code, status bool, and error message is returned upon error.

##### EXAMPLE #1 - Response to GET Request Sent to '/experience1'

```json
{
  "status": true,
  "data": [
    {
      "id": 1,
      "title": "Test Experience 1",
      "description": "A sentence describing the experience.",
      "latitude": 12.3456,
      "longitude": -23.4567,
      "image_url": "/path/to/image.jpg",
      "rating": 4.73,
      "location": "A super cool place.",
      "keywords": null,
      "user_id": 1,
      "createdAt": "2024-04-20T08:33:12.000Z",
      "updatedAt": "2024-04-20T08:33:12.000Z"
    }
  ]
}
```

#### Update Existing Experience

- To update an existing Experience, send a PATCH request using the path '/experience'.
- The body of the PATCH request must include the id of the Experience.
- Only key/value pairs that you want to update are required, any values that will remain
  the same do not need to be included.
- No parameters are required.
- The updatedAt field will be updated automatically with current timestamp.
- A 200 status code, status bool, and success message will be returned upon successful update.
- A 400 status code, status bool, and failure message are returned if the body of the request is empty.
- A 500 status code, status bool, and error message is returned upon error.

##### EXAMPLE - Request Body to Update Experience Rating

```json
{
  "id": 3,
  "rating": 3.22
}
```

##### EXAMPLE - Response to Update of Experience

```json
{
  "status": true,
  "data": "Successfully updated Experience."
}
```

#### Delete Existing Experience

- To delete an existing Experience, send a DELETE request using the path '/experience',
  providing the id of the Experience as a parameter named 'id'.
- A 200 status code, status bool, and number of entries deleted will be returned upon successful deletion.
- A 500 status code, status bool, and error message is returned upon error.

##### EXAMPLE - Response to DELETE Request to path '/experience?id=3'

```json
{
  "status": true,
  "data": {
    "numberOfExperiencesDeleted": 1
  }
}
```

### Users

#### Create a new User

A new user is created when a new, valid JWT is provided as Bearer Token in the authorization header of any request to this API. The JWT must be obtained from Google Sign-in. 

#### Read Existing User

- To read User(s), send a GET request using the path '/user'.
- The request must include the JWT of the user in the authorization header. 
- A request with no parameters will return all Users.
- A 200 status code, status bool, and the retrieved data will be returned upon success.
- A 404 status code, status bool, and message indicating "User not found."
- A 500 status code, status bool, and error message is returned upon error.

##### EXAMPLE #1 - Response to GET Request Sent to '/user'

```json
{
  "status": true,
  "data": [
    {
      "id": 3,
      "jwt_unique": "111258085555415515495"
      "username": "TestUserName3",
      "email": "TotallyFakeEmail@gmail.com",
      "createdAt": "2024-04-21T04:08:58.000Z",
      "updatedAt": "2024-04-21T04:08:58.000Z"
    }
  ]
}
```

#### Update Existing User

- To update an existing User, send a PATCH request using the path '/user'.
- The request must include the JWT of the user in the authorization header. 
- At this time only the username key may be updated. 
- No parameters are required.
- The updatedAt field will be updated automatically with current timestamp.
- A 200 status code, status bool, and success message will be returned upon successful update.
- A 400 status code, status bool, and failure message are returned if the body of the request is empty.
- A 500 status code, status bool, and error message is returned upon error.

##### EXAMPLE - Request Body to Update Username

```json
{
  "username": "ChoosenUserName123"
}
```

##### EXAMPLE - Response to Update of User

```json
{
  "status": true,
  "data": "Successfully updated user."
}
```

#### Delete Existing User

- To delete an existing User, send a DELETE request using the path '/user'.
- The request must include the JWT of the user in the authorization header. 
- A 200 status code, status bool, and number of entries deleted will be returned upon successful deletion.
- A 500 status code, status bool, and error message is returned upon error.

##### EXAMPLE - Response to DELETE Request to path '/user'

```json
{
  "status": true,
  "data": "Successfully deleted user."
}
```

### Trips

#### Create a new Trip

- To create a new Trip, send a POST request using the path '/trip'.
- The request must include the JWT of the user associated with the trip in the authorization header. 
- No parameters are required.
- The body of the request should include the following:
  - name: STRING - Cannot be NULL
  - description: STRING
- The Primary Key id will be created automatically
- A user_id field will automatically be added to the trip based on the authorized user. 
- Timestamps will be added automatically to the createdAt and updatedAt fields
- A 200 status code, status bool, success message, and the trip's ID will be returned upon successful creation.
- A 400 status code, status bool, and failure message are returned if the body of the request is empty.
- A 500 status code, status bool, and error message is returned upon error.

##### EXAMPLE - Request body

```json
{
  "name": "Third Test Trip",
  "description": "A really awesome trip.",
}
```

##### EXAMPLE - Response to Trip Creation

```json
{
  "status": true,
  "data": "Successfully created new trip.",
  "id": 27,
}
```

#### Add an Experience to a Trip

- To add an Experience to a Trip, send a POST request using the path '/trip/:tripId/experience/:expId'
- The tripId parameter represents the ID of the Trip you wish to add the experience to.
- The expId parameter represent the ID of the Experience you wish to add to the trip.
- The request must include the JWT of the user associated with the trip in the authorization header. 
- Timestamps will be added automatically to the createdAt and updatedAt fields
- A 200 status code, status bool, and success message will be returned upon successful creation.
- A 400 status code, status bool, and error message if the tripId and/or expID parameters above are not provided correctly. 
- A 403 status code, status bool, and error message, "This trip doesn't belong to you," if the trip is not associated with the JWT in the header.
- A 500 status code, status bool, and error message is returned upon error.

##### EXAMPLE - POST Request Sent to path '/trip/2/experience/3'

```json
{
  "status": true,
  "data": "Successfully added Experience to Trip."
}
```

#### Read an Existing Trip

- To read a specific existing Trip, send a GET request using the path '/trip/:tripId'.
- The request must include the JWT of the user associated with the trip in the authorization header. 
- A 200 status code, status bool, and the retrieved data will be returned upon success.
- A 403 status code, status bool, and error message, "This trip doesn't belong to you," if the trip is not associated with the JWT in the header.
- A 500 status code, status bool, and error message is returned upon error.

##### EXAMPLE #1 - Response to GET Request Sent to '/trip/1'

```json
{
  "status": true,
  "data": [
    {
      "id": 1,
      "name": "First Test Trip",
      "description": "Super awesome trip.",
      "user_id": 1,
      "createdAt": "2024-04-20T11:57:45.000Z",
      "updatedAt": "2024-04-20T13:09:36.000Z"
    }
  ]
}
```

#### Read All Existing For the Authenticate User

- To read all existing Trip(s) for the user based on the JWT, send a GET request using the path '/trip.
- The request must include the JWT of the user associated with the trips in the authorization header. 
- A 200 status code, status bool, and the retrieved data will be returned upon success.
- A 500 status code, status bool, and error message is returned upon error.

##### EXAMPLE #1 - Response to GET Request Sent to '/trip?user_id=1'

```json
{
  "status": true,
  "data": [
    {
      "id":1,
      "name":"First Test Trip",
      "description":"Super awesome trip.",
      "user_id":1,
      "createdAt":"2024-04-20T11:57:45.000Z",
      "updatedAt":"2024-04-20T13:09:36.000Z"
    },
    {
      "id":2,
      "name":"Second Test Trip",
      "description":"A somewhat okay trip.",
      "user_id":2,"createdAt":"2024-04-21T02:11:03.000Z",
      "updatedAt":"2024-04-21T02:11:03.000Z"
    }
  ]
}
```

#### Read all Experiences in Existing Trip

- To read all Experiences included in a Trip, send a GET request using the path '/trip/:tripId/experience'.
- The request must include the JWT of the user associated with the trip in the authorization header. 
- The returned data includes a list of the Experience objects.
- If a Trip has no Experiences, data will be empty.
- A 200 status code, status bool, and the retrieved data will be returned upon success.
- A 403 status code, status bool, and error message, "This trip doesn't belong to you," if the trip is not associated with the JWT in the header.
- A 500 status code, status bool, and error message is returned upon error.

##### EXAMPLE #1 - Response to GET Request Sent to '/trip/1/experience'

```json
{
  "status": true,
  "data":[
   {
      "id":1,
      "title":"Test Experience 1",
      "description":"A sentence describing the experience.",
      "latitude":31.9876,
      "longitude":-99.1245,
      "image_url":"/path/to/image.jpg",
      "rating":4.73,
      "location":"A super cool place.",
      "keywords":[
         "awesome",
         "exciting"
      ],
      "user_id":1,
      "createdAt":"2024-04-20T08:33:12.000Z",
      "updatedAt":"2024-04-28T18:27:29.000Z"
   },
   {
      "id":2,
      "title":"Test Experience 2",
      "description":"A different sentence describing the experience.",
      "latitude":33.1234,
      "longitude":-98.2223,
      "image_url":"/path/to/image2.jpg",
      "rating":4.38,
      "location":"A moderately cool place.",
      "keywords":[
         "cool",
         "exciting"
      ],
      "user_id":2,
      "createdAt":"2024-04-20T11:53:41.000Z",
      "updatedAt":"2024-04-28T18:27:57.000Z"
   }
]
}
```

#### Update Existing Trip

- To update an existing Trip, send a PATCH request using the path '/trip/:tripId'.
- The request must include the JWT of the user associated with the trip in the authorization header. 
- Only key/value pairs that you want to update are required, any values that will remain
  the same do not need to be included.
- The updatedAt field will be updated automatically with current timestamp.
- A 200 status code, status bool, and success message will be returned upon successful update.
- A 400 status code, status bool, and failure message are returned if the body of the request is empty.
- A 403 status code, status bool, and error message, "This trip doesn't belong to you," if the trip is not associated with the JWT in the header.
- A 500 status code, status bool, and error message is returned upon error.

##### EXAMPLE - Request Body to Update Trip Sent to '/trip/3'

```json
{
  "name": "Updated Third Test Trip"
}
```

##### EXAMPLE - Response to Update of Trip

```json
{
  "status": true,
  "data": "Successfully updated trip."
}
```

#### Delete Existing Trip

- To delete an existing Trip, send a DELETE request using the path '/trip/:tripId'
- The request must include the JWT of the user associated with the trip in the authorization header. 
- A 200 status code, status bool, and number of entries deleted will be returned upon successful deletion.
- A 403 status code, status bool, and error message, "This trip doesn't belong to you," if the trip is not associated with the JWT in the header.
- A 500 status code, status bool, and error message is returned upon error.

##### EXAMPLE - Response to DELETE Request to path '/trip/3'

```json
{
  "status": true,
  "data": {
    "numberOfTripsDeleted": 1
  }
}
```

#### Remove an Experience from an Existing Trip

- To remove an Experience from a Trip, send a DELETE request using the path '/trip/:tripId/experience/:expId'
- The request must include the JWT of the user associated with the trip in the authorization header. 
- A 200 status code, status bool, and number of entries deleted will be returned upon successful deletion.
- A 403 status code, status bool, and error message, "This trip doesn't belong to you," if the trip is not associated with the JWT in the header.
- A 500 status code, status bool, and error message is returned upon error.

##### EXAMPLE - Response to DELETE Request to path '/trip/2/experience/2'

```json
{
  "status": true,
  "data": {
    "numberOfTripExperiencesDeleted": 1
  }
}
```

### Reviews

#### Create a New Review

- To create a new Review, send a POST request using the path '/review'.
- No parameters are required.
- The body of the request should include the following fields:
  - `title`: STRING - Cannot be NULL
  - `content`: STRING - Cannot be NULL
  - `rating`: REAL - Cannot be NULL
  - `experience_id`: INTEGER - Cannot be NULL
  - `user_id`: INTEGER - Cannot be NULL
- The Primary Key `id` will be created automatically.
- Timestamps will be added automatically to the `createdAt` and `updatedAt` fields.
- A 200 status code, status bool, and success message will be returned upon successful creation.
- A 400 status code, status bool, and failure message will be returned if the body of the request is empty.
- A 500 status code, status bool, and error message will be returned upon error.

##### EXAMPLE - Request Body

```json
{
  "title": "Amazing Experience!",
  "content": "I had a wonderful time at this place. Highly recommend it!",
  "rating": 4.8,
  "experience_id": 3,
  "user_id": 5
}
```

##### EXAMPLE - Response

```json
{
  "status": true,
  "data": "Successfully created new review."
}
```

#### Read All Existing Reviews Matching Parameters

- To read Reviews, send a GET request using the path '/review'.
- The provided parameters will be used to generate an SQL query, and all Reviews matching the query will be returned.
- A request with no parameters will return all Reviews.
- A 200 status code, status bool, and the retrieved data will be returned upon success.
- A 500 status code, status bool, and error message will be returned upon error.

##### EXAMPLE #1 - Response to GET Request Sent to '/review'

```json
{
  "status": true,
  "data": [
    {
      "id": 1,
      "title": "Fantastic Place!",
      "content": "Had an unforgettable time here!",
      "rating": 5.0,
      "experience_id": 1,
      "user_id": 1,
      "createdAt": "2024-05-01T10:45:12.000Z",
      "updatedAt": "2024-05-01T10:45:12.000Z"
    },
    { ... ALL OTHER REVIEWS }
  ]
}
```

##### EXAMPLE #2 - Response to GET Request Sent to 'review?title=Amazing%20Experience!'

```json
{
  "status": true,
  "data": [
    {
      "id": 2,
      "title": "Amazing Experience!",
      "content": "I had a wonderful time at this place. Highly recommend it!",
      "rating": 4.8,
      "experience_id": 3,
      "user_id": 5,
      "createdAt": "2024-05-02T11:53:41.000Z",
      "updatedAt": "2024-05-02T11:53:41.000Z"
    }
  ]
}
```

#### Read a Specific Review based on ID

- To read a specific Review, send a GET request using the path '/review'.
- The INTEGER named by 'id' as a URL query parameter will search for that review ID in the database.
- A 200 status code, status bool, and the retrieved data will be returned upon success.
- A 500 status code, status bool, and error message will be returned upon error.

##### EXAMPLE - Response to GET Request Sent to '/review?id=1'

```json
{
  "status": true,
  "data": {
    "id": 1,
    "title": "Fantastic Place!",
    "content": "Had an unforgettable time here!",
    "rating": 5.0,
    "experience_id": 1,
    "user_id": 1,
    "createdAt": "2024-05-01T10:45:12.000Z",
    "updatedAt": "2024-05-01T10:45:12.000Z"
  }
}
```

#### Update an Existing Review

- To update an existing Review, send a PATCH request using the path '/review'.
- The body of the PATCH request must include the id of the Review.
- Only key/value pairs that you want to update are required, any values that will remain the same do not need to be included.
- The updatedAt field will be updated automatically with the current timestamp.
- A 200 status code, status bool, and success message will be returned upon successful update.
- A 400 status code, status bool, and failure message will be returned if the body of the request is empty.
- A 500 status code, status bool, and error message will be returned upon error.

##### EXAMPLE - Request Body to Update Review Rating

```json
{
  "id": 2,
  "rating": 4.9
}
```

##### EXAMPLE - Response to Update of Review

```json
{
  "status": true,
  "data": "Successfully updated Review."
}
```

#### Delete an Existing Review

- To delete an existing Review, send a DELETE request using the path '/review', providing the id of the Review as a query parameter named 'id'.
- A 200 status code, status bool, and number of entries deleted will be returned upon successful deletion.
- A 500 status code, status bool, and error message will be returned upon error.

##### EXAMPLE - Response to DELETE Request to path '/review?id=2'

```json
{
  "status": true,
  "data": {
    "numberOfReviewsDeleted": 1
  }
}
```

