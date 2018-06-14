import React from 'react';
import Doctor from '../../components/Doctor/index';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getAllDoctors} from "actions/doctor";
import {getUser} from "actions/user";

class Doctors extends React.Component {

    static propTypes = {
        doctors: PropTypes.arrayOf(PropTypes.object)
    };

    static defaultProps = {
        doctors: []
    }

    componentDidMount() {
        this.props.dispatch(getAllDoctors());
    }


    render() {
        const {clinics, auth} = this.props;
        return (
            <div className='doctors'>
                <h1 className="doc__list-title">Врачи в Киеве</h1>
                <div className='doc__list'>
                    {
                        this.props.doctors.map(doctor => (
                            <Doctor key={doctor["_id"] } item={doctor} clinics={clinics} auth={auth}/>
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default connect(state => ({
    doctors: state.doctors,
    clinics: state.clinics,
    auth: state.auth
}))(Doctors)