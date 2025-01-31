import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:3000/api/", // API 기본 URL
  timeout: 10000, // 요청 타임아웃 (10초)
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 (ex: 토큰 추가)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (ex: 에러 처리)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized! Redirecting to login...");
      // 로그아웃 처리 or 로그인 페이지로 이동 가능
    }
    return Promise.reject(error);
  }
);
