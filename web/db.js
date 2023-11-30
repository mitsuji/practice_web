
function dbOpenOne() {
//    indexedDB.deleteDatabase("db1");
    return dbOpen("db1", 2, (event) => {
        console.log("oldVersion:" + event.oldVersion);
        console.log("newVersion:" + event.newVersion);
        switch (event.oldVersion) {
        case 0 : {
            console.log("brand-new");
            const db = event.target.result;
            const store1 = db.createObjectStore("store1");
            store1.add("foo100",100);
            store1.add("bar200",200);
            const store2 = db.createObjectStore("store2", {autoIncrement: true});
            store2.add("foo");
            store2.add("bar");
            const store3 = db.createObjectStore("store3", {keyPath: "uid"});
            store3.add({uid:100,name:"foo100"});
            store3.add({uid:200,name:"bar200"});
            const store4 = db.createObjectStore("store4", {keyPath: "sid", autoIncrement: true});
            store4.add({name:"foo"});
            store4.add({name:"bar"});
        }
        case 1 : {
            console.log("0 -> 1");
            const tran = event.target.transaction;
            const store1 = tran.objectStore("store1");
            store1.add("baz300",300);
            store1.add("baz400",400);
            const store2 = tran.objectStore("store2");
            store2.add("baz1");
            store2.add("baz2");
            const store3 = tran.objectStore("store3");
            store3.add({uid:300,name:"baz300"});
            store3.add({uid:400,name:"baz400"});
            const store4 = tran.objectStore("store4");
            store4.add({name:"baz1"});
            store4.add({name:"baz2"});
        }
//        case 2 : {
//            console.log("1 -> 2");
//        }
        }
    });
}

window.onload = async(e) => {
    {
        let db = await dbOpenOne();
//        try {
//            const result = await dbGet(db, "store1", 100);
//            console.log(result);
//        } catch (error) {
//            console.log("error: " + error);
//        }

//        try {
//            const result = await dbGet(db, "store2", 1);
//            console.log(result);
//        } catch (error) {
//            console.log("error: " + error);
//        }

//        try {
//            let items = await dbFind (db, "store3", (item) =>
//                true
////                item.name.startsWith("b")
//            );
//            console.log (items);
//        } catch (error) {
//            console.log("error: " + error);
//        }

//        try {
//            await dbAdd(db, "store1", "baz", 300);
//        } catch (error) {
//            console.log("error: " + error);
//        }

//        try {
//            await dbAdd(db, "store2", "baz");
//        } catch (error) {
//            console.log("error: " + error);
//        }

//        try {
//            await dbAdd(db, "store3", {uid:300,name:"baz300"});
//        } catch (error) {
//            console.log("error: " + error);
//        }

//        try {
//            await dbAdd(db, "store4", {name:"baz"});
//        } catch (error) {
//            console.log("error: " + error);
//        }

//        try {
//            await dbDelete(db, "store2", 6);
//        } catch (error) {
//            console.log("error: " + error);
//        }

//        try {
//            await dbPut(db, "store1", "nananana", 400);
//        } catch (error) {
//            console.log("error: " + error);
//        }

//        try {
//            await dbTransaction (db, ["store1","store2"], async (tran) => {
//                await dbExecute (tran.objectStore("store2").add("baz"));
//                await dbExecute (tran.objectStore("store1").add("baz300",300));
//                await dbExecute (tran.objectStore("store11").add("baz300",300));
//            });
////            await dbAdd (db, "store2", "baz");
////            await dbAdd (db, "store1", "baz300",300);
////            await dbAdd (db, "store11", "baz300",300);
//        } catch (error) {
//            console.log("error: " + error);
//        }


    }

};
