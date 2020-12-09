import { Application, send } from "https://deno.land/x/oak/mod.ts";
import cardRouter from "./Deno/routes.ts";

const app = new Application();
const port: number = 8080;

app.use(cardRouter.routes());
app.use(cardRouter.allowedMethods());

app.addEventListener("listen", ({ secure, hostname, port }) => {
  const protocol = secure ? "https://" : "http://";
  const url = `${protocol}${hostname ?? "localhost"}:${port}`;
  console.log(`Listening on: ${port}`);
});

await app.listen({ port });