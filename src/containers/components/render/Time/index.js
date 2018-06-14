import React from 'react';
import PropTypes from 'prop-types';
import {formValueSelector} from 'redux-form';
import 'react-datepicker/dist/react-datepicker.css';
import {connect} from "react-redux";
import {getTimeSheetByDate} from "api/clinics";

class TimeSheet extends React.Component {
    static propTypes = {
        input: PropTypes.object,
        meta: PropTypes.object,
        date: PropTypes.string,
        initialDate: PropTypes.string,
        disabled: PropTypes.bool,
    };

    static defaultProps = {
        input: {},
        meta: {},
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.date !== nextProps.date)
            getTimeSheetByDate(nextProps.date).then((data) => {
                console.log(data);
            });
    }

    render() {
        const {input, meta, disabled} = this.props;
        return (
            <div className="form-item">
                <div className={`${meta.form}-form__label`}>
                    {input.label}
                </div>
                <div className="form__wrapper">
                    <div className='timeSheet'>

                    </div>
                    {meta.touched &&
                    meta.error && (
                        <div className={`${meta.form}-form__input-error`}>
                            {meta.error}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const selector = formValueSelector('appoinment');
export default connect(state => ({
    date: selector(state, 'visitDate'),
}))(TimeSheet)
