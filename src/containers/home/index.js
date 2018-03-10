import React from 'react'
import {connect} from 'react-redux'
import {getUsers} from '../../actions/userActions';

class Home extends React.Component {

    render() {
        return (
            <div>
                <h1>Home</h1>
                <p>
                    <button onClick={() => this.props.dispatch(getUsers())}>Get Users</button>
                </p>
            </div>
        );
    }
}

export default connect(state =>({
        users: state.users
    }))(Home)