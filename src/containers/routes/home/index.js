import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import config from './config';
import {history} from 'stores/store';
import {getAllClinics} from "actions/clinics";
import {getAllDoctors} from "actions/doctor";
import {SEARCH_ITEM} from "constants/index";

class Home extends React.Component {

    static propTypes = {
        dispatch: PropTypes.func
    };

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(getAllDoctors());
        dispatch(getAllClinics());
    }

    searchItem = (e) => {
        if (e.keyCode === 13) {
            history.push('/doctors');
            this.props.dispatch({type: SEARCH_ITEM, filterOptions: {nameOfField: 'type', value: 'Хірург'}});
        }
    }

    render() {
        return (
            <div className='home'>
                <div className="home__main">
                    <div className="main__welcome">
                        <h1 className='main__greet'>Великий вибір лікарів та клінік</h1>
                        <span className="main__subtitle">Порівняйте інформацію по рейтингах, відгуках, ціні і підберіть спеціаліста для себе і ваших рідних в зручному районі</span>
                    </div>
                    <input className="home__search" type="search"
                           placeholder="Спеціальність лікаря, процедура, ім'я лікаря..." onKeyDown={(e)=>this.searchItem(e)}/>
                    <div className="home__popular">
                        <p className="home__popular-text">Популярні запити</p>
                        <ul className="home__popular-list">
                            {
                                config.popularItems.map((item, index) => <li key={index}><Link to={`${item.route}`}
                                                                                               className='home__popular-list-item'>{item.name}</Link>
                                </li>)
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => ({
    users: state.users
}))(Home)