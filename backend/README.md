# tripXP REST API

**Production API:** <https://travelplannerapi-production.up.railway.app/>

**Description:** The REST API for tripXP is implemented via NodeJS with the help of the Express.js framework.

## Development

- Make sure that you're within the `backend` directory when working on the API.
- Make sure that you create a local `.env` file and configure it to your needs❗ You will need to create one when you first clone the repo. A sample is provided as `.env.sample`
  - See the group discord's [#secrets](https://discordapp.com/channels/1225842180912971926/1230529347765538877) channel if you need the secret variables for your local `.env`
- No special tooling is required at this time. `npm intall` will install [nodemon](https://www.npmjs.com/package/nodemon) as a dev dependency. nodemon is useful for automatically restarting the node application any time that a file changes in the directory.

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

#### Read Existing Experience(s)

- To read Experience(s), send a GET request using the path '/experience'.
- The provided parameters will be used to generate an SQL query and all
  Experiences matching the query will be returned.
- This means, for instance, that providing a User ID as a parameter will
  return all the Experiences created by that user.
- A request with no parameters will return all Experiences.
- A 200 status code, status bool, and the retrieved data will be returned upon success.
- A 500 status code, status bool, and error message is returned upon error.

##### EXAMPLE #1 - Response to GET Request Sent to '/experience?id=1'

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

##### EXAMPLE #2 - Respnonse to GET Request Sent to 'experience?title=Test%20Experience%202'

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

- To create a new User, send a POST request using the path '/user'.
- No parameters are required.
- The body of the request should include the following:
  - username: STRING - Cannot be NULL
  - email: STRING - Cannot be NULL
- The Primary Key id will be created automatically
- Timestamps will be added automatically to the createdAt and updatedAt fields
- A 200 status code, status bool, and success message will be returned upon successful creation.
- A 400 status code, status bool, and failure message are returned if the body of the request is empty.
- A 500 status code, status bool, and error message is returned upon error.

##### EXAMPLE - Request body

```json
{
  "username": "TestUserName3",
  "email": "TotallyFakeEmail@gmail.com"
}
```

##### EXAMPLE - Response

```json
{
  "status": true,
  "data": "Successfully created new user."
}
```

#### Read Existing User(s)

- To read User(s), send a GET request using the path '/user'.
- The provided parameters will be used to generate an SQL query and all
  Users matching the query will be returned.
- This means, for instance, that providing an email address as a parameter will
  return all the Users with that email.
- A request with no parameters will return all Users.
- A 200 status code, status bool, and the retrieved data will be returned upon success.
- A 500 status code, status bool, and error message is returned upon error.

##### EXAMPLE #1 - Response to GET Request Sent to '/user?id=3'

```json
{
  "status": true,
  "data": [
    {
      "id": 3,
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
- The body of the PATCH request must include the id of the User.
- Only key/value pairs that you want to update are required, any values that will remain
  the same do not need to be included.
- No parameters are required.
- The updatedAt field will be updated automatically with current timestamp.
- A 200 status code, status bool, and success message will be returned upon successful update.
- A 400 status code, status bool, and failure message are returned if the body of the request is empty.
- A 500 status code, status bool, and error message is returned upon error.

##### EXAMPLE - Request Body to Update User Email

```json
{
  "id": 3,
  "email": "UpdatedTotallyFakeEmail@gmail.com"
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

- To delete an existing User, send a DELETE request using the path '/user',
  providing the id of the User as a parameter named 'id'.
- A 200 status code, status bool, and number of entries deleted will be returned upon successful deletion.
- A 500 status code, status bool, and error message is returned upon error.

##### EXAMPLE - Response to DELETE Request to path '/user?id=3'

```json
{
  "status": true,
  "data": {
    "numberOfUsersDeleted": 1
  }
}
```

### Trips

#### Create a new Trip

- To create a new Trip, send a POST request using the path '/trip'.
- No parameters are required.
- The body of the request should include the following:
  - name: STRING - Cannot be NULL
  - description: STRING
  - user_id: INTEGER
- The Primary Key id will be created automatically
- Timestamps will be added automatically to the createdAt and updatedAt fields
- A 200 status code, status bool, and success message will be returned upon successful creation.
- A 400 status code, status bool, and failure message are returned if the body of the request is empty.
- A 500 status code, status bool, and error message is returned upon error.

##### EXAMPLE - Request body

```json
{
  "name": "Third Test Trip",
  "description": "A really awesome trip.",
  "user_id": 1
}
```

#### Add an Experience to a Trip

- To add an Experience to a Trip, send a POST request using the path '/trip/:tripId',
  providing the Experience id as a parameter named 'expId'.
- Timestamps will be added automatically to the createdAt and updatedAt fields
- A 200 status code, status bool, and success message will be returned upon successful creation.
- A 500 status code, status bool, and error message is returned upon error.

##### EXAMPLE - POST Request Sent to path '/trip/2?expId=2'

```json
{
  "status": true,
  "data": "Successfully added Experience to Trip."
}
```

#### Read Existing Trip(s)

- To read Trip(s), send a GET request using the path '/trip'.
- The provided parameters will be used to generate an SQL query and all
  Users matching the query will be returned.
- This means, for instance, that providing a user id as a parameter will
  return all the Trips created by that User.
- A request with no parameters will return all Trips.
- A 200 status code, status bool, and the retrieved data will be returned upon success.
- A 500 status code, status bool, and error message is returned upon error.

##### EXAMPLE #1 - Response to GET Request Sent to '/trip?user_id=1'

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
    },
    {
      "id": 3,
      "name": "Third Test Trip",
      "description": "A really awesome trip.",
      "user_id": 1,
      "createdAt": "2024-04-21T04:26:30.000Z",
      "updatedAt": "2024-04-21T04:26:30.000Z"
    }
  ]
}
```

#### Read Experiences in Existing Trip

- To read all Experiences included in a Trip, send a GET request using the path '/trip/:tripId'.
- No parameters are required.
- The returned data includes a list of TripExperience objects, which are simply pairs of Trip ids
  and Experience ids.
- If a Trip has no Experiences, data will be empty.

##### EXAMPLE #1 - Response to GET Request Sent to '/trip/1'

```json
{
  "status": true,
  "data": [
    {
      "TripId": 1,
      "ExperienceId": 1,
      "createdAt": "2024-04-21T01:45:46.000Z",
      "updatedAt": "2024-04-21T01:45:46.000Z"
    },
    {
      "TripId": 1,
      "ExperienceId": 2,
      "createdAt": "2024-04-21T01:38:23.000Z",
      "updatedAt": "2024-04-21T01:38:23.000Z"
    }
  ]
}
```

#### Update Existing Trip

- To update an existing Trip, send a PATCH request using the path '/trip'.
- The body of the PATCH request must include the id of the Trip.
- Only key/value pairs that you want to update are required, any values that will remain
  the same do not need to be included.
- No parameters are required.
- The updatedAt field will be updated automatically with current timestamp.
- A 200 status code, status bool, and success message will be returned upon successful update.
- A 400 status code, status bool, and failure message are returned if the body of the request is empty.
- A 500 status code, status bool, and error message is returned upon error.

##### EXAMPLE - Request Body to Update Trip

```json
{
  "id": 3,
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

- To delete an existing Trip, send a DELETE request using the path '/trip',
  providing the id of the Trip as a parameter.
- A 200 status code, status bool, and number of entries deleted will be returned upon successful deletion.
- A 500 status code, status bool, and error message is returned upon error.

##### EXAMPLE - Response to DELETE Request to path '/trip?id=3'

```json
{
  "status": true,
  "data": {
    "numberOfTripsDeleted": 1
  }
}
```

#### Remove an Experience from an Existing Trip

- To remove an Experience from a Trip, send a DELETE request using the path '/trip/:tripId',
  providing the id of the Experience as a parameter named 'expId'.
- A 200 status code, status bool, and number of entries deleted will be returned upon successful deletion.
- A 500 status code, status bool, and error message is returned upon error.

##### EXAMPLE - Response to DELETE Request to path '/trip/2?expId=2'

```json
{
  "status": true,
  "data": {
    "numberOfTripExperiencesDeleted": 1
  }
}
```
