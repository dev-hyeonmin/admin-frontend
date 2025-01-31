import {apiClient} from "@/api/apiClient.ts";


export const getPopups = async () => {
  const response = await apiClient.get("/popups");
  return response.data;
};

export const createPopups = async (data: { title: string; image: string }) => {
  const response = await apiClient.post("/popups", data);
  return response.data;
};
