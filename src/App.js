import React, { Component } from 'react';
import './App.css';
import EventsLoader from './events/EventsLoader';

class App extends Component {
  render() {
    return (
      <div className="App">
        <EventsLoader />

      </div>
    );
  }
}

export default App;
