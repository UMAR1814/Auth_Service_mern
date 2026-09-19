import { checkSchema } from 'express-validator';

export const registerValidator = checkSchema({
    email: {
        errorMessage: 'Invalid email address',
        notEmpty: true,
    },
});
// export const registerValidator = [
//     body('email').isEmail().withMessage('Invalid email address'),
// ]
