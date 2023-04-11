import postgresServer from "../../utils/postgresConfig.js";

export default async (server) => {
  server.get("/", async (_, res) => {
    const query = `select * from users`;
    let data;
    try {
      data = await postgresServer.runQuery(query);
    } catch (error) {
      console.log(error);
      data = "An error ocurred, please try again.";
    }
    res.send(data);
  });
};
