import moment from 'moment';

import React from 'react';
import styled from 'styled-components';

import Line from './line';
import Departure from './departure';


moment.relativeTimeThreshold('ss', 9);
moment.relativeTimeThreshold('m', 10);


const EstimatedCalls = styled.div`    
    display: flex;
    flex-direction: column;
`;

const Ul = styled.ul`    
    list-style: none;
    display: block;
    margin: 0;
    padding: 0;
`;

const Li = styled.li`    
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: ${props => props.theme.space.xs};

    /* BG: */
    background: #FFFFFF;

    border-bottom: 1px solid ${props => props.theme.color.secondary};    
    &:first-child {
        border-top: 1px solid ${props => props.theme.color.secondary};
    }
`;

export default ({ calls }) => {
    return <EstimatedCalls>
        <Ul>
            {calls.map((call => {
                return <Li key={call.serviceJourney.line.publicCode + Math.random() * 100} className="estimated-call">
                    <Line publicCode={call.serviceJourney.line.publicCode} name={call.destinationDisplay.frontText} />
                    <Departure expected={call.expectedArrivalTime} aimed={call.aimedArrivalTime} />
                    </Li>
                }
            ))}
        </Ul>
    </EstimatedCalls>
}