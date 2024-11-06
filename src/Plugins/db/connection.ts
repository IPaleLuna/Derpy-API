import { FastifyPluginAsync } from "fastify";
import mysql from 'mysql2/promise';
import fp from "fastify-plugin";


const plugin: FastifyPluginAsync = async (server) => {

    const connectionService = await mysql.createPool({
        host: '5.34.214.49',
        user: 'PLAYER_USER',
        password: 'wWvIaVrx@Q7~',
        database: 'HarvestingBase',
        waitForConnections: true,
        connectionLimit: 20,  // max connections
        queueLimit: 0,
        idleTimeout: 60000,   // idle timeout for connections
      });
      
    server.decorate('mysql', connectionService);
};

declare module 'fastify' {
    interface FastifyInstance {
        mysql: mysql.Pool;
    }
}

export const connectionPlugin = fp(plugin, {
    name: 'mysql',
})