import isEmail from 'validator/lib/isEmail';

export const email = value =>
    (value && isEmail(value) ? undefined : "Неправильний e-mail");

export const required = value =>
    (value ? undefined : 'Поле обов\'язкове');

export const phoneNumber = value =>
    (value && !/^(\+?([0-9]){10,12})$/.test(value) ? 'Неправильний номер телефону!' : (
        undefined
    ));