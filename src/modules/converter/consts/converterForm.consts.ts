import { z } from 'zod';

export const CONVERTER_FORM_SCHEMA = z.object({
  currencies: z
    .object({
      platinum: z.number().nonnegative(),
      gold: z.number().nonnegative(),
      electrum: z.number().nonnegative(),
      silver: z.number().nonnegative(),
      copper: z.number().nonnegative(),
    })
    .refine((data) => Object.values(data).some((value) => value > 0), {
      message: 'You need to fill at least one currency field',
    }),
  partySize: z.number().positive('Party size must be greater than 0'),
  excludeElectrum: z.boolean(),
});

export type ConverterFormData = z.infer<typeof CONVERTER_FORM_SCHEMA>;
