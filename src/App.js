import React, { Component } from 'react';
import EventsLoader from './events/EventsLoader';
import './App.css';

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
