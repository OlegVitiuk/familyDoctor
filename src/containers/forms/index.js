import React from 'react';
import PropTypes from 'prop-types';
import Login from './Login';
import Registration from './Registration';
import Appoinment from './Appoinment';
import {history} from '../../stores/store';

export default class FormsContainer extends React.Component{
    constructor(props){
        super(props);

        this.forms ={
            login: <Login closeForm={this.closeForm} history={history}/>,
            registration: <Registration closeForm={this.closeForm}/>,
            appoinment: <Appoinment closeForm={this.closeForm}/>
        }
    }

    closeForm = () =>{
        history.push(`${history.location.pathname}`);
    }

    render(){
        if(history.location.hash.length) {
            const activeForm = history.location.hash.slice(1);

            return (
                <div className="file-form__blackout">
                    {this.forms[activeForm]}
                </div>
            );
        }
        return null;
    }
}