import React from 'react';
import PropTypes from 'prop-types';
import {formValueSelector} from 'redux-form';
import 'react-datepicker/dist/react-datepicker.css';
import {connect} from "react-redux";
import {getTimeSheetByDate} from "api/doctor";
import timeLine from './config';
import CheckBox from './../CheckBox';

class TimeSheet extends React.Component {
    static propTypes = {
        input: PropTypes.object,
        meta: PropTypes.object,
        disabled: PropTypes.bool,
        appoinmentDoctor: PropTypes.string
    };

    static defaultProps = {
        input: {},
        meta: {},
    };

    state = {
        blockedTimelines: []
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.date !== nextProps.date) {
            const data = {
                date: nextProps.date,
                id: nextProps.appoinmentDoctor
            };
            getTimeSheetByDate(data).then((data) => {
                this.setState(() => ({
                    blockedTimelines: data
                }));
            });
        }
    }

    render() {
        const {input, meta} = this.props;
        return (
            <div className="form-item">
                <div className={`${meta.form}-form__label`}>
                    {input.label}
                </div>
                <div className="form__wrapper">
                    <div className='timeSheet'>
                        {
                            timeLine.map((item) => {
                                if (this.state.blockedTimelines.includes(item)) {
                                    return <CheckBox key={Symbol(item).toString()} booked={true} label={item}/>;
                                }
                                return <CheckBox key={Symbol(item).toString()} label={item}/>;
                            })
                        }
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
    appoinmentDoctor: state.doctor.appoinmentDoctor
}))(TimeSheet)
