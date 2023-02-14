
# Todo App - Marcus Lean
#### VideoTranslatorAI - Graduate/Junior Developer
#### Live app deployed [here](https://todo-app-730dc.web.app/)
##

#### Required: Installing all packages
Run the command below to install all required packages.
```bash
    npm install
```
#### Running development server
Run `npm start` for a dev server. Navigate to http://localhost:4200/.
#### Building the web app
Run `npm run build` to build the project. The build will be stored in the `./public` folder.
#### Running unit tests
Run `npm test` to execute the unit tests. The default broswer is `Chrome`.
#### Deploying web app to [Firebase](https://firebase.google.com/)
Run `firebase login` to login to a google account. This account will be used to host the web app, as well as manage all services related to firebase.

Run `firebase init` to initialise the firebase project for deployment. This includes selecting all relavent firebase services that the project will use.

Run `firebase deploy` to deploy local built web app to firebase. Ensure `./public` folder contains the built web app. 
## Relevant Documentations

 - [Angular](https://angular.io/docs)
 - [Angular CLI](https://github.com/angular/angular-cli)
 - [Angular Material UI](https://material.angular.io/)
 - [Firebase](https://firebase.google.com/docs/build)
 - [RxJS](https://rxjs.dev/guide/overview)

 ## Future Changes

 - Move Firebase environment configs to a dotenv file to avoid exposing important data
 - Fully implement translation api
 - Fully implement automated unit testing
 - Implement Github Actions for CI/CD
 