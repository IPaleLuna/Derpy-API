import app from "./app";
import authPlugin from "./Plugins/auth/authPlugin";
import { connectionPlugin } from "./Plugins/db/connection";
import { scoreTableRoutesPlugin } from "./Plugins/routes/scoreTableRoutes";
import cors from '@fastify/cors';

const start = async () => {
  try {
    await app.register(connectionPlugin)
    await app.register(authPlugin);
    await app.register(scoreTableRoutesPlugin, { prefix: '/score' })

    app.register(cors, {
      origin: '*', // разрешить все домены (измените при необходимости)
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // методы, которые разрешены
      allowedHeaders: ['authorization', 'Content-Type', 'Accept-Encoding','Accept-Charset'], // разрешённые заголовки
      credentials: true // если требуется поддержка сессий или cookie
    });

    await app.listen({ host: '5.34.214.49', port: 3000 });
    
    console.log("Server listening on http://5.34.214.49:3000");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();