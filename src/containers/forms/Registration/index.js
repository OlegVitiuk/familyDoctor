import React from 'react';
import PropTypes from 'prop-types';
//import { connect } from 'react-redux';
import { Field, propTypes, reduxForm, SubmissionError } from 'redux-form';
// import { FormattedMessage } from 'react-intl';
// import { handleLogin } from 'actions/user';
import fields from './config';

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
        const {history} = this.props;

        return (
            <div className="authorization-block">
                <form onSubmit={()=>{}}
                      className="authorization-form">
                    <div className="authorization-form__title">
                        Реєстрація
                    </div>
                    <div className="form__close" onClick={()=>history.push(`${history.location.pathname}`)} />
                    {fields.map(this.renderField)}
                    {this.props.error && (
                        <div className="authorization-form__error">Поле обов'язкове</div>
                    )}
                    <div>
                        <button type="submit" className="authorization-form__button"> Зареєструватись </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default (reduxForm({
    form: 'login',
})(Login));
