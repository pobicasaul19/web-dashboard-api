# Dashboard Site
 Develop a Dashboard Site that can create, edit a  company, article, and publish an article related to a company.

## Features
* Login to the app via email and password
* Restrict access to valid a User
* React 18, Tailwind and Material UI (Frontend)
* lowdb (DB)
* Express.js and Node.js (Backend)
You will find the base data file in `server/config/data`

## Command for both Client-Side and Server-Side
```sh
npm run install:all - "npm install && npm run install:server && npm run install:client",
```
```sh
npm run start - "concurrently \"npm run start:server\" \"npm run start:client\""
```
