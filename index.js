let artObj = {
    art: []
};
let json;
// var fs = require('fs');
let IDgenerateMoreImages = 0;
//get View
const UIview = document.querySelector('#view');
//setNoArticlesMessage
setNoArticlesMessage();
//get Form
const UIform = document.querySelector('form');
//get numArticles Navbar Badge
const UInumArticles = document.querySelector('#numArticles');
console.log(UInumArticles);
//form submission + add article (btn)
UIform.addEventListener('submit', postArticle);
//delete all (btn)
const UIbtnDeleteAll = document.querySelector('#btnDeleteAll');
UIbtnDeleteAll.addEventListener('click', deleteArticles);
//Article Numbers
if ((localStorage.getItem('numArticles') === null) || (localStorage.getItem('numArticles') === 0)) {

    let numArticles = 0;
    localStorage.setItem('numArticles', numArticles);

} else {

    let UInumArticles = JSON.parse(localStorage.getItem('numArticles'));
    let arrArticles = [];
    for (i = 0; i <= numArticles; i++) {

        UIview.innerHTML = `${JSON.parse(localStorage.getItem(`numArticles ${i}`))}`;
    }
}


UInumArticles.innerHTML = '';
UInumArticles.appendChild(document.createTextNode(numArticles));


//Post an Article
function postArticle(e) {
    e.preventDefault();

    //remove No Articles message when you enter the 1st one
    if (numArticles === 0 || numArticles === null) {
        //Deletes the html article that is predefined
        UIview.innerHTML = '';
    }

    //create the Article - createArticle();
    arr = createArticle();
    console.log('arr0', arr[0], 'arr1', arr[1]);
    divCard = arr[0];
    IDgenerateMoreImages = arr[1];
    localStorage.setItem(`article ${numArticles}`, JSON.stringify(divCard));

    //Post the Constructed Article
    UIview.appendChild(divCard);
    console.log(divCard);
    artObj.art.push(divCard);
    console.log('art', artObj.art);
    json = JSON.stringify(artObj);
    console.log('json', json);
    // fs.writeFile('art.json', json, 'utf8', callback);

    //increase articles number ??????????????
    numArticles = numArticles + 1;
    localStorage.setItem(`numArticles`, numArticles);
    UInumArticles.innerHTML = '';
    UInumArticles.appendChild(document.createTextNode(numArticles));

    //delete values ??????????????????????
    document.querySelector('#inputTitle').innerHTML.value = '';
    document.querySelector('#inputContent').innerHTML.value = '';
    document.querySelector('#inputSubject').innerHTML.value = '';
}

//Delete Articles List (Empty #View)
function deleteArticles(e) {
    e.preventDefault();
    if (confirm('Are you sure you want to DELETE everying?')) {

        //delete all articles
        console.log('deleted everything');
        setNoArticlesMessage();

        //reset Local Storage
        localStorage.clear();
        //reset Number of Articles in #View
        numArticles = 0;
        localStorage.setItem('numArticles', numArticles);
        //reset ?Sig=
        IDgenerateMoreImages = 0;
        //reset Number of Articles in #Navbar
        UInumArticles.innerHTML = '';
        UInumArticles.appendChild(document.createTextNode(numArticles));
    }

}

//Set starting Message - No Articles
function setNoArticlesMessage() {
    UIview.innerHTML = '<h2>You have no Articles</h2>';
}

//Create an Article
function createArticle() {
    // Create Elements and Add Classes
    const divCard = document.createElement('div');
    divCard.className = 'card my-3';
    const divRow = document.createElement('div');
    divRow.className = 'row';
    const divImg = document.createElement('div');
    divImg.className = 'div-img col-lg-4';
    const divCardBody = document.createElement('div');
    divCardBody.className = "card-body col-lg-8";
    let img = document.createElement('img');
    img.className = "card-img-top";
    const h4 = document.createElement('h4');
    h4.className = 'card-title'
    const p = document.createElement('p');
    p.className = 'card-text';
    const a = document.createElement('a');
    a.className = 'btn btn-success';
    a.style.color = "#fff";

    //Assemble Elements
    divCard.appendChild(divRow);
    divRow.appendChild(divImg);
    divRow.appendChild(divCardBody);
    divImg.appendChild(img);
    divCardBody.appendChild(h4);
    divCardBody.appendChild(p);
    divCardBody.appendChild(a);

    //get Values
    let valueTitle = document.querySelector('#inputTitle').value;
    let valueContent = document.querySelector('#inputContent').value;
    let valueSubject = document.querySelector('#inputSubject').value;

    //increase ?Sig=
    IDgenerateMoreImages += 1;

    //Put the content
    img.setAttribute('src', `https://source.unsplash.com/random/600x450?${valueSubject}&sig=${IDgenerateMoreImages}`);
    h4.appendChild(document.createTextNode(valueTitle));
    p.appendChild(document.createTextNode(valueContent));
    a.appendChild(document.createTextNode('Read More'));
    console.log('divCard: ', divCard);
    console.log('img src: ', img.getAttribute('src'));
    return [divCard, IDgenerateMoreImages];
}