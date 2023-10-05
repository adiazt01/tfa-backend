import { z } from "zod";

export const registerSchema = z
  .object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email(),
    username: z
      .string({
        required_error: "Username is required",
      })
      .min(3),
    password: z.string("Password is required").min(6),
    confirmPassword: z.string("Confirm password is required").min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "The password don't match",
    path: ["confirmPassword"], 
  });

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({message: "Invalid email"}),
  password: z.string("Password is required").min(6, {
    message: "The password must be greater than 6 digits"
  }),
});
