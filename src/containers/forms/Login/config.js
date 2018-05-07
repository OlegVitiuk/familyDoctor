import Input from 'components/render/Input';
import { email, required } from 'utils/formUtils';

const fields = [
    {
        name: 'email',
        component: Input,
        type: 'text',
        placeholder: 'lawyer@example.com',
        validate: [required, email],
        className: '',
    },
    {
        name: 'password',
        component: Input,
        type: 'password',
        placeholder: 'password',
        validate: [required],
        className: '',
    },
];

export default fields;