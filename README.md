## Overview

This app was bootstrapped using [`create-react-app`](). It uses `redux` for state management, `react-map-gl` (a wrapper for Mapbox GL) for interactive maps, and `moment` for date parsing and formatting. Component props are defined using [`prop-types`](https://www.npmjs.com/package/prop-types).

Events are pulled from [this endpoint](https://github.com/mobilizeamerica/api#list-all-public-events), and event props reflect the API data response shape.

## Local development

First install packages:
```
yarn install
```

Then make sure you add a `.env` file containing a Mapbox token, so that the map renders properly. The contents of the file should be:
```
REACT_APP_MAPBOX_TOKEN=<your-token-here>
```

To run tests using Jest: `yarn test`.

To run the build for production: `yarn build`.

## Directory structure

```
-- src/
    |-- components/ // Purely presentational components
    |-- error/      // Action creators and reducer for API error handling
    |-- events/     // Action creators, reducer, connected components and props for events
    |-- map/        // Connected map component and SVG map marker
    |-- __tests__/  // Jest tests for actions and reducers
```