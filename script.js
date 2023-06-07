// ---------------------------------------------------------------Homepage article search bar

//Get input element
let filterInput = document.getElementById("filterInput");

//Add event listener
filterInput.addEventListener("keyup", filterNames);

function filterNames() {
    //get value of input
    let filterValue = document.getElementById("filterInput").value.toUpperCase();

    //get names ul
    let ol = document.getElementById("article-list");

    //get li from ul
    let li = ol.querySelectorAll("li.article-item");

    //loop through collection item li
    for (let i = 0; i < li.length; i++) {
        let a = li[i].getElementsByTagName("a")[0];

        // if match: find method tests each array item with an arrow function 
        //which returns a true or false, it returns the first array item that 
        //passes the test. if no array item found then it returns undefined. 
        //Inside IF statement, a value returned is considered true, and undefined is considered false
        if (articles[i].title.toUpperCase().indexOf(filterValue) > -1
            || articles[i].tags.find(
                (tag) => tag.toUpperCase().indexOf(filterValue) > -1
            )
        ) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }

}

// ---------------------------------------------------------------Populate article list in Homepage 
let articles;

function httpGet() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "articles.json", true); // false for synchronous request
    xmlHttp.onload = function () {
        if (this.status == 200) {
            articles = JSON.parse(xmlHttp.responseText).articles;
            let ol = document.getElementById("article-list");
            for (let i = 0; i < articles.length; i++) {
                const li = document.createElement("li");
                li.className = "article-item";
                const a = document.createElement("a");
                a.href = articles[i].url;
                a.textContent = articles[i].title;
                li.appendChild(a);
                ol.appendChild(li);
            }
        }
    }
    xmlHttp.send();
}
httpGet();


// ---------------------------------------------------------------Populate keyword / tag list in Homepage 

let tagList = [];

function getTagList() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "articles.json", true);
    xhr.onload = function () {
        if (this.status === 200) {
            articles = JSON.parse(xhr.responseText).articles;
            for (let i = 0; i < articles.length; i++) {
                let tags = articles[i].tags;
                let filterList = document.getElementById("filterList");
                for (const tag of tags) {
                    if (!tagList.includes(tag)) {
                        tagList.push(tag);
                        const btn = document.createElement("button");
                        btn.className = "filterButton";
                        btn.href = "#";
                        btn.textContent = tag;
                        filterList.appendChild(btn);
                        btn.addEventListener("click", () => filterByKeyword(btn));
                    }
                }
            }
        }
    }
    xhr.send();
}

getTagList();

// ---------------------------------------------------------------Homepage article filter by tag buttons

let filterButton = document.getElementsByClassName("filterButton");
let selectedTags = [];

function filterByKeyword(btn) {
    const tag = btn.textContent;
    btn.classList.toggle("selected");
    const isSelected = btn.classList.contains("selected");
    const articleItems = document.querySelectorAll(".article-item");


    const index = selectedTags.indexOf(tag);
    if (index === -1) {
        //tag Not inside selectedTags array
        if (isSelected) {
            selectedTags.push(tag);
        }
    } else {
        //tag inside selectedTags array
        if (!isSelected) {
            selectedTags.splice(index, 1);
        }
    }

    for (let i = 0; i < articles.length; i++) {
        // if the selectedTags array is empty, or, 
        // go through each tag of the ith article, and see if it's included in the selectedTags array
        // and if found in the find function, the first array item will be returned, and a returned value is considered true
        // if either is true, then display the ith article item
        if (selectedTags.length === 0 || articles[i].tags.find((t) => selectedTags.includes(t))) {
            articleItems[i].style.display = "";
        } else {
            articleItems[i].style.display = "none";
        }
    }
}

