
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
                onCursor(cursor.value);
                cursor.continue();
            } else {
                resolve();
            }
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
        const request = window.indexedDB.open("db1",1);
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

