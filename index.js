let IDgenerateMoreImages = 0;
//get View
const UIview = document.querySelector('#view');
//setNoArticlesMessage
setNoArticlesMessage();
//get Form
const UIform = document.querySelector('form');
//form submission + add article (btn)
UIform.addEventListener('submit', postArticle);
//delete all (btn)
const UIbtnDeleteAll = document.querySelector('#btnDeleteAll');
UIbtnDeleteAll.addEventListener('click', deleteArticles);
//Article Numbers
let numArticles = 0;
const UInumArticles = document.querySelector('#numArticles');
UInumArticles.appendChild(document.createTextNode(numArticles));

function postArticle(e) {
    e.preventDefault();

    //remove No Articles message when you enter the 1st one
    if (numArticles === 0) {
        UIview.innerHTML = '';
    }

    // Create Elements and Add Classes
    const divCard = document.createElement('div');
    divCard.className = 'card my-3';
    const divRow = document.createElement('div');
    divRow.className = 'row';
    const divImg = document.createElement('div');
    divImg.className = 'div-img col-lg-4';
    const divCardBody = document.createElement('div');
    divCardBody.className = "card-body col-lg-8";
    const img = document.createElement('img');
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

    //Put the content
    IDgenerateMoreImages += 1;
    img.setAttribute('src', `https://source.unsplash.com/random/600x450?${valueSubject}&sig=${IDgenerateMoreImages}`);
    h4.appendChild(document.createTextNode(valueTitle));
    p.appendChild(document.createTextNode(valueContent));
    a.appendChild(document.createTextNode('Read More'));

    //Post the Constructed Article
    UIview.appendChild(divCard);
    console.log(divCard);
    console.log(img.getAttribute('src'));

    //increase articles number ??????????????
    numArticles = numArticles + 1;
    UInumArticles.appendChild(document.createTextNode(numArticles));

    //delete values ??????????????????????
    document.querySelector('#inputTitle').innerHTML = '';
    document.querySelector('#inputContent').innerHTML = '';
    document.querySelector('#inputSubject').innerHTML = '';
}

function deleteArticles(e) {
    e.preventDefault();
    if (confirm('Are you sure you want to DELETE everying?')) {

        //delete all articles
        console.log('deleted everything');
        setNoArticlesMessage();

        //reset article num
        numArticles = 0;
        IDgenerateMoreImages = 0;
        UInumArticles.appendChild(document.createTextNode(numArticles));
    }

}

function setNoArticlesMessage() {
    UIview.innerHTML = '<h2>You have no Articles</h2>';
}