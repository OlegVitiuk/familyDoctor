import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import config from './config';
import {history} from 'stores/store';
import {connect} from 'react-redux';
import {getAllClinics} from "actions/clinics";
import {setAuthorizationToken} from "utils/index";
import {SET_AUTHORIZATON, SET_USER} from "constants/index";
import {getAllDoctors} from "actions/doctor";

class TopHeader extends React.Component {
    static propTypes = {
        clinics: PropTypes.arrayOf(PropTypes.object),
        auth: PropTypes.object
    };

    static defaultProps = {
        clinics: []
    };

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(getAllClinics());
        dispatch(getAllDoctors());

    }

    topHeaderClick(item) {
        const {user, dispatch} = this.props;

        if (!user.isAuthenticated) {
            history.push(`${history.location.pathname}#${item.route}`)
        } else {
            if (item.route !== 'profile') {
                localStorage.removeItem('jwtToken');
                setAuthorizationToken(false);
                dispatch({type: SET_AUTHORIZATON}, {});
                dispatch({type: SET_USER}, {});
            }
            history.push(`/${item.route}`);
        }

    }

    render() {
        const {user, routing} = this.props;

        return (
            <div className='topheader'>
                <div className='topheader__info'>
                    <div>
                        <a href="/">
                            <img className='topheader__info-logo'
                                 src="https://ucarecdn.com/de59fd3c-e683-4cd2-a211-f0183d145671/download.png"
                                 alt="logo"/>
                        </a>
                    </div>
                    <div className="topheader__info-telephone">+380956289359</div>
                    <div className='topheader__info-place'>Київ</div>
                </div>
                <div className='topheader__menu'>
                    < ul
                        className='topheader__menu-navigation'>
                        {
                            config.menu.map((item, index) => <li
                                className={`${routing.location.pathname === `/${item.route}` ? 'active' : ''} topheader__menu-item`}
                                key={index}>
                                <Link to={`/${item.route}`}>{item.name}</Link>
                            </li>)
                        }
                    </ul>
                    <ul
                        className="topheader__menu-posibilities">
                        {
                            config.posibilities.filter(authItem => user.isAuthenticated ? authItem.auth : !authItem.auth)
                                .map((item, index) => (
                                        <li key={index}
                                            className={`${routing.location.pathname === `/${item.route}` ? 'active' : ''} topheader__menu-item`}
                                            onClick={() => this.topHeaderClick(item)}><a>{item.name}</a></li>
                                    )
                                )
                        }
                    </ul>
                </div>
                <div className="topheader__filter">

                </div>
            </div>
        )
    }
}

export default connect(state => ({
    clinics: state.clinics,
    user: state.user,
    routing: state.routing
}))(TopHeader)