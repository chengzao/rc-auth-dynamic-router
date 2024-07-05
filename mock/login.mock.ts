import { defineMock } from "vite-plugin-mock-dev-server";

const roles = ["admin", "user"];

export default defineMock({
  url: "/api/login",
  method: ["POST"],
  response(req, res) {
    const { body } = req;

    if (!body) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");

      res.end(
        JSON.stringify({
          code: 400,
          message: "参数不对",
        })
      );
      return;
    }

    const { username } = body;

    if (!roles.includes(username)) {
      res.statusCode = 401;
      res.setHeader("Content-Type", "application/json");

      res.end(
        JSON.stringify({
          code: 401,
          message: "没有权限",
        })
      );
      return;
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");

      res.end(
        JSON.stringify({
          code: 200,
          token: username === "admin" ? "admin" : "user",
        })
      );
    }
  },
});
