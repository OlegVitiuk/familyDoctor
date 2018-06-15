import React from 'react';
import PropTypes from 'prop-types';
import {arrayPush} from 'redux-form';
import 'react-datepicker/dist/react-datepicker.css';
import {getAppoinments} from "api/doctor";
import timeLine from './config';
import CheckBox from './../CheckBox';

export default class TimeSheet extends React.Component {
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
            getAppoinments(data).then((data) => {
                this.setState(() => ({
                    blockedTimelines: data
                }));
            });
        }
    }

    addNewAppoinment = (label) => {
        const {meta, input} = this.props;
        meta.dispatch(arrayPush(meta.form, input.name, label));
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
                            timeLine.map((item) => (
                                <CheckBox key={Symbol(item).toString()}
                                          booked={this.state.blockedTimelines.includes(item)} label={item}
                                          addNewAppoinment={this.addNewAppoinment}/>
                            ))
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
