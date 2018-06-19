import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getAllDoctors} from "actions/doctor";
import {history} from 'stores/store';
import Rating from 'react-rating';
import {SET_APPOINMENT_DOCTOR} from "constants/index";

const menuConfig = [
    {
        name: 'reviews',
        value: 'Відгуки'
    },
    {
        name: 'about',
        value: 'Про лікаря'
    },
    {
        name: 'treatment',
        value: 'Лікування захворювань'
    }
];

const ratingItemsConfig = {
    qualification: "Кваліфікація лікаря: ",
    price: "Ціна-якість: ",
    attention: "Уважність лікаря: "
};

class DopInfo extends React.Component {

    static propTypes = {
        doctors: PropTypes.arrayOf(PropTypes.object)
    };

    static defaultProps = {
        doctor: {},
    }

    state = {
        doctorData: {},
        activeMenuItem: 'reviews'
    };

    changeMenuItem = (item) => this.setState(() => ({
        activeMenuItem: item
    }));

    makeAppoinment = (item) => {
        const {user, dispatch} = this.props;
        if (user.isAuthenticated) {
            history.push(`${history.location.pathname}#appoinment`);
            dispatch({type: SET_APPOINMENT_DOCTOR, item: item});
        }
    }

    renderTab = (item) => {
        if(this.state.activeMenuItem === 'reviews'){
            return (
                <div className='dop-info__content__tabs-reviews'>
                    {
                        item.reviews.map((review)=>(
                            <div key={Symbol(review.value).toString()} className='dop-info__content__tabs-review'>
                                <div className="dop-info__content__tabs-review__left">
                                    <div className="dop-info__content__tabs-review__left-header">
                                        <img src="https://ucarecdn.com/5fc424b2-e5f9-44cf-b270-eaca961fb3e8/w128h1281338911352handthumbsup.png"
                                             alt="resultReview" className='dop-info__content__tabs-review__left-header__img'/>
                                        <span className='dop-info__content__tabs-review__left-header__name'>Руслан</span>
                                    </div>
                                    <div className="dop-info__content__tabs-review__left-text">
                                        {review.text}
                                    </div>
                                </div>
                                <div className="dop-info__content__tabs-review__right">
                                    <span className="dop-info__content__tabs-review__right-date">
                                        {review.date}
                                    </span>
                                    {
                                        Object.keys(review.rating).map(el => (
                                            <div key={Symbol(el).toString()} className="dop-info__content__tabs-review__right-item">
                                                <span className='dop-info__content__tabs-review__right-item-text'>{ratingItemsConfig[el]}</span>
                                                <Rating readonly= {true} initialRating={review.rating[el]} emptySymbol='star-empty star-special' fullSymbol='star-full star-special'/>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            );
        }
    }
    render() {
        const {doctor} = this.props;
        const doctorData = doctor.selectedItem || {};

        if (Object.keys(doctorData).length) {
            const {doctor} = doctorData;
            const {clinics} = doctorData;

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
                                    <Rating initialRating={doctor.rating} emptySymbol='star-empty star-special'
                                            fullSymbol='star-full star-special'/>
                                    <span className='dop-info__doctor-content-rating-value'>{doctor.rating}</span>
                                    <div className="dop-info__doctor-content-reviews">
                                        {`${doctor.reviews.length} ${doctor.reviews.length === 1 ? 'відгук' : 'відгуків'}`}
                                    </div>
                                </div>
                                <div className="dop-info__doctor-content-experience">
                                    <img className='dop-info__doctor-content-experience-img'
                                         src="https://ucarecdn.com/d142059c-c91c-445e-a490-09ecf6c94878/doc_exp.png"
                                         alt="experience logo"/>
                                    <span
                                        className="dop-info__doctor-content-experience-text">{`Років досвіду: ${doctor.experience}`}</span>
                                </div>
                            </div>
                        </div>
                        <div className="dop-info__clinic">
                            <span className="dop-info__clinic-text">{`Клініки в яких працює: 1`}</span>
                            <div className='dop-info__clinic-content'>
                                <img src={clinics.logoImage} alt="clinicImg" className='dop-info__clinic-content-img'/>
                                <div className="dop-info__clinic-content-values">
                                    <span className="dop-info__clinic-content-values-name">{clinics.name}</span>
                                    <span className="dop-info__clinic-content-values-adress">{clinics.street}</span>
                                    <span className="dop-info__clinic-content-values-metro">{`Метро: ${clinics.metro}`}</span>
                                </div>
                                <div className='dop-info__clinic-content-price'>
                                    <span className="dop-info__clinic-content-price-value">{`${doctor.price} грн`}</span>
                                    <button type="submit" className="dopInfo__btn" onClick={() => this.makeAppoinment(doctor)}>Записатися</button>
                                </div>
                            </div>
                        </div>
                        <div className="dop-info__content">
                            <div className="dop-info__content__tabs">
                                {
                                    menuConfig.map((item) => (
                                        <span key={item.name} className={this.state.activeMenuItem === item.name ? 'active' : ''}
                                              onClick={() => this.changeMenuItem(item.name)}>{item.value}</span>))
                                }
                            </div>
                            {
                                this.renderTab(doctor)
                            }
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    }
}

export default connect(state => ({
    doctor: state.doctor,
    user: state.user
}))(DopInfo)