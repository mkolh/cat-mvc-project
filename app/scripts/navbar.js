function createNavBar (arr) {
	//creat nav bar

	var navBar = makeElem('div', 'row');

	//populate nav bar

	for (var i = arr.length - 1; i >= 0; i--) {
		
		var catHolder = makeElem('div', 'col-md-4');

		var catName = document.createTextNode(arr[i]);

		catHolder.appendChild(catName);

		navBar.appendChild(catHolder);
	};
    
    document.body.appendChild(navBar);
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

var cats = ["fido", "bob"];

createNavBar(cats);


// how to make parent function
// function makeElemWithParent (parent){
// return makeElem();
// }