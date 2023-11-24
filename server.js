// deno run --allow-net --allow-read --allow-write --allow-env --allow-sys server.js

import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { sleep } from "https://deno.land/x/sleep/mod.ts";
import { DB } from "https://deno.land/x/sqlite/mod.ts";
import mssql from "npm:mssql@10.0.1";

// [TODO] deno で Enctypt=true できない?
//        https://github.com/denoland/deno/issues/20594
const mssqlConfig = "Server=172.29.249.104,1433;Database=practice;User Id=practice_rw;Password=prac_rw-1234;Encrypt=false";

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
//    let conn = await mssql.connect(mssqlConfig);
//    const request = conn.request();
    const request = mssqlConn.request();
    const query = `SELECT * FROM TTest1;`;
    const rs = await request.query(query);
    const r = rs.recordset[0];
    console.log(r["testId"]);
    console.log(r["testNum"]);
    console.log(r["testText"]);    
    
});
router.post("/post1", async (context) => {
    const params = await context.request.body({type:"form"}).value;
    console.log(typeof params);
    console.log("param1:" + params.get("param1"));
    console.log("param2:" + params.get("param2"));
    context.response.body = "POST1";
});
router.post("/post2", async (context) => {
    const request = mssqlConn.request();
    request.input('Num', mssql.Int, 300);
    request.input('Text', mssql.NVarChar, "ABCD3234");
    request.output('Id', mssql.Int);
    let result = await request.execute('PCreateTest1');
    const outId = result.output["Id"];
    console.log(outId);
    context.response.body = outId;
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




const mssqlPool = new mssql.ConnectionPool(mssqlConfig);
if(typeof mssqlPool.config.options.useUTC == "undefined")
{
  mssqlPool.config.options.useUTC = false;
}
const mssqlConn = await mssqlPool.connect();

await app.listen({ port: 8080 });
