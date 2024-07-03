import { defineMock } from "vite-plugin-mock-dev-server";

export default defineMock({
  url: "/api/login",
  method: ["POST"],
  body(request) {
    const { username } = request.body;

    if (username === "admin") {
      return {
        code: 200,
        token: "admin",
      };
    }

    return {
      code: 200,
      token: "user",
    };
  },
});
