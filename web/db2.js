

window.onload = (e) => {
    console.log("go");
//    window.indexedDB.deleteDatabase("db2");
    const openRequest = window.indexedDB.open("db2",1);
    openRequest.onerror = (event) => {
        console.log(event.target.error);
    };
    openRequest.onblocked = (event) => {
        console.log(event);
    }
    openRequest.onupgradeneeded = (event) => {
        console.log("oldVersion:" + event.oldVersion);
        console.log("newVersion:" + event.newVersion);
        switch (event.oldVersion) {
        case 0 : {
            // brand-new database
            console.log("brand-new");
        }
//        case 1 : {
//            // update 1 -> 2
//            console.log("1 -> 2");
//        }
//        case 2 : {
//            // update 2 -> 3
//            console.log("2 -> 3");
//        }
        }
    };
    openRequest.onsuccess = (event) => {
        console.log(event);
    };
    
};
