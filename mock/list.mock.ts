import { defineMock } from "vite-plugin-mock-dev-server";

const roles = ["admin", "user"];

export default defineMock({
  url: "/api/list",
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
        data: "this is a list data",
      })
    );
  },
});
