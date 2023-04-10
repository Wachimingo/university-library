import postgresServer from "../utils/postgresConfig.js";

export default async (server) => {
  server.get("/", async (req, res) => {
    res.send("hey there");
  });
  server.post("/", async (req, res) => {
    const data = await postgresServer.runQuery(req.body.query);
    res.send(data);
  });
};
