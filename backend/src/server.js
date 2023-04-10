import Fastify from "fastify";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import "dotenv/config";
import DatabaseServer from "./utils/postgresConfig.js";

const serverConfig = {
  port: process.env.PORT ? process.env.PORT : 3001,
  host: process.env.HOST ? process.env.HOST : "0.0.0.0"
};
const starUpCallBack = (err, address) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Listenning on ${address}`);
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = Fastify();

DatabaseServer.getInstance();

await server.register(import("@fastify/cors"));

await server.register(import("@fastify/autoload"), {
  dir: join(__dirname, "routes"),
  forceESM: true
});

server.listen(serverConfig, starUpCallBack);
