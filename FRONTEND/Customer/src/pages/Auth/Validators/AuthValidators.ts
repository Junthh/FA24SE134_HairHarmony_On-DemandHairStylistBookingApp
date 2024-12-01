import * as Yup from 'yup';

export interface AuthKeys {
  phoneNumber: string;
  fullName: string;
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
  phoneNumber: { propertyLabel: 'phoneNumber', propertyName: 'phoneNumber' },
  fullName: { propertyLabel: 'fullName', propertyName: 'fullName' },
  password: { propertyLabel: 'Password', propertyName: 'password' },
  confirmPassword: { propertyLabel: 'Confirm Password', propertyName: 'confirmPassword' },
};

// Form model
export const registerFormDefaultValues = {
  [authProps.phoneNumber.propertyName]: '',
  [authProps.fullName.propertyName]: '',
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
    // phoneNumber
    [authProps.phoneNumber.propertyName]: Yup.string()
      .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, 'Số điện thoại không đúng định dạng')
      .required(`Vui lòng nhập số điện thoại.`),

    // fullName
    [authProps.fullName.propertyName]: Yup.string().required(`Vui lòng nhập họ tên.`),

    // Password
    [authProps.password.propertyName]: Yup.string().required(`Vui lòng nhập mật khẩu.`),

    // Confirm Password
    [authProps.confirmPassword.propertyName]: Yup.string()
      .oneOf(
        [Yup.ref(authProps.password.propertyName), null],
        'Mật khẩu phải phù hợp với mật khẩu đã nhập',
      )
      .required(`Vui lòng nhập lại mật khẩu.`),
  });
};

export const loginSchema = () => {
  return Yup.object().shape<any>({
    // Email
    [authProps.phoneNumber.propertyName]: Yup.string().required(`Vui lòng nhập số điện thoại.`),

    // Password
    [authProps.password.propertyName]: Yup.string().required(`Vui lòng nhập mật khẩu.`),
  });
};
