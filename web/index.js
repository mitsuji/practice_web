// * Promise イベントハンドラベースのコード群を逐次的に記述するための道具
//   * コールバック地獄対策
//   * 計算結果を次の処理に渡す
//   * 例外をコード群全体の catch ブロックになげる
//
// * async/await Promise を組み合わせたコード群を通常のコードのように記述するための道具
//   * async Promise の 自動作成
//     * return -> resolveの呼び出し
//     * throw -> rejectの呼び出し
//   * Promiseの呼び出し は await をつけると 自動的に .then
//   * Promise以外は 自動的に .then
//   * await に対する try/catch .catch


function foo (p) {
    return new Promise((resolve,reject) => {
//        reject("foo");
        resolve(p + 2);
    });
}
function bar (p) {
    return new Promise((resolve,reject) => {
//        reject("bar");
        resolve(p * 3);
    });
}


function baz1 () {
    return new Promise((resolve,reject) => {
        resolve(1);
    })
//        .then((p) => {throw "baz1";})
        .then(foo)
        .then((p) => {return p + 1;})
//        .then((p) => {throw "baz2";})
        .then(bar)
//        .then((p) => {throw "baz3";})
}

async function baz2 () {
    let r = await 1;
//    throw "baz1";
    r = await foo(r);
    r = r + 1;
//    throw "baz2";
    r = await bar(r);
//    throw "baz3";
    return r;
}


function addOne(value) {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(value +1);
        },2100);
    });
}

function addThree(value) {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(value +3);
        },2000);
    });
}

function mulTwo(value) {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(value *2);
        },2100);
    });
}

function mulThree(value) {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(value *3);
        },2100);
    });
}


function calcAPromise (value) {
    return addOne(value)
        .then ((v) => addThree(v))
        .then (mulTwo)
        .then (mulThree);
}

async function calcAAsync (value) {
    let v = await addOne(value);
    v = await addThree(v);
    v = await mulTwo(v);
    v = await mulThree(v);
    return v;
}



function calcB1Promise (value) {
    return addOne(value)
        .then ((v) => addThree(v));
}
function calcB2Promise (value) {
    return mulTwo(value)
        .then (mulThree);
}
function calcBPromise (value) {
    return calcB1Promise(value)
        .then (calcB2Promise);
}
async function calcBBPromise (value) {
    let v = await calcB1Promise(value);
    return await calcB2Promise(v);
}

async function calcB1Async (value) {
    let v = await addOne(value);
    return await addThree(v);
}
async function calcB2Async (value) {
    let v = await mulTwo(value);
    return await mulThree(v);
}
async function calcBAsync (value) {
    let v = await calcB1Async(value);
    return await calcB2Async(v);
}
function calcBBAsync (value) {
    return calcB1Async(value)
        .then(calcB2Async);
}







window.onload = (e) => {
    document.querySelector(".sendbutton").addEventListener("click",(event) => {
//        calcAPromise(2)
//            .then((result) => {
//                console.log("result:" + result);
//            });
//        calcAAsync(2)
//            .then((result) => {
//                console.log("result:" + result);
//            });
//        calcBPromise(2)
//            .then((result) => {
//                console.log("result:" + result);
//            });
//        calcBAsync(2)
//            .then((result) => {
//                console.log("result:" + result);
//            });
        calcBBPromise(2)
            .then((result) => {
                console.log("result:" + result);
            });
//        calcBBAsync(2)
//            .then((result) => {
//                console.log("result:" + result);
//            });

//        Promise.all([addOne(2),addThree(2),mulTwo(2),mulThree(2)])
//            .then((arrayx) => {
//                console.log(arrayx);
//            });
//        Promise.any([addOne(2),addThree(2),mulTwo(2),mulThree(2)])
//            .then((val) => {
//                console.log(val);
//            });
//        Promise.race([addOne(2),addThree(2),mulTwo(2),mulThree(2)])
//            .then((val) => {
//                console.log(val);
//            });


//        baz1()
//            .then((result) => {
//                console.log("result:" + result);
//            })
//            .catch((error) => {
//                console.log("error:" + error);
//            });
//        try {
//            let result = await baz2();
//            console.log("result:" + result);
//        } catch (error) {
//            console.log("error:" + error);
//        }
    });
//    document.querySelector(".sendbutton").addEventListener("click",(event) => {
//        console.log("送信");
////        {
////            document.querySelector(".content1").innerHTML = "Content1!!";
////            let req = new XMLHttpRequest();
////            req.open("GET", "/get1", false);
////            req.send();
////            document.querySelector(".content2").innerHTML = req.responseText;
////            document.querySelector(".content3").innerHTML = "Content3!!";
////        }
//        {
//            document.querySelector(".content1").innerHTML = "Content1!!";
//            let req = new XMLHttpRequest();
//            req.open("GET", "/get1");
//            req.onload = (event) => {
//                try {
//                    document.querySelector(".content2").innerHTML = req.responseText;
//                    throw "error1";
//                } catch (error) {
//                    console.log("error:" + error);
//                }
//            };
//            req.send();
//            document.querySelector(".content3").innerHTML = "Content3!!";
//        }
//    });
};
