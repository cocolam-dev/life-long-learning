// ---------------------------------------------------------------Homepage article search bar

//Get input element
let learnFilterInput = document.getElementById("learn-filter-input");
let playFilterInput = document.getElementById("play-filter-input");

//Add event listener
learnFilterInput.addEventListener("keyup", () => filterNames("learn-filter-input", "learn-list", "learnItem", learnArticles));
playFilterInput.addEventListener("keyup", () => filterNames("play-filter-input", "play-list", "playItem", playArticles));

function filterNames(filterInputId, ulId, liClassName, articles) {
    //get value of input
    let filterValue = document.getElementById(filterInputId).value.toUpperCase();

    //get names ul
    let ul = document.getElementById(ulId);

    //get li from ul
    let li = ul.querySelectorAll("li." + liClassName);

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


// ---------------------------------------------------------------Populate article list in Homepage using AJAX
// let articles;
//
// function httpGet() {
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.open("GET", "articles.json", true); // false for synchronous request
//     xmlHttp.onload = function () {
//         if (this.status == 200) {
//             articles = JSON.parse(xmlHttp.responseText).articles;
//             let ul = document.getElementById("article-list");
//             for (let i = 0; i < articles.length; i++) {
//                 const li = document.createElement("li");
//                 li.className = "article-item";
//                 const a = document.createElement("a");
//                 a.href = articles[i].url;
//                 a.textContent = articles[i].id + " - " + articles[i].title;
//                 li.appendChild(a);
//                 ul.appendChild(li);
//             }
//         }
//     }
//     xmlHttp.send();
// }
// httpGet();
// ---------------------------------------------------------------Populate article list in Homepage using Fetch API

// let articles;

// function populateArticleList() {
//     let ul = document.getElementById("article-list");
//     fetch("articles.json")
//         .then(
//             res => res.json())
//         .then((data) => {
//             data.articles.forEach(function (article) {
//                 const li = document.createElement("li");
//                 li.className = "article-item";
//                 const a = document.createElement("a");
//                 a.href = article.url;
//                 a.textContent = article.id + " - " + article.title;
//                 li.appendChild(a);
//                 ul.appendChild(li);
//             })
//         }).catch(err => console.log("Oops! "+err));
// }

// populateArticleList();



// ---------------------------------------------------------------Populate appreciate article list in Homepage using Fetch API

// let appreciateArticles;

function populateArticleListA() {
    let ulA = document.getElementById("article-listA");
    fetch("articles.json")
        .then(
            res => res.json())
        .then((data) => {
            data.appreciate.forEach(function (article) {
                const liA = document.createElement("li");
                liA.className = "article-itemA";
                const aA = document.createElement("a");
                aA.href = article.url;
                aA.textContent = article.id + " - " + article.title;
                liA.appendChild(aA);
                ulA.appendChild(liA);
            })
        }).catch(err => console.log("Oops! " + err));
}

populateArticleListA();

// ---------------------------------------------------------------Populate article lists in Homepage using Fetch API


function populateArticleList(jsonFile) {

    fetch(jsonFile)
        .then(
            res => res.json())
        .then((data) => {

            populate(data.learn, "learn-list", "learnItem");
            populate(data.play, "play-list", "playItem");

        }).catch(err => console.log("Oops! " + err));
}

function populate(posts, listId, liClassName) {
    let ul = document.getElementById(listId);
    posts.forEach(function (post) {
        const li = document.createElement("li");
        li.className = liClassName;
        const a = document.createElement("a");
        a.href = post.url;
        a.textContent = post.id + " - " + post.title;
        li.appendChild(a);
        ul.appendChild(li);
    });
}


populateArticleList("articles.json");

// ---------------------------------------------------------------Populate keyword / tag list in Homepage 

let learnArticles = [];
let playArticles = [];
let learnTagList = [];
let playTagList = [];

let learnSelectedTags = [];
let playSelectedTags = [];


function getTagList() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "articles.json", true);
    xhr.onload = function () {
        if (this.status === 200) {
            let resText = JSON.parse(xhr.responseText);
            learnArticles = resText.learn;
            playArticles = resText.play;
            generateTagBtns(resText.learn, "learn-filter-list", learnTagList, "#learn-list li", learnSelectedTags);
            generateTagBtns(resText.play, "play-filter-list", playTagList, "#play-list li", playSelectedTags);
        }
    }
    xhr.send();
}


function generateTagBtns(articles, filterListId, tagList, articleItemsSelector, selectedTags) {

    for (let i = 0; i < articles.length; i++) {
        let tags = articles[i].tags;
        let filterList = document.getElementById(filterListId);
        for (const tag of tags) {
            if (!tagList.includes(tag)) {
                tagList.push(tag);
                const btn = document.createElement("button");
                btn.className = "filterButton";
                btn.href = "#";
                btn.textContent = tag;
                filterList.appendChild(btn);
                btn.addEventListener("click", () => filterByKeyword(btn, articleItemsSelector, selectedTags, articles));
            }
        }
    }
}

getTagList();


// ---------------------------------------------------------------Homepage article filter by tag buttons





function filterByKeyword(btn, articleItemsSelector, selectedTags, articles) {
    const tag = btn.textContent;
    btn.classList.toggle("selected");
    const isSelected = btn.classList.contains("selected");
    const articleItems = document.querySelectorAll(articleItemsSelector);


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

