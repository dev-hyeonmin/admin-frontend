export const STEPS = {
  GROUP_FORM: 1,
  ITEM_FORM: 2,
} as const;

export type Step = (typeof STEPS)[keyof typeof STEPS]; 