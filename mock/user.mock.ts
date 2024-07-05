import { defineMock } from "vite-plugin-mock-dev-server";

const roles = ["admin", "user"];

const baseRoles = [
  {
    name: "page1",
    roleItemKey: "dashboard:page1",
  },
];

const adminRoles = [
  ...baseRoles,
  {
    name: "page2",
    roleItemKey: "dashboard:page2",
  },
  {
    name: "page3",
    roleItemKey: "dashboard:page3",
  },
];

export default defineMock({
  url: "/api/user",
  method: ["GET"],

  response(req, res) {
    const token = req.headers["authorization"];

    if (!token || !roles.includes(token)) {
      res.statusCode = 401;
      res.setHeader("Content-Type", "application/json");

      res.end(
        JSON.stringify({
          code: 401,
          message: "unauthorized",
        })
      );

      return;
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        code: 200,
        data: token === "admin" ? adminRoles : baseRoles,
      })
    );
  },
});
