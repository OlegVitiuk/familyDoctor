import Input from '../../components/render/Input';
import DatePicker from '../../components/render/Date';
import {email, required, phoneNumber} from '../../../utils/formUtils';

const fields = [
    {
        name: 'Ім\'я',
        component: Input,
        type: 'text',
        placeholder: 'lawyer@example.com',
        validate: [required, email],
    },
    {
        name: 'Прізвище',
        component: Input,
        type: 'text',
        placeholder: 'lawyer@example.com',
        validate: [required, email],
    }, {
        name: 'День народження',
        component: DatePicker,
        validate: [required],
    },
    {
        name: 'email',
        component: Input,
        type: 'text',
        placeholder: 'lawyer@example.com',
        validate: [required, email],
    },
    {
        name: 'Пароль',
        component: Input,
        type: 'password',
        placeholder: 'password',
        validate: [required],
    },
    {
        name: 'Телефон',
        component: Input,
        type: 'password',
        placeholder: 'password',
        validate: [required, phoneNumber],
    },
];

export default fields;