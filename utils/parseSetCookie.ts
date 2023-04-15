export const parseSetCookie = (setCookie: string[]): Record<string, string> => {
  const cookies: Record<string, string> = {};

  setCookie.forEach((cookie) => {
    const index = cookie.indexOf("=");

    if (index !== -1) {
      const key = cookie.substring(0, index);
      const value = cookie.substring(index + 1).split(";")[0];

      cookies[key] = value;
    }
  });

  return cookies;
};
