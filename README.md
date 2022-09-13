# Daily Sleep Tracker API

## Overview
Daily Sleep Tracker allows users to gather data on their sleep schedules and make necessary changes. This app is really great overally to improve sleeping patterns

[LIVE](https://daily-sleep-tracker.netlify.app/)

## Features
* User is required to sign up and then login to access the app
* Once user is authenticated successfully, he can create, edit, delete, read sleep entries
* On the home page user can create new sleep entries 1st) by clicking add new entry and filling the model with the required data and by clicking add sleep entry
* Each time new entry is added, graph is updated and displayed how manys user sleep that day whether user sleep less or more then previous day as line in the graph indicate that
* User also sees table of entries on the right side of the graph which user can edit or delete
* User can also switch theme of the app from dark mode to light mode or vice verse and it's persisted on the browser

## How to run project
1. clone the project into the folder that you'd like to
2. cd cloned_folder_name
3. npm i
4. npm run dev

## Dependecies
* Mongoose
* Express
* Express-session
* Bcrypt
* Jsonwebtoken
* Passport
