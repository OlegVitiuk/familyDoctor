import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import config from './config';
import './topheader.scss';

export default class TopHeader extends React.Component {

    render() {
        return (
            <div>
                <div className='info'></div>
                <ul className='menu'>
                    {
                        config.menu.map((item,index) => <li key={index}><Link to={`/${item.route}`} className='menu__item'>{item.name}</Link></li>)
                    }
                </ul>
            </div>
        );
    }
}