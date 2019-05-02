# Access a demo of this project at

https://slideintospotify.netlify.com/

# How to run "Slide into Spotify" on your computer

To authorize your spotify account and use your personal devices to play/search for music using the Slide into Spotify app, you must follow the following steps

1. Run 'npm install' in the terminal to install the dependencies.
2. Sign into your Spotify account https://developer.spotify.com/dashboard/login.
3. Click on "Create a Client ID" button to create a new project.
4. Copy the Client ID into the App.js variable "const clientId".
5. Click on "Edit Settings" and add http://localhost:3000/callback as a redirect URI.
6. Run 'npm start' and log into Spotify to run the app!

Note: Make sure you have a Spotify application running on one of your devices.

# Write-Up
Title: Slide into Spotify

Team Members: Jordan Flores, Antonio Franco, Daniel Lee

Team Name: Three Nude Men

Prompt: Spotify Client

## Abstract
A search engine to make artist suggestions based on sliders/questions filled out by the user. Each question/slider asked acts like a “filter” for the api (ex. danceability, valence, energy), to recommend certain artists and songs. The user can then play these suggested songs using a built in player connected to Spotify.

## Components:
Slider Component: A slider to determine the level of each attribute, which will determine the resulting artists in the search. Example attributes: Danceability, loudness, liveness, popularity, tempo. 

Genre/search Component: A search bar that will produce the list of artists given the searched genre

Song Component: To display the recommended songs received from the api

Artist Component: To display the recommended artists received from the api

Music Player Component: Controls the song currently being played, such as its volume, pause/play, scrubber, etc

## Features:
Our project allows users to find songs and artists based on the different attribute sliders, searching for music based on genre and other qualities like danceability, energy, loudness, and tempo.

## Division of Labor:
Antonio: UI design, music player component

Daniel: song & artist components, genre/search component

Jordan: Slider Component and recommendations based on attributes

## Resources:
Related artist API
https://developer.spotify.com/console/get-artist-related-artists/?id=43ZHCT0cAZBISjO8DG9PnE

https://developer.spotify.com/documentation/web-api/reference/browse/get-recommendations/
