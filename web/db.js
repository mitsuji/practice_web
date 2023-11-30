
function dbOpenOne() {
//    indexedDB.deleteDatabase("db1");
    return dbOpen("db1",1,(event) => {
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
//        case 1 : {
//            console.log("0 -> 1");
//        }
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
//            const tran = db.transaction(["store1"]);
//            const request = tran.objectStore("store1").get(100);
//            const result = await dbExecute(request);
//            console.log(result);
//        } catch (error) {
//            console.log("error: " + error);
//        }
//        try {
//            const tran = db.transaction(["store2"]);
//            const request = tran.objectStore("store2").get(1);
//            const result = await dbExecute(request);
//            console.log(result);
//        } catch (error) {
//            console.log("error: " + error);
//        }
//        try {
//            const tran = db.transaction(["store2"]);
//            const request = tran.objectStore("store2").getAll();
//            let result = await dbExecute(request);
//            console.log(result);
//        } catch (error) {
//            console.log("error: " + error);
//        }
//        try {
//            const tran = db.transaction(["store2"]);
//            const request = tran.objectStore("store2").openCursor();
//            let items = [];
//            await dbTraverse (request,(cursor) => {
//                items.push(cursor.value);
//            });
//            console.log(items);
//        } catch (error) {
//            console.log("error: " + error);
//        }
//        try {
//            const tran = db.transaction(["store3"]);
//            const request = tran.objectStore("store3").openCursor();
//            await dbTraverse (request,(cursor) => {
//                let x = cursor.value;
////                x.name = x.name + "----";
////                cursor.update(x);
//                console.log(x);
//            });
//        } catch (error) {
//            console.log("error: " + error);
//        }
        try {
            const tran = db.transaction(["store3"]);
            const request = tran.objectStore("store3").openCursor();
//            let items = await dbFind (request,(item) => true);
            let items = await dbFind (request,(item) => {
                return item.name.startsWith("b");
            });
            console.log (items);
        } catch (error) {
            console.log("error: " + error);
        }
//        try {
//            const tran = db.transaction(["store4"]);
//            const request = tran.objectStore("store4").openCursor();
//            await dbTraverse (request,(cursor) => {
//                console.log(cursor.value);
//            });
//        } catch (error) {
//            console.log("error: " + error);
//        }

//        try {
//            const tran = db.transaction(["store2"],"readwrite");
//            const request = tran.objectStore("store2").add("baz");
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
//        try {
//            const tran = db.transaction(["store3"],"readwrite");
//            const request = tran.objectStore("store3").add({uid:300,name:"baz300"})
//            await dbExecute(request);
//        } catch (error) {
//            console.log("error: " + error);
//        }
//        try {
//            const tran = db.transaction(["store4"],"readwrite");
//            const request = tran.objectStore("store4").add({name:"baz"})
//            await dbExecute(request);
//        } catch (error) {
//            console.log("error: " + error);
//        }



    }

};
