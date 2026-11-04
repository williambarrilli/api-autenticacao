import * as tarefaLogic from "../logic/tarefaLogic.js";

export function listar(request, response) {
  return response.status(200).json(tarefaLogic.listar());
}

export function criar(request, response) {
  try {
    const tarefa = tarefaLogic.criar(request.body ?? {});
    return response.status(201).json({ ...tarefa, criadaPor: request.usuario.nome });
  } catch (error) {
    return response.status(error.status ?? 400).json({ mensagem: error.message });
  }
}
