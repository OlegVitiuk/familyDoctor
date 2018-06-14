import React from 'react';
import PropTypes from 'prop-types';
import {Field, propTypes, reduxForm} from 'redux-form';
import fields from './config'


class Appoinment extends React.Component {

    componentWillMount(){
    }

    renderField = (field, i) => <Field {...field} key={i}/>;

    onSubmit = values => {
        //registerNewUser(values).catch(res => console.log(res));
        this.props.closeForm();
    }

    render(){
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}
                  className="appoinment-form">
                <div className="appoinment-form__title">
                    Запис до лікаря
                </div>
                <div className="form__close" onClick={() => this.props.closeForm()}/>
                {fields.map(this.renderField)}
                {this.props.error && (
                    <div className="appoinment-form__error">Поле обов'язкове</div>
                )}
                <div>
                    <button type="submit" className="appoinment-form__btn"> Зареєструватись</button>
                </div>
            </form>
        );
    }

}

export default (reduxForm({
    form: 'appoinment'
})(Appoinment));