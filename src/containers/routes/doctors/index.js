import React from 'react';
import Doctor from '../../components/Doctor/index';
import './_index.scss';

export default class Doctors extends React.Component {

    render() {
        return (
            <div className='doc__list'>
                <h1 className="doc__list-title">Врачи в Киеве</h1>
                <Doctor />
            </div>
        );
    }
}