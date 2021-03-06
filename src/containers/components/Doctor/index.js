import React from 'react';
import PropTypes from 'prop-types';
import {history} from 'stores/store';
import Rating from 'react-rating';
import {SET_APPOINMENT_DOCTOR,SET_INFO_OF_SELECTED_OBJECT} from "constants/index";

export default class Doctor extends React.Component {

    static propTypes = {
        item: PropTypes.object,
        clinics: PropTypes.arrayOf(PropTypes.object),
        user: PropTypes.object
    }

    getClinicInfo = clinicsId => {
        let name = '';
        let street = '';
        let metro = '';
        let logoImage = '';

        const clinicsIdStr = clinicsId.join(' ');
        const clinicsForDoctor = this.props.clinics.filter(clinic => clinicsIdStr.includes(clinic._id));
        clinicsForDoctor.forEach(clinic => {
            name = name.concat(clinic.name).concat(' ');
            street = street.concat(clinic.adress.street).concat(' ');
            metro = metro.concat(clinic.adress.metro).concat(' ');
            logoImage = clinic.logoImage;
        });
        return {
            name,
            street,
            metro,
            logoImage
        }
    }
    makeAppoinment = (item) => {
        const {user, dispatch} = this.props;
        if (user.isAuthenticated) {
            history.push(`${history.location.pathname}#appoinment`);
            dispatch({type: SET_APPOINMENT_DOCTOR, item: item});
        }
    }

    openDopInfoPage = (data) => {
        this.props.dispatch({type: SET_INFO_OF_SELECTED_OBJECT, selectedObj: data})
        history.push(`${history.location.pathname}/dopInfo`);
    }

    render() {
        const {item} = this.props;

        const clinicsInfo = this.getClinicInfo(item.clinics);
        const selectedObj = {
            doctor: item,
            clinics: clinicsInfo
        };
        return (
            <div className="doc">
                <div className="doc__header">
                    <img alt='avatar' className="doc__header-img" src={item.photo}/>
                    <div className="doc__header-content">
                        <span
                            className="doc__header-content-name"
                            onClick={()=>this.openDopInfoPage(selectedObj)}>{`${item.name} ${item.surname} ${item.middleName}`}</span>
                        <span className="doc__header-content-type">{item.type.join(" ")}</span>
                        <span className="doc__header-content-status">{item.status}</span>
                    </div>
                    <div className="doc__header-rating">
                        <div className="doc__header-rating-content">
                            <span className="doc__header-rating-text">{item.rating}</span>
                            <Rating initialRating={item.rating} emptySymbol='star-empty star-special' fullSymbol='star-full star-special'/>
                        </div>
                        <span
                            className='doc__header-rating-reviews'>{`${item.reviews.length} ${item.reviews.length === 1 ? 'відгук' : 'відгуків'}`}</span>
                    </div>
                </div>
                <div className='doc__info'>
                    <div className="doc__info-clinic">
                        <span className="doc__info-clinic-name">{clinicsInfo.name}</span>
                        <span
                            className="doc__info-clinic-type">{clinicsInfo.street}</span>
                        <div className="doc__info-clinic-location">
                            <span className="doc__info-clinic-location-metroText">Метро:</span>
                            <span
                                className="doc__info-clinic-location-metroLink">{clinicsInfo.metro}</span>
                        </div>
                    </div>
                    <div className="doc__info-price">
                        <h3 className="doc__info-price-text">{`${item.price} грн`}</h3>
                        <button disabled={!this.props.user.isAuthenticated} className='doc__info-price-button'
                                onClick={() => this.makeAppoinment(item)}>Записатися
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}