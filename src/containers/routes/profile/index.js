import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

class Profile extends React.Component {

    static propTypes = {
        dispatch: PropTypes.func,
        activeUser: PropTypes.object
    };

    render() {
        const {activeUser: user} = this.props;
        const defaultAvatar = 'https://ucarecdn.com/ccb42d82-c1c0-45f0-8f6e-cb89f11027a8/user_female.png';
        return (
            <div className='profile'>
                <div className="profile__info">
                    <img src={user.img || defaultAvatar} alt="user-photo" className="profile__info-image"/>
                    <div className="profile__info-content">
                        <span className='profile__name'>{`${user.surname} ${user.name} ${user.fathersName}`}</span>
                        <div className="profile__info-container">
                            <div className="profile__info-left">
                                <span>E-mail: </span>
                                <span>Телефон: </span>
                                <span>Місто: </span>
                            </div>
                            <div className="profile__info-right">
                                <span>{user.email}</span>
                                <span>{user.telephone}</span>
                                <span>{user.city}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profile__content">
                    <div className="profile__tabs">
                        <span>Профіль</span>
                        <span>Записи</span>
                    </div>
                    <div className="profile__change">

                    </div>
                    <div className="profile__appointments">

                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state) => ({
    activeUser: state.user.activeUser
}))(Profile);