import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getAllDoctors} from "actions/doctor";
import Rating from 'react-rating';

class DopInfo extends React.Component {

    static propTypes = {
        doctors: PropTypes.arrayOf(PropTypes.object)
    };

    static defaultProps = {
        doctor: {},
    }

    state = {
        doctorData: {}
    };

    componentWillReceiveProps(nextProps) {

    }

    render() {
        const {doctor} = this.props;
        const doctorData = doctor.selectedItem || {};
        console.log(doctorData)

        if (Object.keys(doctorData).length) {
            const {doctor} = doctorData;
            return (
                <div>
                    <div className="dop-info__route">
                        <span
                            className="dop-info__route-text">{`Система findDoc > Лікарі > ${`${doctor.name} ${doctor.surname} ${doctor.middleName}`}`}</span>
                    </div>
                    <div className='dop-info'>
                        <div className="dop-info__doctor">
                            <img src={doctor.photo} alt="doctorPhoto" className='dop-info__doctor-photo'/>
                            <div className="dop-info__doctor-content">
                                <span className="dop-info__doctor-content-status">{doctor.status}</span>
                                <span className="dop-info__doctor-content-name">
                            {`${doctor.name} ${doctor.surname} ${doctor.middleName}`}</span>
                                <span className="dop-info__doctor-content-types">
                            {doctor.type.join(" ")}</span>
                                <div className='dop-info__doctor-content-rating'>
                                    <span className='dop-info__doctor-content-rating-text'>Середня оцінка</span>
                                    <Rating initialRating={doctor.rating} emptySymbol='star-empty star-special' fullSymbol='star-full star-special'/>
                                    <span className='dop-info__doctor-content-rating-value'>{doctor.rating}</span>
                                    <div className="dop-info__doctor-content-reviews">
                                        {`${doctor.reviews.length} ${doctor.reviews.length === 1 ? 'відгук' : 'відгуків'}`}
                                    </div>
                                </div>
                                <div className="dop-info__doctor-content-experience">
                                    <img className='dop-info__doctor-content-experience-img' src="https://ucarecdn.com/d142059c-c91c-445e-a490-09ecf6c94878/doc_exp.png" alt="experience logo"/>
                                    <span className="dop-info__doctor-content-experience-text">{`Років досвіду: ${doctor.experience}`}</span>
                                </div>
                            </div>
                        </div>
                        <div className="dop-info__clinic">

                        </div>
                        <div className="dop-info__content">

                        </div>
                    </div>
                </div>
            );
        }
        return null;
    }
}

export default connect(state => ({
    doctor: state.doctor
}))(DopInfo)