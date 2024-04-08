import { z } from "zod";

export const schema = z.object({
  title: z
    .string()
    .min(1, { message: "The reminder must have a title" })
    .max(30, { message: "The reminder can only have up to 30 caracters" }),
  description: z
    .string()
    .min(1, { message: "The reminder must have a description" })
    .max(30, { message: "The reminderCan only have up to 30 caracters" }),
  time: z.string().min(1, { message: "The reminder must have a time" }),
  city: z
    .string()
    .min(1, { message: "The reminder must have a city" })
    .max(15, { message: "The reminder can only have up to 15 caracters" }),
  color: z.string(),
});

export type CreateReminder = z.infer<typeof schema>;
