/*
┌───────┐     ┌─────────┐     ┌────────────────────────────────┐
│scrape │     │effectue │     │affiche                         │
│les    ├────►│les      ├────►│la moyenne générale             │
│notes  │     │calculs  │     │dans une ligne en bas du tableau│
└───────┘     └────┬────┘     └────────────────────────────────┘
                   │
                   │
              ┌────┴────┐
              │moyenne/ │
              │nombre de│
              │moyennes │
              └─────────┘
 */


var notes = [];
var notesClasse = [];
var notesMaxClasse = [];
var notesMinClasse = [];
var moyenneGenerale = 0;
var moyenneClasse = 0;
var nbMoyennes = 0;

var username = document.getElementsByClassName("user")[0].querySelector("li").innerText;
var table = document.getElementsByClassName("yui-dt-data")[0];
var trs = table.querySelectorAll("tr")
for(i = 0; i < trs.length; i++) {
    try{
		var text = trs[i].getElementsByClassName("bulletin-note-eleve")[0].innerText;
	}
	catch(error){
		var text = "";
	}
	var moyenne = text.replace(",", ".");
	moyenne = parseFloat(moyenne);
	if(!isNaN(moyenne)){
		notes.push(moyenne);
	}

	var textClasse = trs[i].getElementsByClassName("bulletin-note")[2].innerText;
	var classe = textClasse.replace(",", ".");
	classe = parseFloat(classe);
	if(!isNaN(classe)){
		notesClasse.push(classe);
	}

	var textMaxClasse = trs[i].getElementsByClassName("bulletin-note")[4].innerText;
	var maxClasse = textMaxClasse.replace(",", ".");
	if(!isNaN(maxClasse)){
		notesMaxClasse.push(maxClasse)
	}

	var textMinClasse = trs[i].getElementsByClassName("bulletin-note")[3].innerText;
	var minClasse = textMinClasse.replace(",", ".");
	if(!isNaN(minClasse)){
		notesMinClasse.push(minClasse)
	}
}

trs[trs.length - 1].className = trs[trs.length - 1].className.replace("yui-dt-last", "");

notes.forEach(function(note){
	moyenneGenerale += note;
	nbMoyennes += 1;
})

notesClasse.forEach(function(noteClasse){
	moyenneClasse += noteClasse;
})

// CALCUL DE MOYENNE
// ELEVE ET CLASSE

moyenneGenerale = moyenneGenerale/nbMoyennes;
moyenneClasse = moyenneClasse/nbMoyennes;


var tr = document.createElement("tr");
tr.className = "yui-dt-last yui-dt-odd";

// AFFICHER LA MOYENNE GENERALE DANS LE TABLEAU

var nameTd = document.createElement("td");
nameTd.className = "yui-dt0-col-matiere yui-dt-col-matiere yui-dt-sortable yui-dt-first";
nameTd.innerHTML = '<div class="yui-dt-liner"><div class="bulletin-matiere-ligne"><div class="bulletin-matiere-libelle ellipse fw-700" title="MOYENNE GENERALE">MOYENNE GENERALE</div></div></div>';
tr.appendChild(nameTd);

var moyenneRound = Math.round(moyenneGenerale * 10) / 10;
var noteTd = document.createElement("td");
noteTd.className = "yui-dt0-col-moyenneEleve yui-dt-col-moyenneEleve yui-dt-sortable";
noteTd.innerHTML = '<div class="yui-dt-liner bulletin-note bulletin-note-eleve">' + moyenneRound.toString().replace(".", ",") + '</div>';
tr.appendChild(noteTd);

var devTd = document.createElement("td");
devTd.className = "yui-dt0-col-nombreDevoirComptabilises yui-dt-col-nombreDevoirComptabilises yui-dt-sortable";
devTd.innerHTML = '<div class="yui-dt-liner bulletin-note"><div class="txt-center">' + nbMoyennes.toString() + '</div></div>';
tr.appendChild(devTd);

var moyenneClasseRound = Math.round(moyenneClasse * 10) / 10;
var classTd = document.createElement("td");
classTd.className = "yui-dt0-col-moyenneClasse yui-dt-col-moyenneClasse";
classTd.innerHTML = '<div class="yui-dt-liner bulletin-note">' + moyenneClasseRound.toString().replace(".", ",") + '</div>'
tr.appendChild(classTd)
table.appendChild(tr);

/* SOURCES: GITHUB
                                                                       
https://github.com/apknusel/Infinite_Campus_GPA_Calculator
https://github.com/aaryswastaken/MBN-Ma-Moyenne */