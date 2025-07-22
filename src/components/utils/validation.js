import { z } from "zod";

// defining schema

export const measurementSchema = z.object({
  dbInput: z
    .string()
    .refine((val) => val === "" || !isNaN(Number(val)), {
      message: "Must be a number",
    })
    .refine(
      (val) => {
        if (val === "") return true;
        const num = Number(val);
        return num >= 10 && num <= 200;
      },
      {
        message: " range from 10 to 200",
      }
    ),
  expositionTime: z
    .string()
    .refine((val) => val === "" || !isNaN(Number(val)), {
      message: "Must be a number",
    })
    .refine(
      (val) => {
        if (val === "") return true;
        const num = Number(val);
        return num > 0 && num < 720;
      },
      {
        message: "range from 0.1 to 720",
      }
    ),
});
