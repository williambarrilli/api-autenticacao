PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  senhaHash TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS tarefas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT NOT NULL,
  concluida INTEGER NOT NULL DEFAULT 0 CHECK (concluida IN (0, 1))
);

INSERT OR IGNORE INTO tarefas (id, titulo, concluida) VALUES
  (1, 'Estudar autenticação', 0),
  (2, 'Revisar camadas da API', 1);
