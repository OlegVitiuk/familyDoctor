import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import {change} from 'redux-form';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

export default class Date extends React.Component {
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
        initialDate: null,
        disabled: false,
        date: '',
    };

    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        const {input, meta, initialDate} = this.props;
        const date = initialDate || moment();
        this.setState(() => ({date}));
        meta.dispatch(change(meta.form, input.name, date.format('DD.MM.YYYY')));
    }

    componentWillReceiveProps(nextProps) {
        if (
            this.props.meta.initial !== nextProps.meta.initial &&
            nextProps.meta.initial
        ) {
            const {input, meta} = nextProps;
            const date = moment.unix(meta.initial);
            this.setState(() => ({date}));
            meta.dispatch(change(meta.form, input.name, date.format('DD.MM.YYYY')));
        }
    }

    handleChange(date) {
        const {input, meta} = this.props;
        this.setState(() => ({date}));
        meta.dispatch(change(meta.form, input.name, date.format('DD.MM.YYYY')));
    }

    render() {
        const {input, meta, disabled} = this.props;
        return (
            <div className="form-item">
                <div className={`${meta.form}-form__label`}>
                    {input.label}
                </div>
                <div className="form__wrapper">
                    <DatePicker {...input}
                                disabled={disabled}
                                onChange={this.handleChange}
                                selected={this.state.date}
                                className={`${meta.form}-form__input ${meta.form}-form__input_${input.name}`}/>
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
