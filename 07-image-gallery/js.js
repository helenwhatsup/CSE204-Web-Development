var a = document.getElementsByClassName("photo");
var expandimg = document.getElementById("expandimg");
var index = 1;

function enlarge(inputImage) {
    expandimg.src = inputImage.src;
    expandimg.parentElement.style.display = "block";

    var prev = document.getElementById("prevButton");
    prev.style.display = "inline-block";
    prev.style.position = "absolute";
    prev.style.left = "800px";

    var next = document.getElementById("nextButton");
    next.style.display = "inline-block";
    next.style.position = "absolute";
    next.style.left = "600px";
}

function change(n) {
    index +=n;
    prevOrNext(index);
}
function prevOrNext(n) {
    console.log(a.length);
    if (n > a.length) { 
        index = 1; 
    }
    else if (n < 1) {
        index = a.length;
    }
    expandimg.src = a[index - 1].getAttribute("src");
}






