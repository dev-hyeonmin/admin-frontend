import { z } from 'zod';
import { ActionResult } from '@/types/action';

type ValidatedActionFunction<S extends z.ZodType<any, any>, T> = (
  data: z.infer<S>,
  formData: FormData
) => Promise<ActionResult<T>>;

export function validatedAction<S extends z.ZodType<any, any>, T>(
  schema: S,
  action: ValidatedActionFunction<S, T>
) {
  return async (prevState: any, formData: FormData): Promise<ActionResult<T>> => {
    const rawData = Object.fromEntries(formData);
    const result = await schema.safeParseAsync(rawData);

    if (!result.success) {
      return {
        success: false,
        error: {
          ...result.error.flatten().fieldErrors as Partial<Record<keyof T, string[]>>,
          formErrors: []
        },
        data: rawData as T,
      };
    }

    return action(result.data, formData);
  };
}
