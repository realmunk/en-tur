import React from 'react';
import ReactDOM from 'react-dom';

import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { App }  from './App';

Enzyme.configure({ adapter: new Adapter() })

function postLoadSetup() {
    const props = { 
        id: 'NSR:StopPlace:4000',
        name: 'Jernbanetorget',
        transportMode: 'bus',
        estimatedCalls: { '0': [{ realtime: false, aimedArrivalTime: '2018-09-13T00:36:00+0200', expectedArrivalTime: '2018-09-13T00:36:00+0200', date: '2018-09-12', serviceJourney: { line: { publicCode: '54' } }, destinationDisplay: { frontText: 'Kjelsås stasjon' } }], '3': [{ realtime: false, aimedArrivalTime: '2018-09-13T00:39:00+0200', expectedArrivalTime: '2018-09-13T00:39:00+0200', date: '2018-09-12', serviceJourney: { line: { publicCode: '54' } }, destinationDisplay: { frontText: 'Tjuvholmen' } }], '5': [{ realtime: false, aimedArrivalTime: '2018-09-13T00:41:00+0200', expectedArrivalTime: '2018-09-13T00:41:00+0200', date: '2018-09-12', serviceJourney: { line: { publicCode: '31' } }, destinationDisplay: { frontText: 'Fornebu' } }], '7': [{ realtime: false, aimedArrivalTime: '2018-09-13T00:43:00+0200', expectedArrivalTime: '2018-09-13T00:43:00+0200', date: '2018-09-12', serviceJourney: { line: { publicCode: '31' } }, destinationDisplay: { frontText: 'Tonsenhagen' } }], '15': [{ realtime: false, aimedArrivalTime: '2018-09-13T00:51:00+0200', expectedArrivalTime: '2018-09-13T00:51:00+0200', date: '2018-09-12', serviceJourney: { line: { publicCode: '54' } }, destinationDisplay: { frontText: 'Kjelsås stasjon' } }], '36': [{ realtime: true, aimedArrivalTime: '2018-09-13T01:12:00+0200', expectedArrivalTime: '2018-09-13T01:12:00+0200', date: '2018-09-13', serviceJourney: { line: { publicCode: '31' } }, destinationDisplay: { frontText: 'Grorud T' } }, { realtime: false, aimedArrivalTime: '2018-09-13T01:12:00+0200', expectedArrivalTime: '2018-09-13T01:12:00+0200', date: '2018-09-13', serviceJourney: { line: { publicCode: '31' } }, destinationDisplay: { frontText: 'Fornebu' } }], '66': [{ realtime: false, aimedArrivalTime: '2018-09-13T01:42:00+0200', expectedArrivalTime: '2018-09-13T01:42:00+0200', date: '2018-09-13', serviceJourney: { line: { publicCode: '31' } }, destinationDisplay: { frontText: 'Grorud T' } }, { realtime: false, aimedArrivalTime: '2018-09-13T01:42:00+0200', expectedArrivalTime: '2018-09-13T01:42:00+0200', date: '2018-09-13', serviceJourney: { line: { publicCode: '31' } }, destinationDisplay: { frontText: 'Fornebu' } }], '96': [{ realtime: false, aimedArrivalTime: '2018-09-13T02:12:00+0200', expectedArrivalTime: '2018-09-13T02:12:00+0200', date: '2018-09-13', serviceJourney: { line: { publicCode: '31' } }, destinationDisplay: { frontText: 'Grorud T' } }] },
        lastUpdated: expect.any(Number),
        getCalls: jest.fn()
    }

    const enzymeWrapper = mount(<App {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

function preLoadSetup() {
    const props = {
        id: null,
        name: null,
        transportMode: null,
        estimatedCalls: null,
        lastUpdated: null,
        getCalls: jest.fn(),
    }

    const enzymeWrapper = mount(<App {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

describe('main app functionality', () => {
    
    it('renders loading icon before receiving any data', () => {
        const { enzymeWrapper } = preLoadSetup();
        expect(enzymeWrapper.find('.fa-circle-notch').length).toBe(1)
    });

    it('renders initial view with data without crashing', () => {
        const { enzymeWrapper, props } = postLoadSetup();

        expect(enzymeWrapper.find('header').contains('Jernbanetorget')).toBe(true)
        expect(props.getCalls.mock.calls.length).toBe(1)
        expect(enzymeWrapper.find('li').length).toBe(10) 
    });

});
