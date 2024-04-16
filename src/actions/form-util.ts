import {z} from "zod";

export const stripeProductForm = z.object({
    active: z.boolean().default(true),
    name: z.string().default("")
});

export const stripePriceForm = z.object({
    active: z.boolean().default(true),
    lookupKey: z.string().default("")
});