import postgresServer from "../../utils/postgresConfig.js";

export default async (server) => {
  server.get("/", async (_, res) => {
    const query = `select user_id, first_name, last_name, email, user_role from users`;
    let data;
    try {
      data = await postgresServer.runQuery(query);
    } catch (error) {
      console.log(error);
      data = "An error ocurred, please try again.";
    }
    res.send(data);
  });
  server.post("/login", async (req, res) => {
    const query = `select user_id, first_name, last_name, email, user_role from users where email='${req.body.email}' and pass='${req.body.pass}'`;
    let data;
    try {
      data = await postgresServer.runQuery(query);
    } catch (error) {
      console.log(error);
      data = "An error ocurred, please try again.";
    }
    res.send(data);
  });
  server.post("/signup", async (req, res) => {
    const { first_name, last_name, email } = req.body;
    const query = `insert into users(first_name, last_name, email, user_role, pass) values('${first_name}','${last_name}','${email}','student','123456');`;

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
