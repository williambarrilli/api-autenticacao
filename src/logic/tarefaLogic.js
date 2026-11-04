import * as tarefaRepository from "../repositories/tarefaRepository.js";

export function listar() {
  return tarefaRepository.listar();
}

export function criar({ titulo } = {}) {
  if (typeof titulo !== "string" || titulo.trim() === "") {
    throw new Error("O campo titulo é obrigatório");
  }
  return tarefaRepository.criar(titulo.trim());
}
