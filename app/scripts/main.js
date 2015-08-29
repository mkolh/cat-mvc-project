var cats = cats || [];


//Cat constructor
function Cat(name, url){
	
	var newCat = this;

	newCat.name = name || "NO NAME";
	newCat.url = url || "http://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg";

	console.log(newCat);
}


//addCat function
function addCat(name, url){

	var newCats = new Cat(name, url);

	cats.push(newCats);
}

/*---------Test Array---------*/

addCat("Tim", "http://www.washingtonpost.com/news/morning-mix/wp-content/uploads/sites/21/2014/09/Grumpy_Cat_Endorsement-017d7-ULFU.jpg");
addCat("Tom", "http://scienceblogs.com/gregladen/files/2012/12/Beautifull-cat-cats-14749885-1600-1200.jpg");
addCat("Bob", "http://s.hswstatic.com/gif/whiskers-sam.jpg");
addCat();
addCat("Brett", "http://www.wchs4pets.org/wp-content/uploads/2015/03/cat_1-jpg.jpg");

/*---------/Test Array---------*/




//rendering

var catHolderMaster = document.getElementById("current-cats");


function createNavBar (arr) {
	//creat nav bar

	var navBar = makeElem('div', 'row');

	//populate nav bar

	for (var i = arr.length - 1; i >= 0; i--) {
		
		var catHolder = makeElem('div', 'col-md-3');

		var catButt = makeElem('button', 'btn', 'btn-primary');

		var catName = document.createTextNode(arr[i].name);

		catButt.appendChild(catName);

		//add event listener

		catButt.addEventListener('click', selectNewCat(i));


		//finish appending
		catHolder.appendChild(catButt);

		navBar.appendChild(catHolder);
	};
    

    /*add event listeners*/

    //function to use
    function selectNewCat(i){
    	return function(){    		

    		renderCat(cats[i]); 
    	}
    }


    //apend
    catHolderMaster.appendChild(navBar);
}




//render//

//master iife
(function render(cats){
	//rendering
	createNavBar(cats);
})(cats);

//new cat loader

function renderCat(cat){

	//clear current
	//test for selected-cat and delete if true

	var testForCat = document.getElementById("selected-cat");

	if(testForCat){
		testForCat.parentNode.removeChild(testForCat);
	}

	//add new cat, maby hardcode the row later

	var selectedCatHolder = makeElem('div', 'row');
	selectedCatHolder.setAttribute('id', 'selected-cat');

	var newCat = makeElem('div', 'col-md-12');

	var newCatName = document.createTextNode(cat.name);
	newCat.appendChild(newCatName);

	var newCatImage = makeElem('img', 'img-rounded');
	newCatImage.setAttribute('src', cat.url);


	selectedCatHolder.appendChild(newCat);
	selectedCatHolder.appendChild(newCatImage);

	//append cat to dom
	var container = document.getElementById('container');
	container.appendChild(selectedCatHolder);

}



//helper functions

//make a base element + attribute setter, accept an name, than just an argument of objects ie. {id: 'test', src: 'test2', class: 'big smal etc'};

//create element
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