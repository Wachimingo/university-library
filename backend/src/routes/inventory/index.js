import postgresServer from "../../utils/postgresConfig.js";

export default async (server) => {
  server.get("/", async (_, res) => {
    const query = `select inventory.id, books.name, inventory.stock from inventory inner join books on inventory.book = books.id`;
    let data;
    try {
      data = await postgresServer.runQuery(query);
    } catch (error) {
      console.log(error);
      data = "An error ocurred, please try again.";
    }
    res.send(data);
  });
  server.get("/:id", async (req, res) => {
    const query = `select inventory.id, books.name, inventory.stock from inventory inner join books on inventory.book = books.id where inventory.id = ${req.params.id}`;
    let data;
    try {
      data = await postgresServer.runQuery(query);
    } catch (error) {
      console.log(error);
      data = "An error ocurred, please try again.";
    }
    res.send(data);
  });
  server.get("/book/:title", async (req, res) => {
    const query = `select inventory.id, books.name, inventory.stock from inventory inner join books on inventory.book = books.id where lower(books.name) like '%${req.params.title.toLowerCase()}%'`;
    let data;
    try {
      data = await postgresServer.runQuery(query);
    } catch (error) {
      console.log(error);
      data = "An error ocurred, please try again.";
    }
    res.send(data);
  });
  server.patch("/:id", async (req, res) => {
    const query = `update inventory set stock=${req.body.stock} where id=${req.params.id}`;
    let data;
    try {
      await postgresServer.runQuery(query);
      data = "success";
    } catch (error) {
      console.log(error);
      data = "An error ocurred, please try again.";
    }
    res.send(data);
  });
};
