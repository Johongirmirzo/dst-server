import {object, string, ref} from "yup";

export const registerSchema = object({
    username: string()
    .required("Username can't be empty")
    .min(2, "Minimum required username characters are 2")
    .max(25, "Maximum allowed username characters are 25"),
    email: string()
    .required("Email can't be empty")
    .email("Email must contain @")
    .min(5, "Minimum required email characters are 5")
    .max(35, "Maximum allowed email characters are 35"),
    password: string()
    .required("Password can't be empty'")
    .min(5, "Minimum required password characters are 5")
    .max(20, "Maximum allowed password characters are 20"),
    confirmPassword: string()
    .oneOf([ref("password"), null], "Passwords must match")
})
