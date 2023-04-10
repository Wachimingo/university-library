import Fastify from "fastify";

const server = Fastify();

server.get("/", async (req, res) => {
  res.send("Hey there");
});

server.listen({ port: 3001, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Listenning on ${address}`);
});
