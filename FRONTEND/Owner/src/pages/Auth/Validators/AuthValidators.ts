import * as Yup from 'yup';

export interface AuthKeys {
    email: string;
    password: string;
    confirmPassword: string;
}

type AuthProps = {
    [key in keyof AuthKeys]: {
        propertyLabel: string;
        propertyName: string;
    };
};

export const authProps: AuthProps = {
    email: { propertyLabel: 'Email Address', propertyName: 'email' },
    password: { propertyLabel: 'Password', propertyName: 'password' },
    confirmPassword: { propertyLabel: 'Confirm Password', propertyName: 'confirmPassword' },
};

// Form model
export const registerFormDefaultValues = {
    [authProps.email.propertyName]: '',
    [authProps.password.propertyName]: '',
    [authProps.confirmPassword.propertyName]: '',
};

export const loginFormDefaultValues = {
    [authProps.email.propertyName]: '',
    [authProps.password.propertyName]: '',
};

// Schema Validator
export const registerSchema = () => {
    return Yup.object().shape<any>({
        // Email
        [authProps.email.propertyName]: Yup.string()
            .required(`Email is required.`)
            .email('Your email is invalid format.'),

        // Password
        [authProps.password.propertyName]: Yup.string()
            .required(`Password is required.`),

        // Confirm Password
        [authProps.confirmPassword.propertyName]: Yup.string()
            .oneOf([Yup.ref(authProps.password.propertyName), null], 'Passwords must match')
            .required(`Confirm password is required.`),
    });
};

export const loginSchema = () => {
    return Yup.object().shape<any>({
        // Email
        [authProps.email.propertyName]: Yup.string().required(`Username is required.`),

        // Password
        [authProps.password.propertyName]: Yup.string()
            .required(`Password is required.`),
    });
};
