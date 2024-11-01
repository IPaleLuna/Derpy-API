import { FastifyPluginAsync } from "fastify";
import mysql from 'mysql2/promise';
import fp from "fastify-plugin";


const plugin: FastifyPluginAsync = async (server) => {

    const connectionService = await mysql.createConnection({
        host: '5.34.214.49',
        user: 'PLAYER_USER',
        password: 'wWvIaVrx@Q7~',
        database: 'HarvestingBase',
      });
      
    server.decorate('mysql', connectionService);
};

declare module 'fastify' {
    interface FastifyInstance {
        mysql: mysql.Connection;
    }
}

export const connectionPlugin = fp(plugin, {
    name: 'mysql',
})