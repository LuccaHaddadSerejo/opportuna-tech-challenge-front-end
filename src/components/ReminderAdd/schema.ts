import { z } from "zod";

const validColors = ["blue", "red", "green", "yellow", "purple", "orange"];

export const schema = z.object({
  title: z
    .string()
    .min(1, { message: "The reminder must have a title" })
    .max(30, {
      message: "The reminder title can only have up to 30 characters",
    }),
  description: z
    .string()
    .min(1, { message: "The reminder must have a description" })
    .max(30, {
      message: "The reminder description can only have up to 30 characters",
    }),
  time: z.string().min(1, { message: "The reminder must have a time" }),
  city: z
    .string()
    .min(1, { message: "The reminder must have a city" })
    .max(15, {
      message: "The reminder city can only have up to 15 characters",
    }),
  color: z
    .string()
    .nullable()
    .refine(
      (value) => {
        return value !== null && validColors.includes(value);
      },
      {
        message: "The reminder must have a color",
      }
    ),
});

export type CreateReminder = z.infer<typeof schema>;
