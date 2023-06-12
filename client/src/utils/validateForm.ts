import * as yup from "yup";

// Validation Schema
export const LoginValidate = yup.object().shape({
  username: yup.string().trim().required("Username required"),
  password: yup
    .string()
    .trim()
    .required("Password required")
    .min(4, "The minimum must be 4 characters")
    .max(20, "The maximum must be 20 characters"),
});
// RegisterSchema
export const RegisterValidate = yup.object().shape({
  username: yup.string().trim().required("Username required"),
  password: yup
    .string()
    .trim()
    .required("Password required")
    .min(4, "The minimum must be 4 characters")
    .max(20, "The maximum must be 20 characters"),
});
