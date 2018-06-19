import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import config from './config';
import {history} from 'stores/store';
import {connect} from 'react-redux';
import {getAllClinics} from "actions/clinics";
import {setAuthorizationToken} from "utils/index";
import {SET_AUTHORIZATON, SET_USER, FILTER_DOCTORS,REMOVE_FILTER_OPTIONS} from "constants/index";
import {getAllDoctors} from "actions/doctor";
import {uniqBy} from 'lodash';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class TopHeader extends React.Component {
    static propTypes = {
        clinics: PropTypes.arrayOf(PropTypes.object),
        auth: PropTypes.object
    };

    static defaultProps = {
        clinics: [],
        doctors: [],
        routing: {},
        filterItems: []
    };

    state = {
        filterOptions: []
    };

    componentWillReceiveProps(nextProps) {
        const {filterOptions} = nextProps;
        if (Object.keys(filterOptions).length) {
            this.setState((prevState) => ({
                ...prevState,
                filterOptions: [{...filterOptions}]
            }));
        }
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(getAllClinics());
        dispatch(getAllDoctors());
    }

    setFilterOption = (selectedOption, filterType) => {
        const config = [
            {
                name: 'doctorSpeciality',
                value: 'type'
            },
            {
                name: 'clinicDestination',
                value: 'destination'
            },
            {
                name: 'region',
                value: 'adress.region'
            },
            {
                name: 'rating',
                value: 'rating'
            }];
        if (selectedOption) {
            let correctFilterType = '';
            config.forEach(item => {
                    if (item.name === filterType) {
                        correctFilterType = item.value;
                    }
                }
            )
            this.setState((prevState) => ({
                filterOptions: [
                    ...prevState.filterOptions,
                    {
                        nameOfField: correctFilterType,
                        value: selectedOption.value
                    }
                ]
            }), () => this.props.dispatch({type: FILTER_DOCTORS, filterOptions: this.state.filterOptions}));
        } else {
            this.setState((prevState) => ({
                filterOptions: []
            }), () => {
                this.props.dispatch({type: FILTER_DOCTORS, filterOptions: this.state.filterOptions});
                this.props.dispatch({type: REMOVE_FILTER_OPTIONS, filterOptions: []});
            });
        }
    }

    topHeaderClick(item) {
        const {user, dispatch} = this.props;

        if (!user.isAuthenticated) {
            history.push(`${history.location.pathname}#${item.route}`)
        } else {
            if (item.route !== 'profile') {
                localStorage.removeItem('jwtToken');
                setAuthorizationToken(false);
                dispatch({type: SET_AUTHORIZATON}, {});
                dispatch({type: SET_USER}, {});
            }
            history.push(`/${item.route}`);
        }
    }

    getArrayOfOptionsForSelect = (obj) => (
        obj.map(type => ({
                label: type,
                value: type
            }
        )))

    getOptionsForFilters = () => {
        const {doctors, clinics} = this.props;
        let doctorsTypes = [];
        let clinicsTypes = [];
        let regionTypes = [];

        doctors.forEach((doctor) => {
            doctorsTypes = doctorsTypes.concat(doctor.type);
        });
        clinics.forEach((clinic) => {
            clinicsTypes = clinicsTypes.concat(clinic.destination.split(', '));
            regionTypes = regionTypes.concat(clinic.adress.region)
        });

        doctorsTypes = uniqBy(doctorsTypes);
        clinicsTypes = uniqBy(clinicsTypes);
        regionTypes = uniqBy(regionTypes);

        doctorsTypes = this.getArrayOfOptionsForSelect(doctorsTypes);
        clinicsTypes = this.getArrayOfOptionsForSelect(clinicsTypes);
        regionTypes = this.getArrayOfOptionsForSelect(regionTypes);

        return {
            doctorsTypes, clinicsTypes, regionTypes
        }
    }

    renderFilter() {
        const {doctors, clinics, routing} = this.props;
        const {doctorsTypes, clinicsTypes, regionTypes} = this.getOptionsForFilters();
        const generalOptions = [
            {
                label: 'За зростанням рейтингу',
                value: 'toBigRating'
            },
            {
                label: 'За спаданням рейтингу',
                value: 'toLowRating'
            },
            {
                label: 'За спаданням ціни',
                value: 'toLowPrice'
            },
            {
                label: 'За зростанням ціни',
                value: 'toBigPrice'
            },
            {
                label: 'За зростанням досвіду',
                value: 'toBigExperience'
            },
            {
                label: 'За спаданням досвіду досвіду',
                value: 'toLowExperience'
            },
        ];
        let filterItemsConfig = [
            {
                name: 'doctorSpeciality',
                img: 'https://ucarecdn.com/0033d81c-46a9-4dd9-9a7e-c82e1d1e53a8/Doctor.png',
                items: doctorsTypes,
                text: "Всі спеціальності"
            },
            {
                name: "clinicDestination",
                img: 'https://ucarecdn.com/b62cc7c4-9340-413e-a84d-a57f4a7ed012/Clinic_list.png',
                items: clinicsTypes,
                text: "Всі напрямки"
            },
            {
                name: "region",
                img: 'https://ucarecdn.com/ff9d2fb1-fc62-4c08-8fc6-6a783efc8cd2/Pointer.png',
                items: regionTypes,
                text: "Всі райони і метро"
            },
            {
                name: "rating",
                img: 'https://ucarecdn.com/7b4e3af7-0e21-41e9-a161-747730911de4/Descending_Sorting.png',
                items: generalOptions,
                text: "Від більшого рейтингу до меншого",
                specialClass: 'topheader__filter-item-select-bigger'
            }
        ];

        return filterItemsConfig.filter(item => {
            if (routing.location.pathname === '/doctors') {
                return item.name !== 'clinicDestination';
            } else if (routing.location.pathname === '/clinics') {
                return item.name !== 'doctorSpeciality';
            }
        }).map((item) => (
            <div key={item.img} className={`topheader__filter-item`}>
                <img src={item.img} alt="icon" className='topheader__filter-item-img'/>
                <Select
                    placeholder={<div className='topheader__filter-item-select-placeholder'>{item.text}</div>}
                    options={item.items}
                    className={`topheader__filter-item-select ${item.specialClass ? item.specialClass : ''}`}
                    value={this.state.filterOptions[0] && this.state.filterOptions[0].value}
                    onChange={(selectedOption) => this.setFilterOption(selectedOption, item.name)}
                />
            </div>
        ));
    }

    render() {
        const {user, routing} = this.props;

        return (
            <div className='topheader'>
                <div className='topheader__info'>
                    <div>
                        <a href="/">
                            <img className='topheader__info-logo'
                                 src="https://ucarecdn.com/de59fd3c-e683-4cd2-a211-f0183d145671/download.png"
                                 alt="logo"/>
                        </a>
                    </div>
                    <div className="topheader__info-telephone">+380956289359</div>
                    <div className='topheader__info-place'>Київ</div>
                </div>
                <div className='topheader__menu'>
                    < ul
                        className='topheader__menu-navigation'>
                        {
                            config.menu.map((item, index) => <li
                                className={`${routing.location.pathname === `/${item.route}` ? 'active' : ''} topheader__menu-item`}
                                key={index}>
                                <Link to={`/${item.route}`}>{item.name}</Link>
                            </li>)
                        }
                    </ul>
                    <ul
                        className="topheader__menu-posibilities">
                        {
                            config.posibilities.filter(authItem => user.isAuthenticated ? authItem.auth : !authItem.auth)
                                .map((item, index) => (
                                        <li key={index}
                                            className={`${routing.location.pathname === `/${item.route}` ? 'active' : ''} topheader__menu-item`}
                                            onClick={() => this.topHeaderClick(item)}><a>{item.name}</a></li>
                                    )
                                )
                        }
                    </ul>
                </div>
                <div className="topheader__filter">
                    {
                        this.renderFilter()
                    }
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    clinics: state.clinics,
    doctors: state.doctor.items,
    user: state.user,
    routing: state.routing,
    filterItems: state.doctor.filterItems,
    filterOptions: state.doctor.filterOptions
}))(TopHeader)