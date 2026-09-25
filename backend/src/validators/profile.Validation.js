import { z } from "zod"

const profileSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Name cannot be empty"),

    email: z
        .string()
        .trim()
        .email("Invalid email format"),

    phone: z
        .string()
        .trim()
        .min(1, "Phone cannot be empty"),

    address: z
        .string()
        .trim()
        .min(1, "Address cannot be empty"),

    age: z
        .number()
        .positive("Age must be a positive number")
        .int("Age must be an integer")
});

const validateProfile = (req, res, next) => {
    const result = profileSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: result.error.flatten().fieldErrors
        });
    }

    req.ValidatedData = result.data;

    next();
};

export {
    validateProfile
};