import * as z from "zod";

export const Address = z.string().regex(/^0x[0-9a-fA-F]{40}$/);

export type Address = z.infer<typeof Address>;
