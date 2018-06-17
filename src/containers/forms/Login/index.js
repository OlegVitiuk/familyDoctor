import React from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm, SubmissionError} from 'redux-form';
import fields from './config';
import {loginUser} from "api/user";
import {connect} from 'react-redux';
import {SET_AUTHORIZATON, SET_USER} from "constants/index";
import {setAuthorizationToken} from "utils/index";
import {getUserInfo} from "api/user";

class Login extends React.Component {
    static propTypes = {
        closeForm: PropTypes.func,
    };

    onSubmit = values => {
        const {history,dispatch} = this.props;

        return loginUser(values).then((res) => {
            const {token} = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthorizationToken(token);
            getUserInfo(token).then((user) => {
                dispatch({type: SET_USER, user});
                dispatch({type: SET_AUTHORIZATON, user});
            }).then(() => {
                this.props.closeForm();
                history.push('/profile')
            }).catch(() => this.props.closeForm());
        }).catch(() => {
            throw new SubmissionError({_error: 'Невірний емейл або пароль'});
        });
    }

    renderField = (field, i) => <Field {...field} key={i}/>;

    render() {

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
