# Assignment 1 - ReactJS app.

Name: Guanlan Ji

## Overview.

This Movies app adds many new features and new endpoint from tmdb-api based on the lab. Additionally, some original features from lab are beautifed and improved to make the webpage better.


### Features.

+ People page
+ Person detail page
+ A better way to show person's known for movies - dialogs
+ Routing: several parameterized URL for people/person detail page, and each pagination.
+ Several data hyperlinking for people
+ Full caching support
+ Trending movies and people for day and week, and vote shows by stars
+ authentication and 3rd-party authentication (Firebase)
+ Pagination
+ Responsive UI for most new views
+ Improve the way that the posters of movies and people shows.
+ New MUI components: Material Icons, Rating, Pagination, Paper, Toolbar, Table, Tab
+ Use code splitting to improve the effciency of the webpage
+ Deploy the page online based on GitHub Pages (The link is https://lanrico.github.io/Movies-Guanlan-Ji/)


## Setup requirements.

npm install firebase

## API endpoints.

+ Discover list of people - person/popular
+ Person details - person/:id
+ Trending list - trending/:media_type/:time_window
+ Person images - person/:id/images
+ Person starred in movies - person/:id/movie_credits
+ Person social media homepage - person/:id/external_ids

## Routing.

+ /page:pagination - the each pagination of homepage
+ /movies/favorites/page:pagination - the each pagination of favorites page
+ /movies/upcoming/page:pagination - the each pagination of upcoming page
+ /people/page:pagination - the each pagination of people page
+ /people/:id - displays a particular person detail page.

ps: Only a part of the page require authentication, so it is not included in Routing.

## Independent learning (If relevant).

+ Use code splitting to improve the effciency of the webpage
+ Deploy the page online based on GitHub Pages (The link is https://lanrico.github.io/Movies-Guanlan-Ji/)
The online article that reference to: https://create-react-app.dev/docs/deployment/
