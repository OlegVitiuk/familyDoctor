import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getUsers} from '../../../actions/userActions';
import { Link } from 'react-router-dom';
import './_index.scss';
import config from './config';

class Home extends React.Component {

    static propTypes ={
      dispatch: PropTypes.func
    };

    componentWillMount(){
        this.props.dispatch(getUsers());
    }

    render() {
        return (
            <div className='home'>
                <div className="home__main">
                    <div className="main__welcome">
                        <h1 className='main__greet'>Большой выбор врачей и клиник</h1>
                        <span className="main__subtitle">Сравните информацию по рейтингам, отзывам, цене и подберите специалиста для себя и ваших близких в удобном районе</span>
                    </div>
                    <input className="home__search" type="search"
                           placeholder="Специальность врача, процедура, имя доктора..."/>
                    <div className="home__popular">
                        <p className="home__popular-text">Популярные запросы</p>
                        <ul className="home__popular-list">
                            {
                                config.popularItems.map((item, index) => <li key={index}><Link to={`${item.route}`}
                                                                                               className='home__popular-list-item'>{item.name}</Link>
                                </li>)
                            }
                        </ul>
                    </div>
                </div>
                <div className="home__appointment"></div>
                <div className="home__advantages"></div>
                <div className="home__best"></div>
                <div className="home__lastReviews"></div>
                <div className="home__blog"></div>
            </div>
        );
    }
}

export default connect(state => ({
    users: state.users
}))(Home)