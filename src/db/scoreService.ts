import "@fastify/mysql";
import { FastifyInstance } from "fastify";

export async function getScores(app: FastifyInstance) {
  const [rows] = await app.mysql.query('SELECT * FROM Score_Table');
  return rows;
}
export async function getScoreById(app: FastifyInstance, id: number) {
  const [rows] = await app.mysql.query('SELECT * FROM Score_Table WHERE id = ?', [id]);
  return rows
}
export async function getScoreByName(app: FastifyInstance, player_name: string) {
  const [rows] = await app.mysql.query('SELECT * FROM Score_Table WHERE player_name = ?', [player_name]);
  return rows
}

export async function addScore(app: FastifyInstance, name: string, score: number) {
  const [result] : any = await app.mysql.query('INSERT INTO Score_Table (player_name, score) VALUES (?, ?) ON DUPLICATE KEY UPDATE score = ?', [name, score, score]);
  return { id: result.insertId, name, score };
}