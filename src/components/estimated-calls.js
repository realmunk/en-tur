import moment from 'moment';

import React from 'react';
import styled from 'styled-components';

import Line from './line';
import Departure from './departure';

const Column = styled.div`    
    display: flex;
    flex-direction: column;
`;

const Ul = styled.ul`    
    list-style: none;
    display: block;
    margin: 0;
    padding: 0;
    margin-top: ${props => props.theme.base * 2 * props.waitTime}px;
`;

const Li = styled.li`    
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: ${props => props.theme.space.xs};
    /* BG: */
    background: rgba(255, 255, 255, 0.8);

    border-bottom: 1px solid ${props => props.theme.color.secondary};    
    &:first-child {
        border-top: 1px solid ${props => props.theme.color.secondary};
    }
`;

export default ({estimatedCalls}) => {
    return (
        <Column>
            {Object.keys(estimatedCalls).map(group => {
                return <Ul waitTime={group} key={group}>
                    {estimatedCalls[group].map(call => {

                        let expected = moment(call.expectedArrivalTime);
                        let aimed = moment(call.aimedArrivalTime);
                        let delay = expected.diff(aimed, 'minutes');

                        return <Li key={call.serviceJourney.line.publicCode + Math.random() * 100}>
                            <Line publicCode={call.serviceJourney.line.publicCode} name={call.destinationDisplay.frontText} />
                            <Departure expected={expected} aimed={aimed} delay={delay} />
                        </Li>
                    })}
                </Ul>
            })}
        </Column>);
}; 