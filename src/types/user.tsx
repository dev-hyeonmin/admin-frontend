export interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: Date;
  branch: {
    id: number;
    name: string;
  };
}
