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
        if (!this.props.doctors.length) {
            this.props.dispatch(getAllDoctors());
        }
    }


    render() {
        const {clinics, user, dispatch} = this.props;
        return (
            <div className='doctors'>
                <h1 className="doc__list-title">Лікарі в Києві</h1>
                <div className='doc__list'>
                    {
                        this.props.doctors.map(doctor => (
                            <Doctor key={doctor["_id"]} item={doctor} clinics={clinics} user={user}
                                    dispatch={dispatch}/>
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
    user: state.user
}))(Doctors)