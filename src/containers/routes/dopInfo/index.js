import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getAllDoctors} from "actions/doctor";

class DopInfo extends React.Component {

    static propTypes = {
        doctors: PropTypes.arrayOf(PropTypes.object)
    };

    static defaultProps = {
        doctor: {},
    }


    render() {
        const {clinics, user, dispatch, doctor} = this.props;
        return (
            <div className='dop-info'>

            </div>
        );
    }
}

export default connect(state => ({
    doctor: state.doctor,
    clinics: state.clinics,
    user: state.user
}))(DopInfo)