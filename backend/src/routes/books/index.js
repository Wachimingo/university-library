import postgresServer from "../../utils/postgresConfig.js";

export default async (server) => {
  server.get("/", async (_, res) => {
    const query = `select books.id, books.name as book, authors.name as author, genres.name as genre, books.published_year from books inner join authors on books.author = authors.id inner join genres on books.genre = genres.id`;
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
    const query = `select books.id, books.name as book, authors.name as author, genres.name as genre, books.published_year from books inner join authors on books.author = authors.id inner join genres on books.genre = genres.id where lower(books.name) like '%${decodeURIComponent(
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
    const query = `select books.id, books.name as book, authors.name as author, genres.name as genre, books.published_year from books inner join authors on books.author = authors.id inner join genres on books.genre = genres.id where lower(authors.name) like '%${decodeURIComponent(
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
    const query = `select books.id, books.name as book, authors.name as author, genres.name as genre, books.published_year from books inner join authors on books.author = authors.id inner join genres on books.genre = genres.id where lower(genres.name) = '${req.params.genre.toLowerCase()}'`;
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
