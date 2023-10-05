require('dotenv').config();

import Gateway from "./gateway";
import services from "./services.json"
import fs from 'fs';

let routes: Array<any> = [];
const routeFiles = fs.readdirSync(`./src/routes`);

routeFiles.forEach((routeFile : any) => {
  let route = require(`./routes/${routeFile}`);
  routes.push(route);
});

const gateway = new Gateway(routes, services, process.env.APP_PORT!);
gateway.start();