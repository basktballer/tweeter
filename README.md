# Tweeter Project

Tweeter is a simple, single-page Twitter clone.

This repository is the starter code for the project: Students will fork and clone this repository, then build upon it to practice their HTML, CSS, SASS, JS, jQuery and AJAX front-end skills, and their Node, Express and MongoDB back-end skills.

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

## Dependencies

- Express
- Node 5.10.x or above
- body-parser
- chance
- md5
- mongodb
- moment.js

## Features

- Compose a tweet written by an auto-generated user name
- Like counter that only allows one like / dislike per visit per tweet
- Tweets are stored in and retrieved from a local mongoDB
  - Use of Ajax GET and POST
- Compose button toggles display of Compose Tweet container on desktop and reduced widths desktop
- Responsive design for small width displays and mobile devices
  - Compose button will be auto-toggled in these instances
- Tweet length character counter
- Tweet length error handling and messaging
- Cross-site scripting prevention

## In Development

- User logins and likes tied to users
- Heroku deployment

## Screenshots

All tweets on desktop view

!["Screenshot of all tweets on desktop"](https://github.com/basktballer/tweeter/blob/master/docs/all-tweets-desktop.png)


Compose tweet on desktop view

!["Screenshot of composing tweets on desktop"](https://github.com/basktballer/tweeter/blob/master/docs/compose-tweet-desktop.png)


Compose tweet on reduced desktop view

!["Screenshot of composing tweets on reduced desktop window"](https://github.com/basktballer/tweeter/blob/master/docs/compose-tweet-reduced.png)


Compose tweet on mobile view 

!["Screenshot of composing tweets on mobile"](https://github.com/basktballer/tweeter/blob/master/docs/compose-tweet-mobile.png)
