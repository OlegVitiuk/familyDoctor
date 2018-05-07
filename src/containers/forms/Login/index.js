import React from 'react';
import PropTypes from 'prop-types';
//import { connect } from 'react-redux';
import { Field, propTypes, reduxForm, SubmissionError } from 'redux-form';
// import { FormattedMessage } from 'react-intl';
// import { handleLogin } from 'actions/user';
import fields from './Login/config';

class Login extends React.Component {
    static propTypes = {
        ...propTypes,
        history: PropTypes.object,
        //activeRequest: PropTypes.string,
    };

    // onSubmit = (values, dispatch) =>
    //     dispatch(handleLogin(values)).then(
    //         () => this.props.history.push('/'),
    //         () => {
    //             throw new SubmissionError({ _error: 'login.error' });
    //         }
    //     );

    renderField = (field, i) => <Field {...field} key={i} />;

    render() {
        if (this.props.activeRequest === '/login') {
            return (
                <div className="authorization-block">
                    <div className="authorization-form">
                        <div className="loader" />
                    </div>
                </div>
            );
        }

        return (
            <div className="authorization-block">
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}
                      className="authorization-form">
                    <div className="authorization-form__title">
                         Вхід
                    </div>
                    {fields.map(this.renderField)}
                    {this.props.error && (
                        <div className="authorization-form__error">Поле обов'язкове</div>
                    )}
                    <div>
                        <button type="submit" className="authorization-form__button"> Ввойти </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default (reduxForm({
    form: 'login',
})(Login));
