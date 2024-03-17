import jsonServer from "json-server";
import getEvent from "./mocks/getEvent.js";
import result from "./mocks/getResult.js";
import shotResult from "./mocks/getShotResult.js";

const addDelay = (delay = 0) =>
  new Promise((resolve) => setTimeout(resolve, delay));

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);

server.get("/event", async (req, res) => {
  console.log("I've got the event data");
  await addDelay(200);
  await res.send(getEvent);
});

server.get("/event/:id", async (req, res) => {
  await addDelay(200);
  await res.send({
    id: "3",
    name: "Название",
    created: "2024-03-16T08:36:07.267Z",
    status: "done",
    result: {
      full: result,
      speakers: ["SPEAKER_01", "SPEAKER_06"],
      shot: shotResult,
      tasks: ["12321", "sadasdasd"]
    }
  });
});

server.post("/event", async (req, res) => {
  await addDelay(200);
  await res.send();
})

// server.post("/template", async (req, res) => {
//   await addDelay(200);
//   await res.send(postTemplateJSON);
// });
//
// server.get("/template/:template_id", async (req, res) => {
//   await addDelay(200);
//   await res.send(getTemplateJSON);
// });


server.listen(3004, () => {
  console.log(`JSON Server is running: http://localhost:3004`);
});
