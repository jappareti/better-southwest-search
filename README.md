# Better Southwest Flight Search

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/jappareti/better-southwest-search)

Southwest is a great airline, but I find their flight search tool lacking. Since
they don't publish their flight data, Google Flights and Kayak can't be used to
search for their flights. The goal of this project was to build a better flight
search tool for Southwest Airlines, inspired by features of Google Flights and
Kayak.

![Better Southwest Price Search Screenshot](screenshot.png?raw=true)

## Features

* Multiple Airport selection for departing and arrival airports
  * e.g. Departure Airport(s): OAK, SFO, SJC and Arrival Airports: DEN, AUS. Shows flight results for each airport. I do this all the time with SWA, but I have to open multiple browser tabs for each route.
* Range of Dates of departure
  * Flight results will display all of the flights for each date.
* Filter by number of stops: Non-stop only, 1-stop no-plane change, Any stops
* Filter by Departure time and Arrival time ranges
  * e.g. Depart between 10am-8pm or Arrival between 4pm-10pm.

## Getting Started

First clone the repo and install the dependencies with `yarn install` or `npm install`:

```sh
git clone git@github.com:jappareti/better-southwest-search
cd better-southwest-search
yarn install
```

To build for development and watch for changes, run:

```sh
yarn start
```

In another terminal window, start the lambda function that queries
Southwest.com:

```sh
yarn start:lambda
```

## Loading sample data

While developing, you might not want to hit Southwest's servers on every page
load. You can load some sample data by un-commenting a few lines of code in
`./src/FlightSearchPage.js`:

```javascript
import sampleAPIresponse from "../data/2018-06-30-OAK-DEN-2018-01-12-14-49.json";

// ....

const sampleFlightProducts = R.map(
  transformFlightData,
  sampleAPIresponse.trips[0].airProducts
);

// ...
state = {
  flightProducts: sampleFlightProducts
  //....
};
```

## Todo

* Fix responsiveness and optimize for mobile devices
* Add loading component styles (like Kayak) and animations
* Add more descriptive error messages when request fails
