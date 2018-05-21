import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import config from './config';
import {history} from 'stores/store';
import {connect} from 'react-redux';
import {getAllClinics} from "actions/clinics";
import {setAuthorizationToken} from "utils/index";
import {SET_CURRENT_USER} from "constants/index";

class TopHeader extends React.Component {
    static propTypes = {
        history: PropTypes.object,
        clinics: PropTypes.arrayOf(PropTypes.object),
        auth: PropTypes.object
    };

    static defaultProps = {
        clinics: []
    };

    componentDidMount() {
        this.props.dispatch(getAllClinics());
    }

    topHeaderClick(item) {
        const {auth, dispatch} = this.props;

        if (!auth.isAuthenticated) {
            history.push(`${history.location.pathname}#${item.route}`)
        } else {
            localStorage.removeItem('jwtToken');
            setAuthorizationToken(false);
            dispatch({type: SET_CURRENT_USER}, {});
        }

    }

    render() {
        const {auth} = this.props;
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
                            config.posibilities.filter(authItem => {
                                    if (auth.isAuthenticated) {
                                        return authItem.route === 'logout'
                                    }
                                    return authItem.route !== 'logout'
                                }
                            ).map((item, index) => <li key={index} className='topheader__menu-item'
                                                       onClick={() => this.topHeaderClick(item)}>{item.name}</li>)
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
    clinics: state.clinics,
    auth: state.auth
}))(TopHeader)