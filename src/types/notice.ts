export type Notice = {
  id: number;
  title: string;
  content?: string | null;
  image_url?: string | null;
  is_pinned?: boolean | null;
  created_at: Date;
  updated_at: Date;
};
