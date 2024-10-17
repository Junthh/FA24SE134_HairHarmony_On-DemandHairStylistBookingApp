import * as Yup from 'yup';

export interface AuthKeys {
  phoneNumber: string;
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
  phoneNumber: { propertyLabel: 'Phone Number', propertyName: 'phoneNumber' },
  password: { propertyLabel: 'Password', propertyName: 'password' },
  confirmPassword: { propertyLabel: 'Confirm Password', propertyName: 'confirmPassword' },
};

// Form model
export const registerFormDefaultValues = {
  [authProps.phoneNumber.propertyName]: '',
  [authProps.password.propertyName]: '',
  [authProps.confirmPassword.propertyName]: '',
};

export const loginFormDefaultValues = {
  [authProps.phoneNumber.propertyName]: '',
  [authProps.password.propertyName]: '',
};

// Schema Validator
export const registerSchema = () => {
  return Yup.object().shape<any>({
    // Email
    [authProps.phoneNumber.propertyName]: Yup.string()
      .required(`Phone number is required.`)
      .email('Your phone number is invalid format.'),

    // Password
    [authProps.password.propertyName]: Yup.string().required(`Password is required.`),

    // Confirm Password
    [authProps.confirmPassword.propertyName]: Yup.string()
      .oneOf([Yup.ref(authProps.password.propertyName), null], 'Passwords must match')
      .required(`Confirm password is required.`),
  });
};

export const loginSchema = () => {
  return Yup.object().shape<any>({
    // Email
    [authProps.phoneNumber.propertyName]: Yup.string().required(`Phone number is required.`),

    // Password
    [authProps.password.propertyName]: Yup.string().required(`Password is required.`),
  });
};
