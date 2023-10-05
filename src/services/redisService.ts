import { createClient, RedisClientType } from 'redis';
import jwt from 'jsonwebtoken';

class RedisService {
  client!: RedisClientType;

  constructor(){
    this.client = createClient({ url: process.env.REDIS_URL! });
    this.client.connect();
  }

  async assignUserToken(username : string) : Promise<string> {
    var token = jwt.sign({ username: username }, process.env.JWT_SECRET!, { expiresIn: parseInt(process.env.JWT_TOKEN_EXPIRATION!) });
    await this.client.set(username, token, { EX: parseInt(process.env.JWT_TOKEN_EXPIRATION!) });
    return token;
  }

}

export default new RedisService();