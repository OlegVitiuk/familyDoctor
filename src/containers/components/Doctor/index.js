import React from 'react';
import PropTypes from 'prop-types';

export default class Doctor extends React.Component {

    static propTypes = {
        item: PropTypes.object
    }

    render(){
        const {item} = this.props;

        return (
            <div className="doc">
                <div className="doc__header">
                    <img className="doc__header-img" src={item.photo} />
                    <div className="doc__header-content">
                        <span className="doc__header-content-name">{`${item.name} ${item.surname} ${item.middleName}`}</span>
                        <span className="doc__header-content-type">{item.type.join(" ")}</span>
                    </div>
                </div>
                <div className='doc__info'>
                    <div className="doc__info-clinic">
                        <span className="doc__info-clinic-name">Клиника Академика Земского</span>
                        <span className="doc__info-clinic-type">проспект Голосеевский, 59б</span>
                        <div className="doc__info-clinic-location">
                            <span className="doc__info-clinic-location-text">Голосеевский район:</span>
                            <span className="doc__info-clinic-location-link">Демеевка</span>
                            <span className="doc__info-clinic-location-metroText">Метро:</span>
                            <span className="doc__info-clinic-location-metroLink">Демеевская,Голосеевская</span>
                        </div>
                    </div>
                    <div className="doc__info-price">
                        <h3 className="doc__info-price-text">{item.price}</h3>
                        <a href="#" className="doc__info-price-button">Записаться</a>
                    </div>
                </div>
            </div>
        );
    }


}