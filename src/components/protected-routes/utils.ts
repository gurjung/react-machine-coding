export const isAuthenticated = () => {
  return JSON.parse(localStorage.getItem("isAuthenticated") || "false");
};

export const login = () => {
  return localStorage.setItem("isAuthenticated", JSON.stringify(true));
};
