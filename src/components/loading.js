import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

const Loading = styled.div`
    width: 100vw;
    height: 100vh;
    background: ${props => props.theme.color.warning};
    color: white;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default () => {
    return <Loading>
        <Icon icon={faCircleNotch} spin={true} size="8x" />
    </Loading>

}