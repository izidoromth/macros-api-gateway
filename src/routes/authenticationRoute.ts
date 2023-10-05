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
      return res.status(error.response.status).send({ message: error.response.data.message});
    }
  }
}

export default new AuthenticationRoute();