document.addEventListener('DOMContentLoaded', (event) => {
    let clickableElems = document.getElementsByClassName('edit-pracownik');
    let deleteButton = document.querySelector('delete_button');
    let submitButton = document.getElementById('dodaj_pracownika');

    let idPrac = document.getElementById('id_prac');
    let imiePracownika = document.getElementById('imie_pracownika');
    let nazwiskoPracownika = document.getElementById('nazwisko_pracownika');
    let pozycjaPracownika = document.getElementById('pozycja_pracownika');
    let stawkaGodzinowa = document.getElementById('stawka_godzinowa');
    let urlop = document.getElementById('dni_urlop');
    let przepracowaneGodziny = document.getElementById('przepracowane_godziny');

    const xhr = new XMLHttpRequest();
    for(let i = 0; i<clickableElems.length; i++) {
        clickableElems[i].addEventListener('click', () => {
            location.href = clickableElems[i].parentElement.firstElementChild.innerHTML
        })
    }
    submitButton.addEventListener('click', (event) => {
        let newPracownik = {
            idPrac: idPrac.value,
            imiePracownika: imiePracownika.value,
            nazwiskoPracownika: nazwiskoPracownika.value,
            pozycjaPracownika: pozycjaPracownika.value,
            stawkaGodzinowa: stawkaGodzinowa.value,
            urlop: urlop.value,
            przepracowaneGodziny: przepracowaneGodziny.value,
            wyplata: parseInt(przepracowaneGodziny.value*stawkaGodzinowa.value)
        }
        for(let i = 1; i < event.path[2].children[2].rows.length; i++){
            if(event.path[2].children[2].rows[i].cells[0].innerHTML == newPracownik.idPrac){
                newPracownik.idPrac = null;
                document.getElementById("wrong-req").innerHTML = 'Pracownik o takim ID już istnieje!!';
            }
        }
        if(newPracownik.idPrac != null){
            console.log(event.path[1].children[0].rows);
            xhr.open("POST", "/pracownicy");
            xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
            xhr.send(JSON.stringify(newPracownik));
            xhr.onreadystatechange = function () { // Call a function when the state changes.
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    location.reload(true);
                }
            };
        }else {
            console.log('Juz istnieje wpis o takim id')
        }
    });
    document.addEventListener('click', function (event) {
        if ( event.target.classList.contains( 'delete_button' ) ) {
            xhr.open("DELETE", "/pracownicy");
            xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
            xhr.send(JSON.stringify({idPrac: event.path[1].children[0].innerText}));
            location.reload(true);
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                location.reload(true);
            }
        }
    }, false);

});