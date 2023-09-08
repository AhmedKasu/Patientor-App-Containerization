import * as Yup from 'yup';

const AddUserSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Name is required.'),
  email: Yup.string().email('Invalid email').required('Email is required.'),
  password: Yup.string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters')
    .max(30, 'Password must not exceed 30 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase char')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase char')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[@$!%*?&#]/, 'Password must contain at least one special char'),
});

export default AddUserSchema;
