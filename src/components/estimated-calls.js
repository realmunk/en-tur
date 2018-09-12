import moment from 'moment';
import React from 'react';
import './estimated-calls.css';

moment.relativeTimeThreshold('ss', 9);
moment.relativeTimeThreshold('m', 10);



export default ({ calls }) => {
    return <ul>
        {calls.map((call => {
            
            let exp = moment(call.expectedArrivalTime);
            let aim = moment(call.aimedArrivalTime);
            let diff = exp.diff(aim, 'minutes');
            
            return <li key={call.serviceJourney.line.publicCode + Math.random() * 100} className="estimated-call"> 
                    <span>{`${call.serviceJourney.line.publicCode} ${call.destinationDisplay.frontText}`}</span>
                    &nbsp;
                    {diff > 1 && <span>{`${moment(call.expectedArrivalTime).fromNow()} (+${diff})`}</span>}
                    {diff <= 1 && <span>{moment(call.expectedArrivalTime).fromNow()}</span>}
                </li>
            }
        ))}
    </ul>
}