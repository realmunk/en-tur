import moment from 'moment';
import React from 'react';
import './estimated-calls.css';

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faBus as Bus } from '@fortawesome/free-solid-svg-icons'

export default ({ name, lastUpdated }) => {
    return <header>
        <h1>
            <Icon icon={Bus}/>
            <span>{name}</span>
            <span>{lastUpdated}</span>
        </h1>
    
    </header>
}