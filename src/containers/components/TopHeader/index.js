import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import config from './config';
import {history} from 'stores/store';
import {connect} from 'react-redux';
import {getAllClinics} from "actions/clinics";

class TopHeader extends React.Component {
    static propTypes = {
        history: PropTypes.object,
        clinics: PropTypes.arrayOf(PropTypes.object)
    };

    static defaultProps = {
        clinics: []
    };

    componentDidMount(){
        this.props.dispatch(getAllClinics());
    }

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
                        <div className='topheader__info-place'>Киев</div>
                        <span className="topheader__info-call-item">0956289359</span>
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

export default connect(state => ({
    clinics: state.clinics
}))(TopHeader)