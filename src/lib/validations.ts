import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .union([z.literal(""), z.string().min(10, "Please enter a valid phone number")])
    .optional(),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

/** Quote-style contact page form */
export const contactQuoteSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.union([
    z.literal(""),
    z.string().min(10, "Please enter a valid phone number"),
  ]),
  message: z.string().min(10, "Please tell us about your project"),
  services: z
    .array(z.string())
    .min(1, "Please select at least one service"),
});

export type ContactQuoteValues = z.infer<typeof contactQuoteSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type NewsletterFormValues = z.infer<typeof newsletterSchema>;
