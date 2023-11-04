
export const generateRandomString = () => {
  return Date.now() + "-" + Math.round(Math.random() * 1E9);
};