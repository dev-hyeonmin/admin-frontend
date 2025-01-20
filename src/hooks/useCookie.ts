// 쿠키 설정
export const setCookie = (name: string, value: any, days: number) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
};

// 쿠키 가져오기
export const getCookie = (name: string) => {
  const nameEQ = `${name}=`;
  const cookies = document.cookie.split('; ');
  for (let i = 0; i < cookies.length; i++) {
    if (cookies[i].startsWith(nameEQ)) {
      return cookies[i].substring(nameEQ.length);
    }
  }
  return null;
};

// 쿠키 삭제
export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
