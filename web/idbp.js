
function dbExecute(request) {
    return new Promise((resolve,reject) => {
        request.onerror = (event) => {
            reject(event.target.error);
        };
        request.onsuccess = (event) => {
            resolve(event.target.result);
        };
    });
}

function dbTraverse(request, onCursor) {
    return new Promise((resolve,reject) => {
        request.onerror = (event) => {
            reject(event.target.error);
        };
        request.onsuccess = (event) => {
            let cursor = event.target.result;
            if (cursor) {
                onCursor(cursor);
                cursor.continue();
            } else {
                resolve();
            }
        };
    });
}


function dbGet(db, store, key) {
    return new Promise((resolve,reject) => {
        let results = [];
        const tran = db.transaction([store]);
        const request = tran.objectStore(store).get(key);
        request.onerror = (event) => {
            reject(event.target.error);
        };
        request.onsuccess = (event) => {
            resolve(event.target.result);
        };
    });
}


// [TODO] pagesize, page
function dbFind(db, store, cond) {
    return new Promise((resolve,reject) => {
        let results = [];
        const tran = db.transaction([store]);
        const request = tran.objectStore(store).openCursor();
        request.onerror = (event) => {
            reject(event.target.error);
        };
        request.onsuccess = (event) => {
            let cursor = event.target.result;
            if (cursor) {
                if (cond(cursor.value)) {
                    results.push(cursor.value);
                }
                cursor.continue();
            } else {
                resolve(results);
            }
        };
    });
}

function dbAdd(db, store, value, key) {
    return new Promise((resolve,reject) => {
        let results = [];
        const tran = db.transaction([store],"readwrite");
        const request = tran.objectStore(store).add(value,key);
        request.onerror = (event) => {
            reject(event.target.error);
        };
        request.onsuccess = (event) => {
            resolve();
        };
    });
}




function dbTransaction(tran, withTransaction) {
    return new Promise((resolve,reject) => {
        tran.onerror = (event) => {
            reject("transaction error...");
        };
        tran.onabort = (event) => {
            reject("transaction aborted...");
        };
        tran.oncomplete = (event) => {
            resolve();
        };
        withTransaction(tran)
            .catch((error) => {
                console.error(error);
                tran.abort();
            });
    });
}

function dbOpen(name, version, onUpgradeneeded) {
    return new Promise((resolve,reject) => {
        const request = window.indexedDB.open(name,version);
        request.onerror = (event) => {
            reject("opendb error...");
        };
        request.onblocked = (event) => {
            reject("opendb blocked...");
        }
        request.onupgradeneeded = onUpgradeneeded;
        request.onsuccess = (event) => {
            resolve(event.target.result);
        };
    });
}

