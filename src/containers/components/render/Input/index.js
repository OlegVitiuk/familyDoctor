import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
  static propTypes = {
    input: PropTypes.object,
    label: PropTypes.string,
    meta: PropTypes.object,
    addTag: PropTypes.func,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    className: PropTypes.string,
  };

  static defaultProps = {
    input: {},
    label: '',
    meta: {},
    type: '',
    placeholder: '',
    className: '',
  };

  render() {
    const {
      input, meta, addTag, type, className,label
    } = this.props;

    return (
      <div className="form-item">
        <div className={`${className
            ? `${className}_label`
            : `${meta.form}-form__label`}`}>
          {/*<FormattedMessage id={label || `forms.${className || meta.form}_${input.name}`} />*/}
            {label}
        </div>
        <div className="form__wrapper">
            <input {...input}
              type={type}
              className={`${className
                ? `${className}_input`
                : `${meta.form}-form__input ${meta.form}-form__input_${input.name}`}`}
              onKeyPress={e => addTag && addTag(e)} />
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

export default Input;
