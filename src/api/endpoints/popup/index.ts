import {apiClient} from "@/api/apiClient.ts";


export const getPopups = async () => {
  const response = await apiClient.get("/popups");
  return response.data;
};

export const createPopups = async (data: { title: string; image: string }) => {
  const response = await apiClient.post("/popups", data, {
    headers: {
      "Content-Type": "multipart/form-data", // 파일 전송을 위한 헤더 설정
    }
  });
  return response.data;
};
