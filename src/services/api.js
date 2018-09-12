/* globals fetch */
    
function getEstimatedCallsForStop(stopPlace = "NSR:StopPlace:4000", startTime = new Date().toISOString()) {
    
    const query = `{
            stopPlace(id: "${stopPlace}") {
                id
                name 
                estimatedCalls(startTime: "${startTime}", timeRange: 72100, numberOfDepartures: 10) {
                    realtime
                    aimedArrivalTime
                    expectedArrivalTime
                    date
                    serviceJourney {
                        line {
                            publicCode
                        }
                    }
                    destinationDisplay {
                        frontText 
                    }
                }
            }
        }`;

    
    
    return fetch('https://api.entur.org/journeyplanner/2.0/index/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'ET-Client-Name': 'test',
        },
        body: JSON.stringify({
            query
        })
    }).then(res => res.json());
}

export default {
    getEstimatedCallsForStop
}