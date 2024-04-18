# Crowd-Sources Travel Planner (working title: TripXP)
**Course:** CS467 Capstone Project, Spring 2024 Capstone

**Group Members:** Anthony Clary, Hannah Rummel, Chase Smith, Akash Verma

**Production Site:** <https://travelplannerfrontend-production.up.railway.app/>

**Production API:** <https://travelplannerapi-production.up.railway.app/>

## App
TripXP is a crowd-sourced travel web application that empowers users to craft personalized trips, expeditions, or adventures and share those experiences with a multitude of other travelers. With users as the primary contributors to this catalog of travel ideas, community is the backbone of the app’s interactivity. Contributors share their experiences to the larger community, and can store those experiences in private groupings called ‘trips’. With user-curated trips created based on their specific interests and passions, the catalog is supported by a large number of quality experiences.

## Stack
* **Frontend**
  * React
* **Backend**
  * RESTful API via Express.js
  * MySQL
* **Authentication**
  * OAuth 2.0 via (TBD)

## Repo, Development, and CI/CD
The fullstack application is organized within this monorepo. [backend](/backend) is the working directory for the NodeJS application, to serve our Express.js RESTful API. [frontend](/frontend) is the working directory for the client-side React application. **Please see the `README.md` files in those respective directories** for dev and deployment instructions for the respective parts of the stack. 

CI/CD is facilitated via a combination of Github Actions and [Railway](https://railway.app/). 
