export const parseSetCookie = (setCookie: string[]): Record<string, string> => {
  const cookies: Record<string, string> = {};

  setCookie.forEach((cookie) => {
    const index = cookie.indexOf("=");

    if (index !== -1) {
      const firstPart = cookie.substring(0, index);
      const secondPart = cookie.substring(index + 1);

      cookies[firstPart] = secondPart;
    }
  });

  return cookies;
};
