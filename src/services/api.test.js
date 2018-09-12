import { getEstimatedCallsForStop } from './api';

import fetchMock from 'fetch-mock';

const MOCK_RESPONSE = { "data": { "stopPlace": { "id": "NSR:StopPlace:4000", "name": "Jernbanetorget", "estimatedCalls": [{ "realtime": false, "aimedArrivalTime": "2018-09-09T23:53:00+0200", "expectedArrivalTime": "2018-09-09T23:53:00+0200", "date": "2018-09-09", "serviceJourney": { "line": { "publicCode": "31" } }, "destinationDisplay": { "frontText": "Grorud T" } }, { "realtime": false, "aimedArrivalTime": "2018-09-09T23:54:00+0200", "expectedArrivalTime": "2018-09-09T23:54:00+0200", "date": "2018-09-09", "serviceJourney": { "line": { "publicCode": "54" } }, "destinationDisplay": { "frontText": "Tjuvholmen" } }, { "realtime": false, "aimedArrivalTime": "2018-09-09T23:55:00+0200", "expectedArrivalTime": "2018-09-09T23:55:00+0200", "date": "2018-09-09", "serviceJourney": { "line": { "publicCode": "30" } }, "destinationDisplay": { "frontText": "Nydalen" } }, { "realtime": true, "aimedArrivalTime": "2018-09-09T23:54:00+0200", "expectedArrivalTime": "2018-09-10T00:00:31+0200", "date": "2018-09-09", "serviceJourney": { "line": { "publicCode": "60" } }, "destinationDisplay": { "frontText": "Vippetangen" } }, { "realtime": false, "aimedArrivalTime": "2018-09-10T00:01:00+0200", "expectedArrivalTime": "2018-09-10T00:01:00+0200", "date": "2018-09-09", "serviceJourney": { "line": { "publicCode": "31" } }, "destinationDisplay": { "frontText": "Fornebu" } }, { "realtime": false, "aimedArrivalTime": "2018-09-10T00:03:00+0200", "expectedArrivalTime": "2018-09-10T00:03:00+0200", "date": "2018-09-09", "serviceJourney": { "line": { "publicCode": "31" } }, "destinationDisplay": { "frontText": "Tonsenhagen" } }, { "realtime": false, "aimedArrivalTime": "2018-09-10T00:04:00+0200", "expectedArrivalTime": "2018-09-10T00:04:00+0200", "date": "2018-09-09", "serviceJourney": { "line": { "publicCode": "30" } }, "destinationDisplay": { "frontText": "Bygdøy" } }, { "realtime": false, "aimedArrivalTime": "2018-09-10T00:06:00+0200", "expectedArrivalTime": "2018-09-10T00:06:00+0200", "date": "2018-09-09", "serviceJourney": { "line": { "publicCode": "54" } }, "destinationDisplay": { "frontText": "Kjelsås stasjon" } }, { "realtime": false, "aimedArrivalTime": "2018-09-10T00:09:00+0200", "expectedArrivalTime": "2018-09-10T00:09:00+0200", "date": "2018-09-09", "serviceJourney": { "line": { "publicCode": "54" } }, "destinationDisplay": { "frontText": "Tjuvholmen" } }, { "realtime": false, "aimedArrivalTime": "2018-09-10T00:11:00+0200", "expectedArrivalTime": "2018-09-10T00:11:00+0200", "date": "2018-09-09", "serviceJourney": { "line": { "publicCode": "31" } }, "destinationDisplay": { "frontText": "Snarøya" } }] } } };

let delay = (delayMs) => {
    return new Promise(resolve => {
        setTimeout(resolve, delayMs)
    })
}
/*
  
API'et har en kunstig begrensning (begrensningen er ikke i API'et i virkeligheten, dette er kun et fiktivt problem) som gjør at klienten ikke kan sende kall til API'et før klienten har fått svar på det forrige kallet som ble sendt. 
  
  Derfor må du implementere køfunksjonalitet som gjør følgende:
  - Hvis et kall har blitt sendt og ikke fått en respons skal påfølgende kall fra klienten legges i en kø og sendes til API'et når responsen fra det foregående kallet returneres
  - Det er kun det siste kallet som legges i køen som skal sendes til API'et når responsen fra det foregående kallet returneres, resten kan forkastes.
*/

describe('Estimated Calls for Stop Place', () => {

    fetchMock.mock('path:/journeyplanner/2.0/index/graphql', (url, options) => {
        return delay(1000).then(() => {
            return MOCK_RESPONSE
        })
    })

    it('is working as it should', async () => {
        await getEstimatedCallsForStop();
        expect(fetchMock.calls('path:/journeyplanner/2.0/index/graphql').length).toBe(1)
    })
})

