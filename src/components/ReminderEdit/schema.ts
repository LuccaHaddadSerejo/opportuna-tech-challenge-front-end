import { z } from "zod";

const validColors = ["blue", "red", "green", "yellow", "purple", "orange"];

export const schema = z.object({
  time: z.string().min(1, { message: "The reminder must have a time" }),
  date: z.string().min(1, { message: "The reminder must have a date" }),
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

export type UpdateReminder = z.infer<typeof schema>;
