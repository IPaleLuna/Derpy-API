import app from "./app";
import authPlugin from "./Plugins/auth/authPlugin";
import { connectionPlugin } from "./Plugins/db/connection";
import { scoreTableRoutesPlugin } from "./Plugins/routes/scoreTableRoutes";

const start = async () => {
  try {
    await app.register(connectionPlugin)
    await app.register(authPlugin);
    await app.register(scoreTableRoutesPlugin, { prefix: '/score' })

    await app.listen({ port: 3000 });
    
    console.log("Server listening on http://localhost:3000");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();