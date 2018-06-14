import DatePicker from "../../components/render/Date";
import TimePicker from "../../components/render/Time";
import {required} from "../../../utils/formUtils";

const fields = [
    {
        name: 'visitDate',
        label: 'Дата візиту',
        component: DatePicker,
        validate: [required],
        appoinment: true
    },
    {
        name: 'visitTime',
        label: 'Час візиту',
        component: TimePicker,
        validate: [required],
    }
];

export default fields;