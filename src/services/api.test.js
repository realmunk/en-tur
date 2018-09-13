import api from './api';

import fetchMock from 'fetch-mock';

const MOCK_RESPONSE = { "data": { "stopPlace": { "id": "NSR:StopPlace:4000", "name": "Jernbanetorget", "estimatedCalls": [{ "realtime": false, "aimedArrivalTime": "2018-09-09T23:53:00+0200", "expectedArrivalTime": "2018-09-09T23:53:00+0200", "date": "2018-09-09", "serviceJourney": { "line": { "publicCode": "31" } }, "destinationDisplay": { "frontText": "Grorud T" } }, { "realtime": false, "aimedArrivalTime": "2018-09-09T23:54:00+0200", "expectedArrivalTime": "2018-09-09T23:54:00+0200", "date": "2018-09-09", "serviceJourney": { "line": { "publicCode": "54" } }, "destinationDisplay": { "frontText": "Tjuvholmen" } }, { "realtime": false, "aimedArrivalTime": "2018-09-09T23:55:00+0200", "expectedArrivalTime": "2018-09-09T23:55:00+0200", "date": "2018-09-09", "serviceJourney": { "line": { "publicCode": "30" } }, "destinationDisplay": { "frontText": "Nydalen" } }, { "realtime": true, "aimedArrivalTime": "2018-09-09T23:54:00+0200", "expectedArrivalTime": "2018-09-10T00:00:31+0200", "date": "2018-09-09", "serviceJourney": { "line": { "publicCode": "60" } }, "destinationDisplay": { "frontText": "Vippetangen" } }, { "realtime": false, "aimedArrivalTime": "2018-09-10T00:01:00+0200", "expectedArrivalTime": "2018-09-10T00:01:00+0200", "date": "2018-09-09", "serviceJourney": { "line": { "publicCode": "31" } }, "destinationDisplay": { "frontText": "Fornebu" } }, { "realtime": false, "aimedArrivalTime": "2018-09-10T00:03:00+0200", "expectedArrivalTime": "2018-09-10T00:03:00+0200", "date": "2018-09-09", "serviceJourney": { "line": { "publicCode": "31" } }, "destinationDisplay": { "frontText": "Tonsenhagen" } }, { "realtime": false, "aimedArrivalTime": "2018-09-10T00:04:00+0200", "expectedArrivalTime": "2018-09-10T00:04:00+0200", "date": "2018-09-09", "serviceJourney": { "line": { "publicCode": "30" } }, "destinationDisplay": { "frontText": "Bygdøy" } }, { "realtime": false, "aimedArrivalTime": "2018-09-10T00:06:00+0200", "expectedArrivalTime": "2018-09-10T00:06:00+0200", "date": "2018-09-09", "serviceJourney": { "line": { "publicCode": "54" } }, "destinationDisplay": { "frontText": "Kjelsås stasjon" } }, { "realtime": false, "aimedArrivalTime": "2018-09-10T00:09:00+0200", "expectedArrivalTime": "2018-09-10T00:09:00+0200", "date": "2018-09-09", "serviceJourney": { "line": { "publicCode": "54" } }, "destinationDisplay": { "frontText": "Tjuvholmen" } }, { "realtime": false, "aimedArrivalTime": "2018-09-10T00:11:00+0200", "expectedArrivalTime": "2018-09-10T00:11:00+0200", "date": "2018-09-09", "serviceJourney": { "line": { "publicCode": "31" } }, "destinationDisplay": { "frontText": "Snarøya" } }] } } };

let delay = (delayMs) => {
    return new Promise(resolve => {
        setTimeout(resolve, delayMs)
    })
}

describe('Estimated Calls for Stop Place', () => {    

    it('is calling the correct endpoint', async () => {

        fetchMock.mock('path:/journeyplanner/2.0/index/graphql', (url, options) => {
            return delay(1000).then(() => {
                return MOCK_RESPONSE
            })
        })

        await api.getEstimatedCallsForStop();
        expect(fetchMock.calls('path:/journeyplanner/2.0/index/graphql').length).toBe(1)
        fetchMock.restore();
    })

})

