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



window.onload = (e) => {
    document.querySelector(".sendbutton").addEventListener("click",async(event) => {
        baz1()
            .then((result) => {
                console.log("result:" + result);
            })
            .catch((error) => {
                console.log("error:" + error);
            });
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
