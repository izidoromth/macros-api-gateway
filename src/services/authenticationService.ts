import axios from "axios";
import { AuthRequest, AuthResponse } from "../models/Authentication";
import redisService from "./redisService";
import services from "../services.json";

class AuthenticationService {
  async executeLogin(authReq : AuthRequest) : Promise<AuthResponse> {
    // check if user exists and password is right
    const response = await axios.post(`${services.filter(s => s.name === 'user')[0].url}/login`, authReq);
    
    // assign user a token
    const jwtToken = await redisService.assignUserToken(response.data.content.username);
    
    // return token.
    return {
      message: response.data.message,
      token: jwtToken
    }
  }
}

export default new AuthenticationService();