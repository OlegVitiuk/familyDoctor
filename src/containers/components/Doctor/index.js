import React from 'react';
import PropTypes from 'prop-types';
import {history} from 'stores/store';

export default class Doctor extends React.Component {

    static propTypes = {
        item: PropTypes.object,
        clinics: PropTypes.arrayOf(PropTypes.object),
        auth: PropTypes.object
    }

    getClinicInfo = clinicsId => {
        let name = '';
        let street= '';
        let metro =  '';

        const clinicsIdStr = clinicsId.join(' ');
        const clinicsForDoctor = this.props.clinics.filter(clinic => clinicsIdStr.includes(clinic._id));
        clinicsForDoctor.forEach(clinic => {
            name = name.concat(clinic.name).concat(' ');
            street = street.concat(clinic.adress.street).concat(' ');
            metro = metro.concat(clinic.adress.metro).concat(' ');
        });
        return {
            name,
            street,
            metro
        }
    }
    makeAppoinment = () =>{
        if (this.props.auth.isAuthenticated) {
            history.push(`${history.location.pathname}#appoinment`)
        }
    }

    render() {
        const {item} = this.props;

        const clinicsInfo = this.getClinicInfo(item.clinics);

        return (
            <div className="doc">
                <div className="doc__header">
                    <img className="doc__header-img" src={item.photo}/>
                    <div className="doc__header-content">
                        <span
                            className="doc__header-content-name">{`${item.name} ${item.surname} ${item.middleName}`}</span>
                        <span className="doc__header-content-type">{item.type.join(" ")}</span>
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
                        <button disabled={!this.props.auth.isAuthenticated} className='doc__info-price-button' onClick={this.makeAppoinment}>Записатися</button>
                    </div>
                </div>
            </div>
        );
    }


}