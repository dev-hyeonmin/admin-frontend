export type FieldErrors<T> = Partial<Record<keyof T, string[]>>;

export type ActionResult<T> = {
  success: boolean;
  error?: FieldErrors<T> & {
    formErrors?: string[];
  };
  data?: T;
} | null;
