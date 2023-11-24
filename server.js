// deno run --allow-net --allow-read --allow-write --allow-env --allow-sys server.js

import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { sleep } from "https://deno.land/x/sleep/mod.ts";
import { DB } from "https://deno.land/x/sqlite/mod.ts";

//import { Disposable, using } from "https://deno.land/x/disposable/mod.ts"; 
import mssql from "npm:mssql@10.0.1";


const mssqlPool = new mssql.ConnectionPool({
  user: "practice_rw",
  password: "prac_rw-1234",
  server: "172.29.249.104",
  database: "practice",
  options: {
    encrypt: false, // deno で tls 使えない?
    useUTC: false, //
  },
});


const router = new Router();

//  .get("/", (context) => {
//    context.response.body = "Hello world!";
//  })
router.get("/get1", async (context) => {
    await sleep(2);
    context.response.body = "GET1";
});
router.get("/get2", async (context) => {
    console.log("GET2");
    await sleep(2);
//    {
//        const book1 = {
//            id: "1",
//            title: "The Hound of the Baskervilles",
//            author: "Conan Doyle, Arthur",
//        };
//        const book2 = {
//            id: "2",
//            title: "foofoofoo",
//            author: "barbarbar",
//        };
////        context.response.body = "GET2";
////        context.response.body = book1;
//        context.response.body = [book1,book2];
//    }
    {
        const db = new DB(`${Deno.cwd()}/db/practice.sqlite3`);
        let r = db.queryEntries("SELECT * FROM TTest1");
        db.close();
        context.response.body = r;
    }
});
router.get("/get3", async (context) => {
    console.log("GET3");
    let conn = await mssqlPool.connect();
    const dbReq = conn.request();
    const query = `SELECT * FROM TTest1;`;
    const rs = await dbReq.query(query);
    const r = rs.recordset[0];
    console.log(r["testId"]);
    console.log(r["testNum"]);
    console.log(r["testText"]);    
    conn.close;

    
});
router.post("/post1", async (context) => {
    const params = await context.request.body({type:"form"}).value;
    console.log(typeof params);
    console.log("param1:" + params.get("param1"));
    console.log("param2:" + params.get("param2"));
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
