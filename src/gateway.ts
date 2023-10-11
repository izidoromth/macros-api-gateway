import express from 'express';
import redisService from './services/redisService';

const proxy = require("express-http-proxy");

class Gateway {
  app: express.Application;
  port: number | string;

  constructor(routes: Array<any>, services: Array<any>, port: number | string) {
    this.app = express();
    this.port = port;    

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    routes.forEach(route => {
      this.app.use(route.default.path, route.default.router);
    });

    services.forEach(service => {
      this.app.use(service.path, this.tokenVerificationMiddleware, proxy(service.url));
    });
  }

  start() {    
    this.app.listen(this.port, async () => {
      console.log(`Gateway listening on port ${this.port}`);
    });
  }

  async tokenVerificationMiddleware(req: express.Request, res: express.Response, next: express.NextFunction){
    const authHeader = req.headers['authorization'];
    if(authHeader){
      if(await redisService.checkToken(authHeader.split(' ')[1]))
        next();
      else
        return res.status(400).send({ message: "Token invalid."});
    }
    else {
      return res.status(400).send({ message: "Authorization header not found."});
    }
  }
}

export default Gateway;
