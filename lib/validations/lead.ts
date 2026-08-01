import { z } from "zod";

export const leadSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(200),
  email: z.string().trim().email("Enter a valid email address").max(320),
  message: z.string().trim().min(1, "Please tell us how we can help").max(5000),
  consent: z
    .boolean()
    .refine((v) => v === true, { message: "Consent is required to connect with us" }),
});

export type LeadInput = z.infer<typeof leadSchema>;
