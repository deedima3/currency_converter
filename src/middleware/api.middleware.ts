import express from "express";
import Helper from "../helper/helper";

class ApiMiddleware {
  static async checkApiToken(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) {
    let token = request.headers["x-api-key"];
    Helper.printRequest(request);
    if (token === process.env.API_TOKEN) {
      next();
    } else {
      response.status(401).json({ message: "Invalid token" });
    }
  }
}

export default ApiMiddleware;
