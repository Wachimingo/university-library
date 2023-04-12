import postgresServer from "../../utils/postgresConfig.js";

export default async (server) => {
  server.get("/", async (_, res) => {
    const query = `select * from books`;
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
    const query = `select books.id, books.title, books.img,  books.author, books.genre, books.published_year, inventory.id as inventory_id, inventory.stock from books inner join inventory on books.id = inventory.book where books.id = ${req.params.id}`;
    let data;
    try {
      data = await postgresServer.runQuery(query);
    } catch (error) {
      console.log(error);
      data = "An error ocurred, please try again.";
    }
    res.send(data);
  });
  server.get("/title/:title", async (req, res) => {
    const query = `select books.id, books.title, books.img,  books.author, books.genre, books.published_year, inventory.id as inventory_id, inventory.stock from books inner join inventory on books.id = inventory.book where lower(books.title) like '%${decodeURIComponent(
      req.params.title.toLowerCase()
    )}%'`;
    let data;
    try {
      data = await postgresServer.runQuery(query);
    } catch (error) {
      console.log(error);
      data = "An error ocurred, please try again.";
    }
    res.send(data);
  });
  server.get("/author/:author", async (req, res) => {
    const query = `select books.id, books.title, books.img,  books.author, books.genre, books.published_year, inventory.id as inventory_id, inventory.stock from books inner join inventory on books.id = inventory.book where lower(authors.title) like '%${decodeURIComponent(
      req.params.author.toLowerCase()
    )}%'`;
    let data;
    try {
      data = await postgresServer.runQuery(query);
    } catch (error) {
      console.log(error);
      data = "An error ocurred, please try again.";
    }
    res.send(data);
  });
  server.get("/genre/:genre", async (req, res) => {
    const query = `select books.id, books.title, books.img,  books.author, books.genre, books.published_year, inventory.id as inventory_id, inventory.stock from books inner join inventory on books.id = inventory.book where lower(genres.title) = '${req.params.genre.toLowerCase()}'`;
    let data;
    try {
      data = await postgresServer.runQuery(query);
    } catch (error) {
      console.log(error);
      data = "An error ocurred, please try again.";
    }
    res.send(data);
  });
  server.post("/", async (req, res) => {
    const { title, published_year, author, genre, img, stock } = JSON.parse(req.body);
    const query = `insert into books(title, published_year, author, genre, img) values('${title}', '${published_year}', '${author}', '${genre}', '${img}') returning id;`;
    let data;
    try {
      data = await postgresServer.runQuery(query);
      const createInventory = `insert into inventory(book, stock) values(${data[0].id},${stock})`;
      await postgresServer.runQuery(createInventory);
    } catch (error) {
      console.log(error);
      data = "An error ocurred, please try again.";
    }
    res.send(data);
  });
};
