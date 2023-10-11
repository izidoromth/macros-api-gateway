import { createClient, RedisClientType } from 'redis';
import jwt from 'jsonwebtoken';

class RedisService {
  private _client!: RedisClientType;

  constructor(){
    this._client = createClient({ url: process.env.REDIS_URL! });
    this._client.connect();
  }

  async assignUserToken(username : string) : Promise<string> {
    var token = jwt.sign({ username: username }, process.env.JWT_SECRET!, { expiresIn: parseInt(process.env.JWT_TOKEN_EXPIRATION!) });
    await this._client.set(username, token, { EX: parseInt(process.env.JWT_TOKEN_EXPIRATION!) });
    return token;
  }

  async checkToken(token: string) : Promise<boolean>{
    try {
      jwt.verify(token, process.env.JWT_SECRET!)
      return true;
    }
    catch (err){
      return false;
    }
  }

}

export default new RedisService();