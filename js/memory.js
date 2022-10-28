let arrayAnimali = ['🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐰', '🐯', '🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐯', '🐰'];
//libreria per icone
//https://html-css-js.com/html/character-codes/


let arrayComparison = [];

document.body.onload = startGame();

// mi serviranno alcune variabili 1. interval 2. una agganciata alla classe find 
// 3. una agganciata al'id modal 4. una agganciata alla classe timer

var interval; // = setInterval(displayHello, 1000);
var iconsFind = document.getElementsByClassName("find");
var modal = document.getElementById("modal");
var timer = document.querySelector(".timer");


//una funzione che serve a mescolare in modo random gli elementi dell'array che viene passato 
// (l'array contiene le icone degli animali)
function shuffle(a) {
    var currentIndex = a.length;
    var temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = a[currentIndex];
        a[currentIndex] = a[randomIndex];
        a[randomIndex] = temporaryValue;
    }
    return a;
}

// una funzione che rimuove la classe active e chiama la funzione startGame()
function removeActive() {
    modal.classList.remove("active");
    startGame();
}

// la funzione startGame che pulisce il timer, dichiara un array vuoto, mescola casualmente l'array degli animali
// (var arrayShuffle = shuffle(arrayAnimali);), aggancia il contenitore con id griglia, 
// pulisce tutti gli elementi che eventualmente contiene
// poi fa ciclo per creare i 24 div child -> aggiunge la class e l'elemento dell'array in base all'indice progressivo
// chiama la funzione timer e associa a tutti gli elementi (div) di classe icon l'evento click e le due funzioni definit sotto



function startGame() {

    clearInterval(interval);
    arrayComparison = []; // dichiara un array vuoto
    var arrayShuffle = shuffle(arrayAnimali); // mescola casualmente l'array degli animali
    var griglia = document.getElementById("griglia"); // aggancia il contenitore con id griglia

    griglia.innerHTML = "";// pulisce tutti gli elementi che eventualmente contiene


    for (i = 0; i < arrayAnimali.length; i++) {// poi fa ciclo 

        var card = document.createElement("div"); // per creare i 24 div child
        var element = document.createElement("div");

        griglia.appendChild(card).appendChild(element);


        element.classList.add("icon"); // aggiunge la class e l'elemento dell'array in base all'indice progressivo
        element.innerHTML = arrayShuffle[i];
    };

    

    // associa a tutti gli elementi (div) di classe icon l'evento click e le due funzioni definit sotto
    var icon = document.querySelectorAll(".icon");
    var icons = [...icon];

    for (let i = 0; i < icons.length; i++) {
        icons[i].addEventListener("click", displayIcon);
        icons[i].addEventListener("click", victory);
    };

    startTimer();// chiama la funzione timer

};



function displayIcon() {

    var icon = document.querySelectorAll(".icon");
    var icons = [...icon];

    /*
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];
    è uguale a 
    var icons = document.getElementsByClassName("icon");
    //var icons = [...icon];
    è un operatore che serve per passare un array come argomento:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax 
    https://www.tutorialspoint.com/es6/es6_operators.htm (cerca spread nella pagina)
    */

    //mette/toglie la classe show
    this.classList.toggle("show");
    //aggiunge l'oggetto su cui ha cliccato all'array del confronto
    arrayComparison.push(this);

    var len = arrayComparison.length;
    //se nel confronto ci sono due elementi
    if (len === 2) {
        //se sono uguali aggiunge la classe find
        if (arrayComparison[0].innerHTML === arrayComparison[1].innerHTML) {
            arrayComparison[0].classList.add("find", "disabled");
            arrayComparison[1].classList.add("find", "disabled");
            arrayComparison = [];
        } else {
            //altrimenti (ha sbagliato) aggiunge solo la classe disabled
            icons.forEach(function (item) {
                item.classList.add('disabled');
            });
            // con il timeout rimuove  la classe show per nasconderli
            setTimeout(function () {
                arrayComparison[0].classList.remove("show");
                arrayComparison[1].classList.remove("show");
                icons.forEach(function (item) {
                    item.classList.remove('disabled');
                    for (var i = 0; i < iconsFind.length; i++) {
                        iconsFind[i].classList.add("disabled");
                    }
                });
                arrayComparison = [];
            }, 700);
        }
    }
}

//una funzione che viene mostrata alla fine quando sono tutte le risposte esatte

function victory() {

    if (iconsFind.length == 24) {
        clearInterval(interval);
        modal.classList.add("active");
        document.getElementById("tempoTrascorso").innerHTML = timer.innerHTML;
    }

};

// una funzione che nasconde la modale alla fine e riavvia il gioco - NON E' DA FARE!!!!! PROF DICE DI NON FARLO

function playAgain() {
    startGame();
    modal.classList.remove("active");
}


// una funzione che calcola il tempo e aggiorna il contenitore sotto

function startTimer() {
    var seconds = 0;
    var minutes = 0;

    interval = setInterval(function () {
        timer.innerHTML = `Tempo: ${minutes} min ${seconds} sec`;
        seconds++;
        if (seconds == 60) {
            minutes++;
            seconds = 0;
        }
    }, 1000);
}