import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import config from './config';
import {history} from '../../../stores/store';

export default class TopHeader extends React.Component {
    static propTypes = {
        history: PropTypes.object
    };

    render() {
        return (
            <div className='topheader'>
                <div className='topheader__info'>
                    <div className="topheader__info-call">
                        <a href="/">
                            <img className='topheader__info-logo'
                                 src="https://ucarecdn.com/de59fd3c-e683-4cd2-a211-f0183d145671/download.png"
                                 alt="logo"/>
                        </a>
                        <div className="topheader__info-call-item topheader__info-call-form">Обратный звонок</div>
                        <span className="topheader__info-call-item">0956289359</span>
                        <div className="topheader__info-call-item topheader__info-call-form">Небесплатно</div>
                    </div>
                    <div className='topheader__info-search'>
                        <div className="topheader__info-call-item topheader__info-call-form">Киев</div>
                    </div>
                </div>
                <div className='topheader__menu'>
                    <ul className='topheader__menu-navigation'>
                        {
                            config.menu.map((item, index) => <li key={index}><Link to={`/${item.route}`}
                                                                                   className='topheader__menu-item'>{item.name}</Link>
                            </li>)
                        }
                    </ul>
                    <ul className="topheader__menu-posibilities">
                        {
                            config.posibilities.map((item, index) => <li key={index} className='topheader__menu-item'
                                                                         onClick={() => history.push(`${history.location.pathname}#${item.route}`)}>{item.name}</li>)
                        }
                    </ul>
                </div>
                <div className="topheader__filter">

                </div>
            </div>
        );
    }
}