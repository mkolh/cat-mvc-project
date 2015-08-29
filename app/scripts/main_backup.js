// jshint devel:true
console.log('\'Allo \'Allo!');
var catURLs = ["http://www.washingtonpost.com/news/morning-mix/wp-content/uploads/sites/21/2014/09/Grumpy_Cat_Endorsement-017d7-ULFU.jpg", "http://scienceblogs.com/gregladen/files/2012/12/Beautifull-cat-cats-14749885-1600-1200.jpg", "http://s.hswstatic.com/gif/whiskers-sam.jpg",
    "http://www.wchs4pets.org/wp-content/uploads/2015/03/cat_1-jpg.jpg"];

var catHolderMaster = document.getElementById("current-cats");

function createElementsSetIDs(arr, callback) {


    for (var i = 0; i < arr.length; i++) {

    	//boot strap features
    	var bootDiv = document.createElement("div");
    	bootDiv.setAttribute('class', 'col-md-4');


        var divName = document.createElement("div");
        var divNameContent = document.createTextNode("Cat " + (i + 1));
        divName.appendChild(divNameContent);

        var img = document.createElement('img');

        var span = document.createElement("span");
        var spanContent = document.createTextNode("0");
        span.appendChild(spanContent);
        var divCount = document.createElement("div");
        var divCountContent = document.createTextNode(" Clicks");
        divCount.appendChild(span);
        divCount.appendChild(divCountContent);

        divName.setAttribute('class', 'name');

        img.setAttribute('class', 'cat-pic');
        img.setAttribute('src', arr[i]);


        divCount.setAttribute('class', 'click-count clickCat' + (i + 1));


        bootDiv.appendChild(divName);
        bootDiv.appendChild(img);
        bootDiv.appendChild(divCount);

        catHolderMaster.appendChild(bootDiv);

    }
    
    if(callback)callback();
}

function addClick(i) {
    return function () {
        var span = document.querySelector('.clickCat' + (i + 1)).firstElementChild;
        span.innerHTML = parseInt(span.innerHTML) + 1;
    }
}
//same function for all pics.
function setEventHandlers() {
    var pics = document.querySelectorAll('img');

    for (var i = 0; i < pics.length; i++) {
        var pic = pics[i];

        pic.addEventListener('click', addClick(i));
    }
}

function createNavBar (arr) {
	//creat nav bar

	var navBar = makeElem('div', 'row');

	//populate nav bar

	for (var i = arr.length - 1; i >= 0; i--) {
		
		var catHolder = makeElem('div', 'col-md-3');

		var catButt = makeElem('button', 'btn', 'btn-primary');

		var catName = document.createTextNode(arr[i]);

		catButt.appendChild(catName);

		catHolder.appendChild(catButt);

		navBar.appendChild(catHolder);
	};
    
    catHolderMaster.appendChild(navBar);
}

//helper function
//will take unlimited classes
//no id, no parent, no text
function makeElem (elemType, classesToAdd){

	var classes = [];
	//extract classes
	for (var i = arguments.length - 1; i > 0; i--) {
		classes.push(arguments[i]);
	};

	classes = classes.join(" ");

	var elem = document.createElement(elemType);
	elem.setAttribute('class', classes);

	return elem;
	//remember to append them!!!
}

var cats = ["fido", "bob", "fuzzy", "billy", "stever", "tom"];

createNavBar(cats);


// how to make parent function
// function makeElemWithParent (parent){
// return makeElem();
// }

createElementsSetIDs(catURLs, setEventHandlers);


//create master cat object, render from that
