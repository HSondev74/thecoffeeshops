let description =  document.getElementById("description");
let trademark =  document.getElementById("trademark");
let review =  document.getElementById("review");

document.getElementById("click-description").onclick = function () {
    console.log("test");
    description.style.display = 'block';
    review.style.display = 'none';
    trademark.style.display = 'none';
};
document.getElementById("click-trademark").onclick = function () {
    console.log("test")
    trademark.style.display = 'block';
    description.style.display = 'none';
    review.style.display = 'none';
};
document.getElementById("click-review").onclick = function () {
    review.style.display = 'block';
    description.style.display = 'none';
    trademark.style.display = 'none';
};