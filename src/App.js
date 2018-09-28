import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchEvents } from './events/events.actions';
import EventsList from './events/EventsList';
import EventsMap from './map/EventsMap';
import Alert from './components/Alert';
import './normalize.css';
import './App.css';

class App extends Component {
  static propTypes = {
    error: PropTypes.string,
    fetchEvents: PropTypes.func,
    isLoading: PropTypes.bool
  };

  constructor(props) {
    super(props);

    const { error, fetchEvents, isLoading } = this.props;
    if (!error && !isLoading) {
      fetchEvents();
    }

    this.refresh = this.refresh.bind(this);
  }

  render() {
    return (
      <div className='app'>
        <header className='app-header' />
        <div className='content-wrapper'>
          {this.props.error && (
            <Alert message={this.props.error}>
              <button
                onClick={this.refresh}
                type='button'
              >
                Try again?
              </button>
            </Alert>
          )}
          <h1 className='content-title'>Events</h1>
          <div className='content-body'>
            <EventsList />
            <EventsMap />
          </div>
        </div>
      </div>
    );
  }

  refresh(e) {
    e.preventDefault();
    this.props.fetchEvents();
  }
}

const mapStateToProps = (state) => ({
  error: state.errorReducer.message,
  isLoading: state.eventsReducer.isLoading
});

const mapDispatchToProps = {
  fetchEvents
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
