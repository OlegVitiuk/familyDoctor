import React from 'react';
import PropTypes from 'prop-types';
import {Field, propTypes, reduxForm} from 'redux-form';
import fields from './config';
import {registerNewUser} from 'api/user';

class Registration extends React.Component {
    static propTypes = {
        ...propTypes,
        closeForm: PropTypes.func,
    };

    onSubmit = values => {
        registerNewUser(values).catch(res => console.log(res));
        this.props.closeForm();
    }

    renderField = (field, i) => <Field {...field} key={i}/>;

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}
                  className="registration-form">
                <div className="registration-form__title">
                    Реєстрація
                </div>
                <div className="form__close" onClick={() => this.props.closeForm()}/>
                {fields.map(this.renderField)}
                {this.props.error && (
                    <div className="registration-form__error">Поле обов'язкове</div>
                )}
                <div>
                    <button type="submit" className="registration-form__btn"> Зареєструватись</button>
                </div>
            </form>
        );
    }
}

export default (reduxForm({
    form: 'registration'
})(Registration));
