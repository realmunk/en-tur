import React from 'react';
import moment from 'moment';

import { connect } from 'react-redux';

import EstimatedCalls from '../components/estimated-calls'


const StopPlace = ({lastUpdated, name, estimatedCalls}) => {
    return (<div className="App">
        <header className="App-header">
            <h1>{moment(lastUpdated).format('hh:ss')}: {name}</h1>
        </header>
        <main className="mainList">
            <EstimatedCalls calls={estimatedCalls} />
        </main>
    </div>);
}

function mapStateToProps (store) {
    return {
        lastUpdated: store.lastUpdated,
        name: store.stopPlace.name,
        estimatedCalls: store.estimatedCalls
    }
}

export default connect(mapStateToProps)(StopPlace);