import moment from 'moment';
import React from 'react';

import styled from 'styled-components';


const Departure = styled.div`
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: ${props => props.theme.space.xs};
`;

const Delay = styled.div`
    margin-right: 4px;
    width: 32px;
    text-align: right;
    color: ${props => props.theme.color.warning};
`

export default ({ expected, arrival }) => {
    let exp = moment(expected);
    let aim = moment(arrival);
    let diff = exp.diff(aim, 'minutes');

    return <Departure>
        <strong>{moment(expected).fromNow()}</strong>
        <Delay>{diff > 1 && `+${diff}`}</Delay>
    </Departure>
}