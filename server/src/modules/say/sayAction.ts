import type { RequestHandler } from "express";

const sayActions: RequestHandler = (req, res) => {
  res.send("Welcome to Wild Series !");
};

export default { sayActions };
