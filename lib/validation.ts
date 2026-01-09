import { z } from "zod";

export const patientSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    middleName: z.string().optional(),
    lastName: z.string().min(1, "Last name is required"),
    birthDate: z.string().min(1, "Date of birth is required"),
    gender: z.enum(["Male", "Female", "Other"]),
    phone: z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid phone number"),
    email: z.string().email("Invalid email address"),
    address: z.string().min(1, "Address is required"),
    preferredLanguage: z.string().min(1, "Preferred language is required"),
    nationality: z.string().min(1, "Nationality is required"),
    emergencyContactName: z.string().optional(),
    emergencyContactRelation: z.string().optional(),
    religion: z.string().optional(),
});

export type PatientFormData = z.infer<typeof patientSchema>;
