import moment from 'moment';
import React from 'react';

import styled from 'styled-components';

import Delay from '../styles/delay';
import DepartureWrapper from '../styles/departure';

const Departure = styled.div`
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: ${props => props.theme.space.xs};
`;

export default ({ expected, delay }) => {


    return <Departure>
        <DepartureWrapper><strong>{moment(expected).fromNow()}</strong></DepartureWrapper>
        <Delay>{delay > 1 && `+${delay}`}</Delay>
    </Departure>
}