import express, { response } from "express"
import { AuthRequest } from "../models/Authentication";
import authenticationService from "../services/authenticationService";

class AuthenticationRoute {
  path = "/login"
  router = express.Router()

  constructor() {
    this.router.post('/', this.authenticateUser);
  }

  async authenticateUser(req: express.Request, res: express.Response) {
    try {
      const response = await authenticationService.executeLogin(new AuthRequest(req.body));
      return res.status(200).send(response);
    } 
    catch (error: any) {
      if('response' in error)
        return res.status(error.response.status).send({ message: error.response.data.message});
      else
        return res.status(503).send({ message: "The server encountered an error. Try again later."});
    }
  }
}

export default new AuthenticationRoute();