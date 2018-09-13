import moment from 'moment';
import React from 'react';

import styled from 'styled-components';

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faBus as Bus, faTrain as Train, faShip as Boat, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

import Delay from '../styles/delay';
import Departure from '../styles/departure';

const Header = styled.header`    
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-top: 4px solid ${props => props.theme.color.warning};
    background-color: ${props => props.theme.bg.secondary};
    color: white;
    font-size: 18px;
    font-family: 'Roboto';
    padding: ${props => props.theme.space.md + " " + props.theme.space.xs};
`;

const LastUpdated = styled.div`
    display: flex;
    align-self: flex-end;
    font-size: 24px;
    font-weight: bold;
    margin-right: ${props => props.theme.space.sm};
`;

const StopPlace = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const IconWrapper = styled.div`
    width: 40px;
    text-align: center;
`;

const Name = styled.div`
    margin-right: ${props => props.theme.space.sm};
`;

export default ({ name, lastUpdated, type }) => {
    let TransportIcon;
    switch (type) {
        case 'tram':
        case 'train':
            TransportIcon = Train;
            break;
        case 'boat':
            TransportIcon = Boat;
            break;
        case 'bus':
        default: 
            TransportIcon = Bus;
    }


    let exp = moment(lastUpdated);
    let aim = moment();
    let diff = exp.diff(aim, 'minutes');

    return <Header>
            <StopPlace>
                <IconWrapper>
                    <Icon icon={TransportIcon} />
                </IconWrapper>
                <Name>{name}</Name>
            </StopPlace>
            <LastUpdated>
                <Departure>{moment(lastUpdated).format('HH:mm')}</Departure>
                <Delay>{diff > 1 && <Icon size="xs" icon={faExclamationTriangle}/> }</Delay>
            </LastUpdated>
    </Header>
}