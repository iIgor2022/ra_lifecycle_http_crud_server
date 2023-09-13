import { koaBody } from "koa-body";
import Koa from "koa";
import cors from "koa2-cors";
import Router from "koa-router";
import http from "http";

const app = new Koa();

app.use(cors());
app.use(koaBody({ json: true }));

const notes = [];
let nextId = 1;

const router = new Router();

router.get("/notes", async(ctx, next) => ctx.response.body = notes);

router.post("/notes", async(ctx, next) => {
  notes.push({ content: ctx.request.body, id: nextId++ });
  ctx.response.status = 204;
});

router.delete("/notes/:id", async(ctx, next) => {
  const noteId = Number(ctx.params.id);
  const index = notes.findIndex(obj => obj.id === noteId);

  if (index !== -1) notes.splice(index, 1);
  ctx.response.status = 204;
});

app.use(router.routes()).use(router.allowedMethods());

const port = 7070;
const server = http.createServer(app.callback());

server.listen(port, () => console.log("server started"));