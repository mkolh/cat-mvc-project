var cats = cats || [];


//Cat constructor
function Cat(name, url){
	
	var newCat = this;

	newCat.name = name || "NO NAME";
	newCat.url = url || "http://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg";
	newCat.clicks = 0;
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

//render//

//master iife
(function render(cats){
	//rendering
	createNavBar(cats);

	//add event listener to add cat button
	var button = document.getElementById('new-cat-button');
	button.addEventListener('click', function(){
		newCatMachine();
	});

})(cats);


function createNavBar (arr) {
	//creat nav bar

	//if navBar, delete
	var oldNav = document.querySelector('.cat-nav-bar');

	if(oldNav){
		oldNav.parentNode.removeChild(oldNav);
	}

	var navBar = makeElem('div', 'row', 'cat-nav-bar');

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

//create new cat adding input (could easily modify to accept other types of animals/constructors)
function newCatMachine(){
	//event listener already added to button in initial render

	//select inputs and button
	var name = document.getElementById("new-cat-name").value;
	var url = document.getElementById('new-cat-url').value;

	var newCat = new Cat(name, url);
	cats.push(newCat);

	createNavBar(cats);

}
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

	var newCatClicks = document.createTextNode(cat.clicks + " Clicks");


	selectedCatHolder.appendChild(newCat);
	selectedCatHolder.appendChild(newCatImage);
	selectedCatHolder.appendChild(newCatClicks);

	selectedCatHolder.addEventListener('click', function(){
		cat.clicks++;
		renderCat(cat);
	});

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
