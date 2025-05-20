export type EventItem = {
  title: string;
  description?: string;
  originalPrice?: number | null;
  salePrice?: number | null;
};

export type EventFormData = {
  title?: string;
  description?: string;
  imageUrl?: File | null;
  startDate?: string;
  endDate?: string;
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
