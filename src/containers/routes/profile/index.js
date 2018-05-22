import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

class Profile extends React.Component {

    static propTypes = {
        dispatch: PropTypes.func
    };

    componentDidMount() {

    }

    render() {
        return (
            <div className='profile'>
                <h1>`Hi ${this.props.user.name}`</h1>
                <h1>It is your profile page! Pretty simple, yeah?</h1>
            </div>
        );
    }
}

export default connect((state) => ({
    user: state.auth
}))(Profile);