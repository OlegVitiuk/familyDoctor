import React from 'react';
import Doctor from '../../components/Doctor/index';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getAllDoctors} from "actions/doctor";

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
        const {clinics, auth,dispatch} = this.props;
        return (
            <div className='doctors'>
                <h1 className="doc__list-title">Врачи в Киеве</h1>
                <div className='doc__list'>
                    {
                        this.props.doctors.map(doctor => (
                            <Doctor key={doctor["_id"] } item={doctor} clinics={clinics} auth={auth} dispatch ={dispatch}/>
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default connect(state => ({
    doctors: state.doctor.items,
    clinics: state.clinics,
    auth: state.auth
}))(Doctors)