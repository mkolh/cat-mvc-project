//view and model current speak directly to one another. Need to fix.
//basically the  "octopus" listens for event listeners and runs the render function


/* ------ MODEL ----- */


	var cats = cats || [];


	//Cat constructor
	function Cat(name, url) {

	    var newCat = this;

	    newCat.name = name || "NO NAME";
	    newCat.url = url || "http://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg";
	    newCat.clicks = 0;
	}


	/*--Test Array--*/

	//addCat function, only used for initial test array
	function addCat(name, url) {

	    var newCats = new Cat(name, url);

	    cats.push(newCats);
	}
	
	addCat("Tim", "http://www.washingtonpost.com/news/morning-mix/wp-content/uploads/sites/21/2014/09/Grumpy_Cat_Endorsement-017d7-ULFU.jpg");
	addCat("Tom", "http://scienceblogs.com/gregladen/files/2012/12/Beautifull-cat-cats-14749885-1600-1200.jpg");
	addCat("Bob", "http://s.hswstatic.com/gif/whiskers-sam.jpg");
	addCat();
	addCat("Brett", "http://www.wchs4pets.org/wp-content/uploads/2015/03/cat_1-jpg.jpg");

	/*--/Test Array--*/


/* ------ /MODEL ----- */




/* ------ VIEWS ----- */

	function createNavBar(arr) {
	    //creat nav bar

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
	    function selectNewCat(i) {
	        return function () {
	            renderCat(cats[i]);
	        }
	    }


	    //return complete navBar object to be appended
	    return navBar;
	}
	//selected cat
	function createCat(cat) {
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

	    selectedCatHolder.addEventListener('click', function () {
	        cat.clicks++;
	        renderCat(cat);
	    });

	    return selectedCatHolder;
	}
/* ------ /VIEWS ----- */




/* ------ CONTROLLER(ISH) ----- */

	var catHolderMaster = document.getElementById("current-cats");


	(function init() {
	    //render nav bar
	    renderNavBar();

	    //add event listener to add cat button
	    var button = document.getElementById('new-cat-button');
	    button.addEventListener('click', function () {
	        newCatMachine();
	    });

	})();

	//controller will do the actual clearing and appending to the dom
	function renderNavBar() {
	    //if navBar, delete
	    var oldNav = document.querySelector('.cat-nav-bar');

	    if (oldNav) {
	        oldNav.parentNode.removeChild(oldNav);
	    }

	    var newNavBar = createNavBar(cats);

	    catHolderMaster.appendChild(newNavBar);

	}

	//selected cat render
	function renderCat(cat) {

	    var container = document.getElementById('container');

	    //clear current by testing for selected-cat and delete if true

	    var testForCat = document.getElementById("selected-cat");

	    if (testForCat) {
	        testForCat.parentNode.removeChild(testForCat);
	    }

	    //append cat to dom
	    var newCat = createCat(cat);
	    container.appendChild(newCat);

	}
	//creating new cat, pulling data from view to amend model and than refreshing view
	//will occur in controller
	//create new cat adding input (could easily modify to accept other types of animals/constructors)
	function newCatMachine() {
	    //event listener already added to button in initial render

	    //select inputs and button
	    var name = document.getElementById("new-cat-name").value;
	    var url = document.getElementById('new-cat-url').value;

	    //add to model using constructor
	    var newCat = new Cat(name, url);
	    cats.push(newCat);

	    //rerender nav
	    renderNavBar();

	}

/* ------ /CONTROLLER(ISH) ----- */









//helper functions

//make a base element + attribute setter, accept an name, than just an argument of objects ie. {id: 'test', src: 'test2', class: 'big smal etc'};

//create element
//will take unlimited classes
//no id, no parent, no text
function makeElem(elemType, classesToAdd) {

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