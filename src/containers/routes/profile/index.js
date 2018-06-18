import React from 'react';
import PropTypes from 'prop-types';
import ReactTable, {ReactTableDefaults } from "react-table";
import 'react-table/react-table.css'

import {connect} from 'react-redux';

const menuConfig = [
    {
        name: 'profile',
        value: 'Профіль'
    },
    {
        name: 'appointments',
        value: 'Записи'
    }
];

class Profile extends React.Component {

    static propTypes = {
        dispatch: PropTypes.func,
        activeUser: PropTypes.object
    };

    state = {
        activeMenuItem: 'profile'
    };

    changeMenuItem = (item) => this.setState(() => ({
        activeMenuItem: item
    }));

    changeLanguageReactTable = () =>{
        Object.assign(ReactTableDefaults, {
            previousText: "Попередня",
            nextText: "Наступна",
            noDataText: 'Рядків не знайдено',
            pageText: 'Сторінка',
            ofText: 'з',
            rowsText: 'рядків',
        });
    }
    getData = (user) => {
        let result = [];
        const {clinics, doctors} = this.props;

        user.records.forEach((item) => {
            let correctDataObj = {};
            doctors.forEach((doctor) => {
                if (item.doctorId === doctor._id) {
                    correctDataObj['doctorName'] = `${doctor.name} ${doctor.surname} ${doctor.middleName}`
                }
            });
            clinics.forEach((clinic) => {
                if (item.clinicId === clinic._id) {
                    correctDataObj['clinicName'] = clinic.name
                }
            });
            correctDataObj.date = item.date;
            correctDataObj.time = item.time[0];
            result.push(correctDataObj);
        });
        return result;
    }

    render() {
        const {activeUser: user} = this.props;
        const defaultAvatar = 'https://ucarecdn.com/ccb42d82-c1c0-45f0-8f6e-cb89f11027a8/user_female.png';
        const {activeMenuItem} = this.state;

        this.changeLanguageReactTable();

        const columns = [
            {
                Header: 'Дата',
                accessor: 'date',
                className: 'center'
            },
            {
                Header: 'Час',
                accessor: 'time',
                className: 'center'
            },
            {
                Header: 'Лікар',
                accessor: 'doctorName',
                className: 'center'
            },
            {
                Header: 'Клініка',
                accessor: 'clinicName',
                className: 'center'
            }
        ];

        return (
            <div className='profile'>
                <div className="profile__info">
                    <img src={user.img || defaultAvatar} alt="user-photo" className="profile__info-image"/>
                    <div className="profile__info-content">
                        <span className='profile__name'>{`${user.surname} ${user.name} ${user.middleName}`}</span>
                        <div className="profile__info-container">
                            <div className="profile__info-left">
                                <span>E-mail: </span>
                                <span>Телефон: </span>
                                <span>Місто: </span>
                            </div>
                            <div className="profile__info-right">
                                <span>{user.email}</span>
                                <span>{user.telephone}</span>
                                <span>{user.city}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profile__content">
                    <div className="profile__tabs">
                        {
                            menuConfig.map((item) => (
                                <span key={item.name} className={activeMenuItem === item.name ? 'active' : ''}
                                      onClick={() => this.changeMenuItem(item.name)}>{item.value}</span>))
                        }
                    </div>
                    {
                        activeMenuItem === 'profile'
                            ? (
                                < div className="profile__change">

                                </div>
                            ) : (
                                <div className="profile__appointments">
                                    <ReactTable
                                        data={this.getData(user)}
                                        columns={columns}
                                        defaultPageSize={5}
                                        className="-striped -highlight"/>
                                </div>
                            )
                    }
                </div>
            </div>
        );
    }
}

export default connect((state) => ({
    activeUser: state.user.activeUser,
    clinics: state.clinics,
    doctors: state.doctor.items
}))(Profile);