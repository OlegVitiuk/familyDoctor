import React from 'react';
import PropTypes from 'prop-types';
import { Field, propTypes, reduxForm, SubmissionError } from 'redux-form';
import fields from './config';
import {loginUser} from "api/user";

class Login extends React.Component {
    static propTypes = {
        closeForm: PropTypes.func,
    };

    onSubmit = values => {
        loginUser(values);
    }

    renderField = (field, i) => <Field {...field} key={i} />;

    render() {

        const {history} = this.props;

        return (
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}
                      className="login-form">
                    <div className="login-form__title">
                         Вхід
                    </div>
                    <div className="form__close" onClick={()=>this.props.closeForm()} />
                    {fields.map(this.renderField)}
                    {this.props.error && (
                        <div className="login-form__error">Поле обов'язкове</div>
                    )}
                    <div>
                        <button type="submit" className="login-form__btn"> Ввойти </button>
                    </div>
                </form>
        );
    }
}

export default (reduxForm({
    form: 'login',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(Login));
