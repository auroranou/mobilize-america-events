import React, { Component } from 'react';
import EventsLoader from './events/EventsLoader';
import './normalize.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <EventsLoader />
    );
  }
}

export default App;
