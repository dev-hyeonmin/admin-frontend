export const STEPS = {
  GROUP_FORM: 1,
  ITEM_FORM: 2,
} as const;

export type Step = (typeof STEPS)[keyof typeof STEPS];

export type EventGroup = {
  id: number;
  title: string;
  image_url?: string | null;
  start_date: Date;
  end_date?: Date | null;
  order: number;
  created_at: Date;
};

export type EventItem = {
  title: string;
  description?: string | null;
  originalPrice?: number | null;
  salePrice: number | null;
};

export type EventFormData = {
  title?: string;
  description?: string | null;
  imageUrl?: File | null;
  startDate?: string;
  endDate?: string | null;
  items?: EventItem[];
};

export type EventGroupFormErrors = {
  title?: string[];
  startDate?: string[];
  endDate?: string[];
  imageUrl?: string[];
};

export type EventItemFormErrors = {
  title?: string[];
  description?: string[];
  originalPrice: string[] | null;
  salePrice: string[] | null;
};
