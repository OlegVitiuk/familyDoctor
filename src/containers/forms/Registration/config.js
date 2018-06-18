import Input from '../../components/render/Input';
import DatePicker from '../../components/render/Date';
import {email, required, phoneNumber} from '../../../utils/formUtils';

const fields = [
    {
        name: 'name',
        label: 'Ім\'я',
        component: Input,
        type: 'text',
        placeholder: 'lawyer@example.com',
        validate: [required],
    },
    {
        name: 'surname',
        label: 'Прізвище',
        component: Input,
        type: 'text',
        placeholder: 'lawyer@example.com',
        validate: [required],
    },
    {
        name: 'middleName',
        label: 'По-батькові',
        component: Input,
        type: 'text',
        placeholder: '',
        validate: [required],
    },
    {
        name: 'birthday',
        label: 'День народження',
        component: DatePicker,
        validate: [required],
    },
    {
        label: 'email',
        name: 'email',
        component: Input,
        type: 'text',
        placeholder: 'lawyer@example.com',
        validate: [required, email],
    },
    {
        name: 'password',
        label: 'Пароль',
        component: Input,
        type: 'password',
        placeholder: 'password',
        validate: [required],
    },
    {
        name: 'telephone',
        label: 'Телефон',
        component: Input,
        type: 'tel',
        placeholder: 'telephone',
        validate: [required, phoneNumber],
    },
];

export default fields;