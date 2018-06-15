import React from 'react';
import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';
import {change,touch} from 'redux-form';
import PropTypes from 'prop-types';


export default class Select extends React.Component {

    state = {
        value: ''
    }

    handleChange = (option) => {
        const {input, meta, items} = this.props;
        this.setState(() => ({
            value: option
        }));
        meta.dispatch(change(meta.form, input.name, option.value));
    }

    render() {
        const {input, meta, items} = this.props;
        return (
            <div className="form-item">
                <div className={`${meta.form}-form__label`}>
                    {input.label}
                </div>
                <div className="form__wrapper">
                    <ReactSelect {...input}
                                 onChange={this.handleChange}
                                 onBlur={() => meta.dispatch(touch(meta.form, input.name))}
                                 options={items}
                                 value={this.state.value}
                                 placeholder='Оберіть клініку'
                                 className={`${meta.form}-form__input ${meta.form}-form__input_${input.name}`}/>
                    {meta.touched &&
                    meta.error && (
                        <div className={`${meta.form}-form__input-error`}>{meta.error}</div>
                    )}
                </div>
            </div>
        )
    }
};

Select.propTypes = {
    input: PropTypes.object,
    meta: PropTypes.object,
    items: PropTypes.arrayOf(PropTypes.object),
    values: PropTypes.arrayOf(PropTypes.object),
    changeValue: PropTypes.func
};

Select.defaultProps = {
    input: {},
    meta: {},
    items: [],
    values: []
};
