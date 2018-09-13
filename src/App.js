import React, {Component} from 'react';
import { connect } from 'react-redux';

import { ThemeProvider } from 'styled-components';

import StopPlace from './components/stop-place'
import EstimatedCalls from './components/estimated-calls'
import Loading from './components/loading'

import { estimatedCallsRoutine } from './actions';


import Theme from './styles/theme';
import Grid from './styles/grid-system';



export class App extends Component {

  componentWillMount() {
    this.props.getCalls("NSR:StopPlace:4000");
  }

render() {
    
    const { lastUpdated, estimatedCalls, name, transportMode } = this.props;
    
    const Body = lastUpdated ? (<Grid>
      <StopPlace name={name} lastUpdated={lastUpdated} transportMode={transportMode} />
      <EstimatedCalls estimatedCalls={estimatedCalls} />
    </Grid>) : <Loading/>;

    return (
      <ThemeProvider theme={Theme}>{Body}</ThemeProvider>
    );
  }
}

function mapStateToProps(store) {
  return {
    lastUpdated: store.lastUpdated,
    transportMode: store.transportMode,
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