import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup.string().required("Name is required."),
  email: yup
    .string()
    .required("Email is required.")
    .email("Must be a valid email address.")
    .matches(/@stud.noroff.no$/, "Email must end with @stud.noroff.no"),
  password: yup
    .string()
    .required("Password is required.")
    .min(8, "Password must have at least 8 characters."),
  avatar: yup.string().url("Must be a valid URL."),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required.")
    .email("Must be a valid email address.")
    .matches(/@stud.noroff.no$/, "Email must end with @stud.noroff.no"),
  password: yup.string().required("Password is required."),
});
