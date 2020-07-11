//Start of the game
// Make main page visibile, start page blank 
var timer;

function start() {
    let button = document.querySelector("#button");
    let start = document.querySelector("#container");
    button.innerHTML = "";
    start.style.visibility = "visible";
    timer = setTimeout(alertfunc, 10000);
    createProgressBar('progressbar1', '10s');
}

function alertfunc() {
    gameOver();
}


//Setting the balloon colour
//An array to list the random colour numbers of the balloons 
let z = [];
for (i = 1; i <= 30; i++) {
    var color = ['red', 'green', 'pink', 'blue', 'lightgreen', 'magenta', 'purple', 'orange'];
    var x = Math.floor(Math.random() * 8);
    z.push(x);
    document.getElementById('bal' + i).style.backgroundColor = color[x];
}


//Calculate maximum colour occurance among the random colours 
//Create a element to show the colour of balloon to pop and insert it in the HTML page 
var color = ['red', 'green', 'pink', 'blue', 'lightgreen', 'magenta', 'purple', 'orange'];
var p = count(z);
var q = max(p);
var r = test(p);
let k = document.createElement('div');
k.classList.add('mydiv');
k.style.color = color[q];
document.getElementById('inner').appendChild(k);
k.innerHTML = "Pop the " + color[q] + " Balloons";


//Pop the balloon of specified colour,check all balloons are popped and display result.
//If popped wrong balloon display the wrong  

let popped = 0;
document.addEventListener("click", function (e) {
    let audio = document.getElementById('audio')
    var y = ['red', 'green', 'pink', 'blue', 'lightgreen', 'magenta', 'purple', 'orange'];
    let a = y[q];
    if (e.target.className === "balloonn" && e.target.style.backgroundColor == a) {
        e.target.style.backgroundColor = "#ededed";
        e.target.style.visibility = "hidden";
        e.target.textContent = "POP!";
        e.target.style.color = y[q];
        audio.play();
        popped++;
        removeEvent(e);
        checkAllPopped();
    } else if (e.target.className === "balloonn") {
        wrong();
        clearTimeout(timer);
    }
});

//reset the event listener
function removeEvent(e) {
    e.target.removeEventListener("click", function () { });
}


//Colour specific array with index representing the maximum colour appearance 
function count(z) {
    var a0 = 0
    var a1 = 0;
    var a2 = 0;
    var a3 = 0;
    var a4 = 0;
    var a5 = 0;
    var a6 = 0;
    var a7 = 0;
    for (let i = 0; i < z.length; i++) {
        switch (z[i]) {
            case 0:
                a0++;
                break;
            case 1:
                a1++;
                break;
            case 2:
                a2++;
                break;
            case 3:
                a3++;
                break;
            case 4:
                a4++;
                break;
            case 5:
                a5++;
                break;
            case 6:
                a6++;
                break;
            case 7:
                a7++;
                break;
        }
    }
    let arr = [];
    arr.push(a0, a1, a2, a3, a4, a5, a6, a7);
    return arr;
}

//Maximum colour count
function max(arr) {
    let a = 0;
    let x = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > a) {
            a = arr[i];
            x = i;
        }
    }
    return x;
}

//Colour of the balloon to be popped
function test(arr) {
    let a = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > a) {
            a = arr[i];
        }
    }
    return a;
}

//Check all balloons are popped
function checkAllPopped() {
    if (popped === r) {
        clearTimeout(timer);
        console.log("all popped!");
        let bar = document.querySelector('#progressbar1');
        let balloon = document.querySelector("#balloon");
        let message = document.querySelector("#yay-balloons");
        balloon.innerHTML = "";
        message.style.display = "block";
        bar.style.display = 'none';
    }
}

//Display wrong if popped inappropriate colour
function wrong() {
    let bar = document.querySelector('#progressbar1');
    let balloon = document.querySelector("#balloon");
    let message = document.querySelector("#no");
    balloon.innerHTML = "";
    message.style.display = "block";
    bar.style.display = 'none';
}
//function if game not completed in given time
function gameOver() {
    let balloon = document.querySelector("#balloon");
    let message = document.querySelector("#over");
    balloon.innerHTML = "";
    message.style.display = "block";
}

//Duration of the game using progressbar
function createProgressBar(id, duration) {
    var progressbar = document.getElementById(id);
    progressbar.className = 'progressbar';

    var progressbarinner = document.createElement('div');
    progressbarinner.className = 'inner';

    progressbarinner.style.animationDuration = duration;
    progressbar.appendChild(progressbarinner);
    progressbarinner.style.animationPlayState = 'running';
}