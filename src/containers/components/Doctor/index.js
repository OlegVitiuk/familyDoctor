import React from 'react';
import './_index.scss';

export default class Doctor extends React.Component {

    render(){
        return (
            <div className="doc">
                <div className="doc__header">
                    <img className="doc__header-img" src="https://ucarecdn.com/3ef8f833-6803-4f65-b8eb-13a2e1b972c3/1f3f02a2f157a3117f9d4af266fd4985.jpg" alt=""/>
                    <div className="doc__header-content">
                        <span className="doc__header-content-name">Ковальская  Инна  Александровна</span>
                        <span className="doc__header-content-type">Гинеколог,Онколог,Хирург</span>
                        <span className="doc__header-content-status">Врач высшей категории Доктор медицинских наук</span>
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
                        <h3 className="doc__info-price-text"> 550 грн</h3>
                        <a href="#" className="doc__info-price-button">Записаться</a>
                    </div>
                </div>
            </div>
        );
    }


}