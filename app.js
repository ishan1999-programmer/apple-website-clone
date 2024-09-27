let nav_bar_items = document.querySelector(".big_nav").querySelectorAll("a");
let content = document.querySelector(".content");
let nav_modals = document.querySelector(".nav_modals")
let menu = document.querySelector("#menu");
let menu_modal = document.querySelector(".menu_modal");
let menu_close_button = document.querySelector("#menu_close_button");
let menu_items = document.querySelectorAll(".menu_items > :not(:first-child)");
let search_modal_small = document.querySelector(".search_modal_small");
let small_search_close_button = document.querySelector("#small_search_close_button");
let small_search = document.querySelector("#small_search");

nav_bar_items.forEach((val,idx)=>{
    if(idx!=0 && idx!=nav_bar_items.length-1 && idx!=nav_bar_items.length-2){
        val.addEventListener("mouseover" , open_modal);
    }
    else{
        val.addEventListener("click" , open_modal);
    }
});

content.addEventListener("mouseover" , close_modal);
document.addEventListener("mouseleave" , close_modal);

let prev_open_modal_class = "";
function open_modal(e){
    let open_modal_class = e.target.dataset.modal_linked;
    if(open_modal_class=="search_modal"){
        e.preventDefault();
    }
    if(prev_open_modal_class==""){
        document.querySelector(`.${open_modal_class}`).classList.replace("close_modal","open_modal");
    }
    else{
        document.querySelector(`.${prev_open_modal_class}`).classList.replace("open_modal","close_modal");
        document.querySelector(`.${open_modal_class}`).classList.replace("close_modal","open_modal");
    }
    content.style.filter = "blur(5px)";
    prev_open_modal_class = open_modal_class;
};

function close_modal(e) {
    if(prev_open_modal_class != ""){
        document.querySelector(`.${prev_open_modal_class}`).classList.replace("open_modal","close_modal");
        content.style.filter = "blur(0px)";
        prev_open_modal_class = "";
    }
}

let promise = fetch("https://raw.githubusercontent.com/pbakondy/ios-device-list/master/devices.json");

let all_items;
promise.then((response)=>response.json()).then((data)=>{
    [...all_items] = data;
});

let search_bar = document.querySelector("#search_bar");
let search_bar_small = document.querySelector("#search_bar_small");
let result_box = document.querySelector(".result_box");
let result_box_small = document.querySelector(".result_box_small");
let results = document.querySelector(".results");
let results_small = document.querySelector(".results_small");
let no_item_found_small = document.querySelector("#no_item_found_small");

search_bar.addEventListener("input" , show_results);
search_bar_small.addEventListener("input" , show_results_small);

function show_results(e){
    let searched_value = e.target.value.toLowerCase();
    if(searched_value==""){
        result_box.style.display = "none";
    }
    else{
        let matched_items = all_items.filter(val => val.name.toLowerCase().startsWith(searched_value));
        if(matched_items.length==0){
            results.innerHTML = "";
            no_item_found.style.display = "block";
        }
        else{
            no_item_found.style.display = "none";
            let matched_items_list = matched_items.map((val,idx) => idx<=8 ? `<li>${val.name}</li>` : "");
            results.innerHTML = `${matched_items_list.join("")}`;
        }
        result_box.style.display = "block";
    }
}

function show_results_small(e){
    let searched_value = e.target.value.toLowerCase();
    if(searched_value==""){
        result_box_small.style.display = "none";
    }
    else{
        let matched_items = all_items.filter(val => val.name.toLowerCase().startsWith(searched_value));
        if(matched_items.length==0){
            results_small.innerHTML = "";
            no_item_found_small.style.display = "block";
        }
        else{
            no_item_found_small.style.display = "none";
            let matched_items_list = matched_items.map((val,idx) => idx<=8 ? `<li>${val.name}</li>` : "");
            results_small.innerHTML = `${matched_items_list.join("")}`;
        }
        result_box_small.style.display = "block";
    }
}

menu.addEventListener("click" , (e)=>{
    e.preventDefault();
    menu_modal.classList.replace("close_modal" , "open_modal");
});

small_search.addEventListener("click" , (e)=>{
    e.preventDefault();
    search_modal_small.classList.replace("close_modal" , "open_modal");
});

menu_close_button.addEventListener("click" , ()=>{
    menu_modal.classList.replace("open_modal" , "close_modal");
});

small_search_close_button.addEventListener("click" , ()=>{
    search_modal_small.classList.replace("open_modal" , "close_modal");
});

menu_items.forEach((val)=>{
    val.addEventListener("mouseover", show_image);
    val.addEventListener("mouseleave" , hide_image);
});

function hide_image(e){    
    document.querySelector(`#${e.currentTarget.id} img`).style.opacity = 0;
};


function show_image(e){    
    document.querySelector(`#${e.currentTarget.id} img`).style.opacity = 1;
};

let footer_content_middle_small_buttons = document.querySelectorAll(".footer_content_middle_small > * > button");
footer_content_middle_small_buttons.forEach((button)=>{
    button.addEventListener("click" , ()=>{
        document.querySelector(`#${button.id} img`).classList.toggle("rotate");
        if(button.nextElementSibling.classList.contains("close")){
            button.nextElementSibling.classList.replace("close" , "open");
        }
        else{
            button.nextElementSibling.classList.replace("open" , "close"); 
        }
    });
})














