// deno run --allow-net --allow-read server.js

import { Application, Router } from "https://deno.land/x/oak/mod.ts";


const router = new Router();

//  .get("/", (context) => {
//    context.response.body = "Hello world!";
//  })
router.get("/get1", (context) => {
    context.response.body = "GET1";
});
router.get("/get2", (context) => {
    context.response.body = "GET2";
});
router.post("/post1", (context) => {
    context.response.body = "POST1";
});
router.post("/post2", (context) => {
    context.response.body = "POST2";
});
router.put("/put1", (context) => {
    context.response.body = "PUT1";
});
router.put("/put2", (context) => {
    context.response.body = "PUT2";
});
router.delete("/delete1", (context) => {
    context.response.body = "DELETE1";
});
router.delete("/delete2", (context) => {
    context.response.body = "DELETE2";
});


const app = new Application();
app.use(async (context, next) => {
  try {
    await context.send({
      root: `${Deno.cwd()}/web`,
      index: "index.html",
    });
  } catch {
    await next();
  }
});
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8080 });
