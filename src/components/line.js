import React from 'react';
import styled from 'styled-components';

const Line = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const PublicCode = styled.div`
    width: 56px;
    font-size: 18px;
    font-weight: bold;
    padding: ${props => props.theme.space.sm};
    background: ${props => props.theme.bg.primary};
`;

const Name = styled.div`  
    margin-left: ${props => props.theme.space.sm};
    margin-right: ${props => props.theme.space.sm};
`;


export default ({ publicCode, name }) => {
    return <Line>
            <PublicCode>{`${publicCode}`}</PublicCode>
            <Name>{name}</Name>
        </Line>
        
}