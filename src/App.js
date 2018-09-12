import React, {Component} from 'react';
import moment from 'moment';

import { connect } from 'react-redux';

import StopPlace from './components/stop-place'
import EstimatedCalls from './components/estimated-calls'
import { estimatedCallsRoutine } from './actions';

import './App.css'

class App extends Component {

  componentWillMount() {
    this.props.getCalls("NSR:StopPlace:4000");
  }

  render() {
    
    const { lastUpdated, estimatedCalls, name } = this.props;

    return (<div className="App">
      <StopPlace name={name} lastUpdated={lastUpdated}/>
      <main className="mainList">
        <EstimatedCalls calls={estimatedCalls} />
      </main>
    </div>);
  }
}

function mapStateToProps(store) {
  return {
    lastUpdated: store.lastUpdated,
    name: store.name,
    estimatedCalls: store.estimatedCalls
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCalls: () => dispatch(estimatedCallsRoutine()) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);