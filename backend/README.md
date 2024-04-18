## tripXP REST API
**Production API:** <https://travelplannerapi-production.up.railway.app/>

**Description:** The REST API for tripXP is implemented via NodeJS with the help of the Express.js framework. 

## Development
* Make sure that you're within the `backend` directory when working on the API.
* Make sure that you create a local `.env` file and configure it to your needs❗ You will need to create one when you first clone the repo. A sample is provided as `.env.sample`. See the group discord's [#secrets](https://discordapp.com/channels/1225842180912971926/1230529347765538877) channel if you need the secret variables for your local `.env`
* No special tooling is required at this time. `npm intall` will install [nodemon](https://www.npmjs.com/package/nodemon) as a dev dependency. nodemon is useful for automatically restarting the node application any time that a file changes in the directory.

```
git clone git@github.com:alclary/travelplanner.git
cd backend
npm install
npm dev
```

## Deployment and Production
* When accepted changes are commited to the main branch (requires code review), Github Actions will coordinate with Railway and attempt to automatically deploy the latest code to the production URL shared above.
  * If a commit to the main branch only contains backend changes, then only the backend should be rebuilt and redeployed in Railway.
* If the Railway build and deployment fails to build and serve the nodeJS app, both Github and Railway *should* announce the failure. Please see either the [#railway](https://discordapp.com/channels/1225842180912971926/1230325947404652584) channel in our group discord server or log in to the Railway dashboard itself to view more details on any failure.
* Production handles its own [set of environmental variables](https://docs.railway.app/guides/variables), navigate to the Railway dashboard to view and configure those.
