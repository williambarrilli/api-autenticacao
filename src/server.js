import express from "express";
import * as usuarioController from "./controllers/usuarioController.js";
import * as tarefaController from "./controllers/tarefaController.js";
import { autenticar } from "./middlewares/autenticar.js";

if (!process.env.JWT_SECRET) {
  console.error("Falta o JWT_SECRET no arquivo .env");
  process.exit(1);
}

const app = express();

// Permite usar o SimuladorRequest.html aberto fora do projeto.
app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (request.method === "OPTIONS") return response.sendStatus(204);
  next();
});
app.use(express.json());

// Abertas
app.post("/usuarios", usuarioController.cadastrar);
app.post("/login", usuarioController.login);
app.get("/tarefas", tarefaController.listar);

// Protegida: o middleware roda antes do controller
app.post("/tarefas", autenticar, tarefaController.criar);

const PORTA = Number(process.env.PORT || 3000);
app.listen(PORTA, () => console.log(`API disponível em http://localhost:${PORTA}`));
