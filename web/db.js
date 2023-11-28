
function dbOpenOne() {
//    indexedDB.deleteDatabase("db1");
    return dbOpen("db1",1,(event) => {
        console.log("onupgradeneeded!!");
        const db = event.target.result;
        const store1 = db.createObjectStore("store1");
        store1.add("foo100",100);
        store1.add("bar200",200);
        const store2 = db.createObjectStore("store2", {autoIncrement: true});
        store2.add("foo");
        store2.add("bar");
    });
}

window.onload = (e) => {
    document.querySelector(".test1button").addEventListener("click", async (event) => {
        let db = await dbOpenOne();
        try {
            const tran = db.transaction(["store1"]);
            const request = tran.objectStore("store1").get(100);
            const result = await dbExecute(request);
            console.log(result);
        } catch (error) {
            console.log("error: " + error);
        }
        try {
            const tran = db.transaction(["store2"]);
            const request = tran.objectStore("store2").get(1);
            const result = await dbExecute(request);
            console.log(result);
        } catch (error) {
            console.log("error: " + error);
        }
        try {
            const tran = db.transaction(["store2"]);
            const request = tran.objectStore("store2").getAll();
            let result = await dbExecute(request);
            console.log(result);
        } catch (error) {
            console.log("error: " + error);
        }
        try {
            const tran = db.transaction(["store2"]);
            const request = tran.objectStore("store2").openCursor();
            let items = [];
            await dbTraverse (request,(item) => {
                items.push(item);
            });
            console.log(items);
        } catch (error) {
            console.log("error: " + error);
        }
//        try {
//            const tran = db.transaction(["store2"],"readwrite");
//            const request = tran.objectStore("store2").add("booo");
//            await dbExecute(request);
//        } catch (error) {
//            console.log("error: " + error);
//        }
//        try {
//            await dbTransaction (db.transaction(["store1","store2"],"readwrite"), async (tran) => {
//                const store1 = tran.objectStore("store1");
//                const store2 = tran.objectStore("store2");
//                await dbExecute (store2.add("baz"));
//                await dbExecute (store1.add("baz300",300));
//            });
//        } catch (error) {
//            console.log("error: " + error);
//        }
    });
};
