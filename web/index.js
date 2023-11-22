//function send() {
//    console.log("送信");
//}

window.onload = (e) => {
    document.querySelector(".sendbutton").addEventListener("click",(event) => {
        console.log("送信");
//        {
//            let req = new XMLHttpRequest();
//            req.open("GET", "/get1", false);
//            req.send();
//            console.log(req.responseText);
//        }
        {
            let req = new XMLHttpRequest();
            req.open("GET", "/get1");
            req.onload = (event) => {
                console.log(req.responseText);
            };
            req.send();
        }
    });
};
