import React from 'react';
//import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
//import inputsForAddingTags from './config';

class Input extends React.Component {
  static propTypes = {
    input: PropTypes.object,
    label: PropTypes.string,
    meta: PropTypes.object,
    addTag: PropTypes.func,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    //intl: intlShape.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    input: {},
    label: '',
    meta: {},
    addTag: () => {},
    type: '',
    placeholder: '',
    className: '',
  };

  constructor({ props, intl }) {
    super(props);
    this.intl = intl;
    //this.intlPlaceholder = props && this.setPlaceholder(props.placeholder);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.placeholder &&
      this.props.placeholder !== nextProps.placeholder
    ) {
      this.intlPlaceholder = this.setPlaceholder(nextProps.placeholder);
    }
  }

  setPlaceholder = placeholder =>
    (placeholder ? this.intl.formatMessage({ id: placeholder }) : null);

  limitationForNumbers = (name) => {
    if (name === 'certainty') {
      return {
        min: 0,
        max: 100,
      };
    }
    return null;
  };

  render() {
    const {
      input, meta, addTag, type, className, label
    } = this.props;

    return (
      <div className="form-item">
        <div className={`${className
            ? `${className}_label`
            : `${meta.form}-form__label`}`}>
          {/*<FormattedMessage id={label || `forms.${className || meta.form}_${input.name}`} />*/}
            {input.name}
        </div>
        <div className="form__wrapper">
            <input {...input}
              {...this.limitationForNumbers(input.name)}
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
