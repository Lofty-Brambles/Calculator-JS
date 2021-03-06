console.log( `test` );

/* Fetching elements */

const numbers = document.querySelectorAll( ".num" );
const operators = document.querySelectorAll( ".opt" );

const history = document.querySelector( "#history" );
const equal = document.querySelector( "#equal" );
const point = document.querySelector( "#point" );
const clearbtn = document.querySelector( "#clear" );
const allClearbtn = document.querySelector( "#all-clear" );

const currentScreen = document.querySelector( ".current" );
const prevScreen = document.querySelector( ".prev" );

/* Event handlers */

numbers.forEach( num => {
	num.addEventListener( "click", () => addNumberToOp( num.textContent ) )
} );

operators.forEach( opt => {
	opt.addEventListener( "click", () => addOperatorToOp( opt.textContent ) )
} );

point.addEventListener( "click", addDot );
clearbtn.addEventListener( "click", clear );
allClearbtn.addEventListener( "click", allClear );
equal.addEventListener( "click", eval );
history.addEventListener( "click", toggleTab );

window.addEventListener( "keydown", ( e ) => {
	if ( e.key >= 0 && e.key <= 9 ) addNumberToOp( e.key );
	if (
		e.key === "+" ||
		e.key === "-" ||
		e.key === "*" ||
		e.key === "/" ||
		e.key === "%"
	) addOperatorToOp( keyToClick( e.key ) );
	if ( e.key === "." ) addNumberToOp();
	if ( e.key === "=" || e.key === "Enter" ) eval();
	if ( e.key === "Backspace" ) clear();
	if ( e.key === "Escape" ) allClear();
} );

/* Adding a log activator */

history.click();

/* Function to handle Keyboard Input */

function keyToClick( key ) {
	if ( key === "/" ) return "÷";
	if ( key === "*" ) return "×";
	return key;
}

/* Actual Calculator Functioning */

let first = "", second = "";
let currentOp = null, id = null;
let reset = false;

function addNumberToOp( a ) {
	if ( currentScreen.textContent === "0" || reset ) {
		currentScreen.textContent = "";
		reset = false;
	}
	currentScreen.textContent += a;
}

function addOperatorToOp( a ) {
	if ( currentOp !== null ) eval();
	first = currentScreen.textContent;
	currentOp = a;
	prevScreen.textContent = `${first} ${currentOp}`;
	reset = true;
}

function addDot() {
	if ( reset ) {
		currentScreen.textContent = "";
		reset = false;
	}
	if ( currentScreen.textContent === "" ) {
		currentScreen.textContent = "0";
	}
	if ( currentScreen.textContent.includes( "." ) ) return;
	currentScreen.textContent += ".";
}

function clear() {
	currentScreen.textContent = currentScreen.textContent
		.toString().slice( 0, -1 );
}

function allClear() {
	currentScreen.textContent = "0";
	prevScreen.textContent = "";
	first = "";
	second = "";
	currentOp = null;
}

function eval() {
	if ( currentOp === null || reset ) return;
	if ( currentOp === "÷" && currentScreen.textContent === "0" ) {
		if ( id ) {
			clearTimeout( id );
			id = null;
		}
		const warn = document.querySelector( ".warn" );
		warn.innerHTML = "<div>Oh-noey! You can't more than 10-digited numbers.</div>"
		warn.style.display = "block";
		id = setTimeout( function() { warn.style.display = "none" }, 10000 );
		return;
	}
	second = currentScreen.textContent;
	currentScreen.textContent = round3( operate( currentOp, first, second ) );
	prevScreen.textContent = `${ first } ${ currentOp } ${ second } = `;
	currentOp = null;
	log( prevScreen.textContent, currentScreen.textContent );
}

function log( a, b ) {
	const logitem = document.createElement("div");
	logitem.setAttribute( "class", "logit" );
	logitem.innerHTML = `<div class="prev">${a}</div><div class="current">${b}</div>`;
	document.querySelector( ".logs" ).appendChild( logitem );
}

function toggleTab() {
	const logs = document.querySelector( ".logs" );
	if ( logs.style.display === "none" ) {
		logs.style.display = "block";
	} else {
		logs.style.display = "none";
	}
}

/* Math Functions */

function operate( operator, a, b ) {

	aN = Number( a );
	bN = Number( b );

	if ( operator === "+" ) {

		return add( aN, bN );

	} else if ( operator === "-" ) {

		return substract( aN, bN );

	} else if ( operator === "×" ) {

		return multiply( aN, bN );

	} else if ( operator === "÷" ) {

		return divide( aN, bN );

	} else if ( operator === "%" ) {

		return percent( aN, bN );

	} else {

		return null;

	}
}

function add( a, b ) {
	return a+b;
}

function substract( a, b ) {
	return a-b;
}

function multiply( a, b ) {
	return a*b;
}

function divide( a, b ) {
	if ( b === 0 ) return null;
	return a/b;
}

function percent( a, b ) {
	if ( b === 0 ) return null;
	return a%b;
}

function round3( a ) {
	if ( a.toString().indexOf( "." ) !== -1 ) {
		if ( a.toString().split( "." )[1].length > 3 ) {
			return a.toFixed( 3 );
		}
	}
	return a;
}