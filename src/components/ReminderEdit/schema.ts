import { z } from "zod";

export const schema = z.object({
  title: z
    .string()
    .max(30, { message: "The reminder title can only have up to 30 caracters" })
    .optional(),
  description: z
    .string()
    .max(30, {
      message: "The reminder description can only have up to 30 caracters",
    })
    .optional(),
  time: z.string().optional(),
  date: z.string().optional(),
  city: z
    .string()
    .max(15, { message: "The reminder city can only have up to 15 caracters" })
    .optional(),
  color: z.string().optional(),
});

export type UpdateReminder = z.infer<typeof schema>;
