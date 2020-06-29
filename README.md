# Vitality Living Lab Data System Client

The client for the Vitality Living Lab Data System prototype.

### Building/Deploying
This project can either be built using `ng build` and deploying the files in `dist/ddbl` to a webserver, or by registering the repo on Netlify.
Make sure to change the `API_URL` environment variable in `src/environment/environment.ts` and `src/environment/environment.prod.ts` to the URL that the API is installed at.

### Development
For development purposes, simply run `ng serve` and point your browser to <http://localhost:4200>.

### Pull requests
This repository contains an action that will run whenever a pull request is opened. This action checks whether the project passes all unit and e2e-tests and whether it can be build using `ng build`.
The recommended workflow is therefore to protect the master branch and only commit new features using a branch and pull request.
