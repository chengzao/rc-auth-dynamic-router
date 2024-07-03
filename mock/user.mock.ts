import { defineMock } from "vite-plugin-mock-dev-server";

export default defineMock({
  url: "/api/user",
  method: ["GET"],
  body(request) {
    const token = request.headers["authorization"];
    console.log("token", token);

    if (!token) {
      return {
        code: 401,
        data: [],
      };
    }

    if (token === "admin") {
      return {
        code: 200,
        data: [
          {
            name: "page1",
            roleItemKey: "dashboard:page1",
          },
          {
            name: "page2",
            roleItemKey: "dashboard:page2",
          },
          {
            name: "page3",
            roleItemKey: "dashboard:page3",
          },
        ],
      };
    }

    return {
      code: 200,
      data: [
        {
          name: "page1",
          roleItemKey: "dashboard:page1",
        },
      ],
    };
  },
});
