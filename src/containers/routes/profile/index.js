import React from 'react';
import PropTypes from 'prop-types';
import './_index.scss';
import config from './config';

import { connect } from 'react-redux';

class Profile extends React.Component {

    static propTypes ={
        dispatch: PropTypes.func
    };

    componentDidMount(){

    }

    render() {
        return (
            <div className='profile'>
                <h1>It is profile page!</h1>
            </div>
        );
    }
}

export default connect((state)=>{
    activeUser: state.user.activeUser
})(Profile);