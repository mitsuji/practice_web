
window.onload = (e) => {
    document.querySelector(".sendbutton").addEventListener("click",(event) => {
        console.log("送信");
//        {
//            document.querySelector(".content1").innerHTML = "Content1!!";
//            let req = new XMLHttpRequest();
//            req.open("GET", "/get1", false);
//            req.send();
//            document.querySelector(".content2").innerHTML = req.responseText;
//            document.querySelector(".content3").innerHTML = "Content3!!";
//        }
        {
            document.querySelector(".content1").innerHTML = "Content1!!";
            let req = new XMLHttpRequest();
            req.open("GET", "/get1");
            req.onload = (event) => {
                document.querySelector(".content2").innerHTML = req.responseText;
            };
            req.send();
            document.querySelector(".content3").innerHTML = "Content3!!";
        }
    });
};
