// funtion search

function searchProducts(){
    let searchInput = document.getElementById("search-input").value;
    let test = document.getElementById("test");
    if(test.innerText.includes(searchInput)){
        document.getElementById("coffee").style.display = "none"; 
    }
    
}
//
function gotoPage2(){
    document.getElementById("deleteBlock").style.display = "none";
    document.getElementById("pagination_2").style.display = "flex";
    document.getElementById("count").innerText = "2";
}

// function category

let caphehat = document.getElementById("caphehat");

caphehat.onclick = function (){
    document.getElementById("deleteBlock").style.display = "none";
    document.getElementById("pagination").style.display = "none";
    document.getElementById("block_caphehat").style.display = "flex"
}

// hover search
const shop_item = Array.from(document.querySelectorAll(".products-item"));
const search_input_user = document.getElementById("search-input");


function search_click(e) {
    e.preventDefault();
    // ấn hiện key
    shop_item.forEach(function (el) {
        let text = el.innerText.toLowerCase();
        if (text.indexOf(search_input_user.value) > -1) {
            // el.style.display=""
            el.classList.remove("search_shop");
        } else {
            // el.style.display="none"
            // el.classList.remove = "search_shop"
            el.className = "search_shop";
        }
    });
}

document.getElementById("search-click-shop").addEventListener("submit", search_click);
