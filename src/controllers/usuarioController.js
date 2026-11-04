import * as usuarioLogic from "../logic/usuarioLogic.js";

export async function cadastrar(request, response) {
  try {
    const usuario = await usuarioLogic.cadastrar(request.body ?? {});
    return response.status(201).json(usuario);
  } catch (error) {
    return response.status(error.status ?? 400).json({ mensagem: error.message });
  }
}

export async function login(request, response) {
  try {
    const resultado = await usuarioLogic.login(request.body ?? {});
    return response.status(200).json(resultado);
  } catch (error) {
    return response.status(error.status ?? 400).json({ mensagem: error.message });
  }
}
