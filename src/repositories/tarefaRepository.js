import db from "../database/conexao.js";

const mapear = (linha) => ({ ...linha, concluida: linha.concluida === 1 });

export function listar() {
  return db.prepare("SELECT * FROM tarefas ORDER BY id").all().map(mapear);
}

export function criar(titulo) {
  const resultado = db
    .prepare("INSERT INTO tarefas (titulo) VALUES (?)")
    .run(titulo);

  return { id: Number(resultado.lastInsertRowid), titulo, concluida: false };
}
