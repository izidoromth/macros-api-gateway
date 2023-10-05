import express from 'express';

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
      this.app.use(service.path, proxy(service.url));
    });
  }

  start() {    
    this.app.listen(this.port, async () => {
      console.log(`Gateway listening on port ${this.port}`);
    });
  }
}

export default Gateway;
