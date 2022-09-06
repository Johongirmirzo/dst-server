import {object, string} from "yup";

export const loginSchema = object({
    email: string()
    .required("Email can't be empty")
    .email("Email must contain @"),
    password: string()
    .required("Password can't be empty")
    .min(5, "Minim required password chracters are 5")
    .max(25, "Maximum required password chracters are 25")
})