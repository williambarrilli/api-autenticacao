import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Usuario } from "../models/usuario.js";
import * as usuarioRepository from "../repositories/usuarioRepository.js";

export async function cadastrar(body) {
  const usuario = new Usuario(body);

  if (usuarioRepository.buscarPorEmail(usuario.email)) {
    const erro = new Error("Já existe um usuário com esse email");
    erro.status = 409;
    throw erro;
  }

  // 10 = custo do hash: quanto maior, mais lento para um atacante testar senhas.
  const senhaHash = await bcrypt.hash(usuario.senha, 10);

  return usuarioRepository.criar({ nome: usuario.nome, email: usuario.email, senhaHash });
}

export async function login({ email, senha } = {}) {
  const usuario = usuarioRepository.buscarPorEmail(String(email ?? "").trim().toLowerCase());
  const senhaConfere = usuario && (await bcrypt.compare(String(senha ?? ""), usuario.senhaHash));

  // Mesma mensagem para email e senha errados: não contamos qual dos dois errou.
  if (!senhaConfere) {
    const erro = new Error("Email ou senha inválidos");
    erro.status = 401;
    throw erro;
  }

  const token = jwt.sign(
    { id: usuario.id, nome: usuario.nome },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  return { token };
}
