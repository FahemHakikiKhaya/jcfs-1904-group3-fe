import * as yup from "yup";

const RegisterSchema = yup.object().shape({
  username: yup.string().min(7).required("Username is required"),
  email: yup
    .string()
    .email("Email format is wrong")
    .required("Email is required"),
  password: yup.string().min(7).required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export default RegisterSchema;
