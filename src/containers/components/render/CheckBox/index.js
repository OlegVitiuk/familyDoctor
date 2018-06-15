import React from 'react';
import PropTypes from 'prop-types';

export default class Checkbox extends React.Component {
    static defaultProps = {
      label: ''
    };

    static propTypes = {
        label: PropTypes.string.isRequired,
        addNewAppoinment: PropTypes.func.isRequired
    };

    state = {
        isChecked: false,
    }

    toggleCheckbox = () => {
        const {addNewAppoinment, label} = this.props;
        this.setState(({ isChecked }) => (
            {
                isChecked: !isChecked,
            }
        ));
        addNewAppoinment(label);
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