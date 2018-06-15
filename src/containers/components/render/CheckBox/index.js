import React from 'react';
import PropTypes from 'prop-types';

export default class Checkbox extends React.Component {
    static defaultProps = {
      label: ''
    };

    static propTypes = {
        label: PropTypes.string.isRequired,
    };

    state = {
        isChecked: false,
    }

    toggleCheckbox = () => {
        this.setState(({ isChecked }) => (
            {
                isChecked: !isChecked,
            }
        ));
    }

    render() {
        const { label,booked } = this.props;
        const { isChecked } = this.state;

        return (
            <div className="checkbox">
                <label>
                    <input
                        type="checkbox"
                        value={label}
                        checked={!!(isChecked || booked)}
                        disabled={booked}
                        onChange={this.toggleCheckbox}
                    />
                    {label}
                </label>
            </div>
        );
    }
}