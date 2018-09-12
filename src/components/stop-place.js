import moment from 'moment';
import React from 'react';

import styled from 'styled-components';

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faBus as Bus, faTrain as Train, faShip as Boat, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'


const Header = styled.header`    
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    background-color: #242424;
    color: white;
    font-size: 24px;
    font-family: 'Roboto';
    padding: ${props => props.theme.space.md} ${props => props.theme.space.xs};
`;

const LastUpdated = styled.div`
    align-self: flex-end;
    margin-right: ${props => props.theme.space.sm};
`;

const StopPlace = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;
const IconWrapper = styled.div`
    width: 56px;
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
                {diff > 1 && <Icon size="xs" icon={faExclamationTriangle}/> }
                {moment(lastUpdated).format('HH:mm')}
            </LastUpdated>
    </Header>
}