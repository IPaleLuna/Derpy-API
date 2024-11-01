import fp from 'fastify-plugin';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { API_TOKEN } from '../../config';


const authPlugin = fp(async (server: FastifyInstance) => {
  server.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const authHeader = request.headers['authorization'];
      if (!authHeader || authHeader !== `Bearer ${API_TOKEN}`) {
        reply.status(401).send({ error: 'Unauthorized' });
      }
    }
  );
});

export default authPlugin;

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}