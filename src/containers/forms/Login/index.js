import React from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm, SubmissionError} from 'redux-form';
import fields from './config';
import {loginUser} from "api/user";
import {connect} from 'react-redux';
import {SET_CURRENT_USER} from "constants/index";
import jwt from 'jsonwebtoken';

class Login extends React.Component {
    static propTypes = {
        closeForm: PropTypes.func,
    };

    onSubmit = values => {
        const {history} = this.props;

        return loginUser(values).then(() => {
            const user = jwt.decode(localStorage.getItem('jwtToken'))
            this.props.dispatch({type: SET_CURRENT_USER, user});
            this.props.closeForm();
            history.push('/profile');
        }).catch(() => {
            throw new SubmissionError({_error: 'Невірний емейл або пароль'});
        });
    }

    renderField = (field, i) => <Field {...field} key={i}/>;

    render() {

        const {history} = this.props;

        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}
                  className="login-form">
                <div className="login-form__title">
                    Вхід
                </div>
                <div className="form__close" onClick={() => this.props.closeForm()}/>
                {fields.map(this.renderField)}
                {this.props.error && (
                    <div className="login-form__error">Невірний еmail або пароль</div>
                )}
                <div>
                    <button type="submit" className="login-form__btn"> Войти</button>
                </div>
            </form>
        );
    }
}

export default connect()(reduxForm({
    form: 'login',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(Login));
