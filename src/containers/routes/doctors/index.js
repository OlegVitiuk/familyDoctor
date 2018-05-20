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
        return (
            <div className='doctors'>
                <h1 className="doc__list-title">Врачи в Киеве</h1>
                <div className='doc__list'>
                    {
                        this.props.doctors.map(doctor => (
                            <Doctor key={doctor["_id"] } item={doctor}/>
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default connect(state => ({
    doctors: state.doctors
}))(Doctors)