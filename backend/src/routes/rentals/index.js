import postgresServer from "../../utils/postgresConfig.js";

export default async (server) => {
  server.get("/", async (_, res) => {
    const query = `select rentals.id, inventory.id as inventory_id, books.title, concat(students.first_name,' ', students.last_name) as student, rentals.rental_date, rentals.return_date, concat(staff.first_name,' ', staff.last_name) as staff from rentals inner join inventory on rentals.inventory = inventory.id inner join users students on rentals.user = students.user_id inner join users staff on rentals.staff = staff.user_id inner join books on inventory.book = books.id`;
    let data;
    try {
      data = await postgresServer.runQuery(query);
    } catch (error) {
      console.log(error);
      data = "An error ocurred, please try again.";
    }
    res.send(data);
  });
  server.get("/user", async (req, res) => {
    const query = `select rentals.id, inventory.book from rentals inner join inventory on rentals.inventory = inventory.id where rentals.user=${req.query.user} and book=${req.query.book}`;
    let data;
    try {
      data = await postgresServer.runQuery(query);
    } catch (error) {
      console.log(error);
      data = "An error ocurred, please try again.";
    }
    res.send(data.length > 0);
  });
  server.get("/user/my-books", async (req, res) => {
    const query = `select rentals.id as rental_id, books.id as book_id, books.title, books.img, concat(students.first_name,' ', students.last_name) as student, rentals.rental_date, rentals.return_date, concat(staff.first_name,' ', staff.last_name) as staff from rentals inner join inventory on rentals.inventory = inventory.id inner join users students on rentals.user = students.user_id inner join users staff on rentals.staff = staff.user_id inner join books on inventory.book = books.id where students.user_id = ${req.query.user}`;
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
    const date = new Date();
    const { inventory, user } = JSON.parse(req.body);
    const query = `insert into rentals(inventory, "user", rental_date, return_date, staff) values(${inventory}, ${user}, '${
      date.toISOString().split("T")[0]
    }', '', 3)`;

    const updateStock = `update inventory set stock=((select stock from inventory where id=${inventory})-1) where id=${inventory}`;
    let data = "success";
    try {
      await postgresServer.runQuery(query);
      await postgresServer.runQuery(updateStock);
    } catch (error) {
      console.log(error);
      data = "An error ocurred, please try again.";
    }
    res.send(data);
  });
  server.patch("/:id", async (req, res) => {
    const { inventory } = JSON.parse(req.body);
    const date = new Date();
    const query = `update rentals set return_date='${date.toISOString().split("T")[0]}' where rentals.id=${req.params.id}`;
    const updateStock = `update inventory set stock=((select stock from inventory where id=${inventory})+1) where id=${inventory}`;
    let data;
    try {
      data = await postgresServer.runQuery(query);
      await postgresServer.runQuery(updateStock);
    } catch (error) {
      console.log(error);
      data = "An error ocurred, please try again.";
    }
    res.send(data);
  });
};
