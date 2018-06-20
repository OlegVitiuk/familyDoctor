import React from 'react';
import PropTypes from 'prop-types';
import {Field, formValueSelector, propTypes, reduxForm} from 'redux-form';
import {addAppoinment} from "api/doctor";
import TimePicker from "../../components/render/Time";
import DatePicker from "../../components/render/Date";
import Select from "../../components/render/Select";
import {required} from "../../../utils/formUtils";
import {connect} from "react-redux";
import {getUserInfo} from "api/user";
import store from "../../../stores/store";
import {SET_USER} from 'constants/index';

class Appoinment extends React.Component {

    static propsTypes = {
        appoinmentDoctor: PropTypes.string
    };

    getInfoForClinics = (clinicsId) => {
        const doctorClinics = this.props.clinics.filter((clinic) => clinicsId.includes(clinic._id));
        return doctorClinics.map((item) => (
                {
                    label: item.name,
                    value: item._id
                }
            )
        );
    }

    renderField = (field, i) => <Field {...field} key={i}/>;

    onSubmit = values => {
        const {appoinmentDoctor} = this.props;
        const data = {
            token: localStorage.getItem("jwtToken"),
            data: {
                doctorId: appoinmentDoctor._id,
                ...values
            }
        };
        addAppoinment(data).then(() => {
            getUserInfo(data.token).then((user) => {
                store.dispatch({type: SET_USER, user})
            });
        }).catch(res => console.log(res));
        this.props.closeForm();
    }

    render() {
        const {appoinmentDoctor} = this.props;
        const fields = [
            {
                name: 'clinicId',
                label: 'Клініка',
                component: Select,
                items: this.getInfoForClinics(appoinmentDoctor.clinics),
                validate: [required],
            },
            {
                name: 'date',
                label: 'Дата візиту',
                component: DatePicker,
                validate: [required],
                appoinment: true
            },
            {
                name: 'time',
                label: 'Час візиту',
                component: TimePicker,
                date: this.props.date,
                appoinmentDoctor: appoinmentDoctor._id,
                validate: [required],
            }
        ];
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}
                  className="appoinment-form">
                <div className="appoinment-form__title">
                    Запис до лікаря
                </div>
                <div className="form__close" onClick={() => this.props.closeForm()}/>
                {fields.map(this.renderField)}
                {this.props.error && (
                    <div className="appoinment-form__error">Поле обов'язкове</div>
                )}
                <div>
                    <button type="submit" className="appoinment-form__btn">Записатись!</button>
                </div>
            </form>
        );
    }

}

const selector = formValueSelector('appoinment');
export default connect(state => ({
    appoinmentDoctor: state.doctor.appoinmentDoctor,
    date: selector(state, 'date'),
    clinics: state.clinics
}))(reduxForm({
    form: 'appoinment'
})(Appoinment));