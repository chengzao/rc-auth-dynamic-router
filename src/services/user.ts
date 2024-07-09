import httpServer from "@/helper/http";

export const getUserInfo = () => {
  return httpServer.get("/api/user");
};

export const fetchLogin = (payload: any) => {
  return httpServer.post("/api/login", payload);
};

export const fetchList = () => {
  return httpServer.get("/api/list");
};
