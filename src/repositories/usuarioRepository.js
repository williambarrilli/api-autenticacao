import db from "../database/conexao.js";

export function buscarPorEmail(email) {
  return db.prepare("SELECT * FROM usuarios WHERE email = ?").get(email) ?? null;
}

export function criar({ nome, email, senhaHash }) {
  const resultado = db
    .prepare("INSERT INTO usuarios (nome, email, senhaHash) VALUES (?, ?, ?)")
    .run(nome, email, senhaHash);

  return { id: Number(resultado.lastInsertRowid), nome, email };
}
