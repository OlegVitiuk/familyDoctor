import Input from 'containers/components/render/Input';
import { email, required } from 'utils/formUtils';

const fields = [
    {
        name: 'email',
        label: 'Пошта',
        component: Input,
        type: 'text',
        placeholder: 'lawyer@example.com',
        validate: [required, email],
        className: '',
    },
    {
        name: 'password',
        label: 'Пароль',
        component: Input,
        type: 'password',
        placeholder: 'password',
        validate: [required],
        className: '',
    },
];

export default fields;