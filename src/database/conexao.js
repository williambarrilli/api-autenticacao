import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";

const pastaDados = path.join(process.cwd(), "data");
fs.mkdirSync(pastaDados, { recursive: true });

const db = new DatabaseSync(path.join(pastaDados, "banco.db"));
db.exec(fs.readFileSync(path.join(pastaDados, "banco.sql"), "utf-8"));

export default db;
