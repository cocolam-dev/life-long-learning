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
        // console.log(articles);
    }
    xmlHttp.send();
}

httpGet();
