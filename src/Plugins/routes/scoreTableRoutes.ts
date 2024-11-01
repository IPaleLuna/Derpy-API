import { FastifyPluginAsync } from "fastify";
import { getScores, addScore, getScoreById, getScoreByName } from "../../db/scoreService";
import fp from "fastify-plugin";

const plugin: FastifyPluginAsync = async (server) => {

  server.get('/score', { preHandler: [server.authenticate] }, async (request, reply) => {
    try {
      const usersScore = await getScores(server);
      reply.send(usersScore);
    } catch (error) {
      console.log(error);
      reply.status(500).send({ error: error });
    }
  });

  server.get('/score/:id', { preHandler: [server.authenticate] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    try {
      const user = await getScoreById(server, Number(id));
      if (user) {
        reply.send(user);
      } else {
        reply.status(404).send({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });

  server.get('/score/name/:player_name', { preHandler: [server.authenticate] }, async (request, reply) => {
    const { player_name } = request.params as { player_name: string };
    try {
      const user = await getScoreByName(server, player_name);
      if (user) {
        reply.send(user);
      } else {
        reply.status(404).send({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });

  server.post('/score', { preHandler: [server.authenticate] }, async (request, reply) => {
    const { name, score } = request.body as { name: string; score: number };
    
    try {
      const userScore = await addScore(server, name, score);
      reply.status(201).send(userScore);
    } catch (error) {
      reply.status(500).send({ error: error });
    }
  });
    
};


export const scoreTableRoutesPlugin = fp(plugin, {
  name: 'scoreTableRoutes',
})

export default scoreTableRoutesPlugin;
