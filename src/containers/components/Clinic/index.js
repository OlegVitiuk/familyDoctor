import React from 'react';
import PropTypes from 'prop-types';

export default class Clinic extends React.Component {

    static propTypes = {
        clinic: PropTypes.object
    };

    render() {
        const {clinic} = this.props;
        return (
            <div className="clinic">
                <div className="clinic__media">
                    <img className="clinic__photo" src={clinic.logoImage} alt="logoImage"/>
                    <div className="clinic__schedule">
                        <div className="clinic__schedule-weekdays">
                            <span>пн-пт</span>
                            <span>{`${clinic.schedule.weekdays.start} - ${clinic.schedule.weekdays.end}`}</span>
                        </div>
                        <div className="clinic__schedule-weekends">
                            <span>cб-нд</span>
                            <span>{`${clinic.schedule.weekends.start} - ${clinic.schedule.weekends.end}`}</span>
                        </div>
                    </div>
                    <div className="clinic__services">
                        {
                            clinic.infrastructure.map((item) => (
                                <img key={item.link} className="clinic__services-item" src={item.link}
                                     alt='service'/>))
                        }
                    </div>
                </div>
                <div className="clinic__info">
                    <div className="clinic__info-name"><span>{clinic.name}</span></div>
                </div>
            </div>
        )
    }
}