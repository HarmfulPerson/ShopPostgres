document.addEventListener('DOMContentLoaded', (event) => {
    let idDost = document.getElementById('id_dost');
    let nazwaFirmy = document.getElementById('nazwa_firmy');
    let produkt = document.getElementById('produkt');
    let submitButton = document.getElementById('dodaj_dostawce');
    let deleteButton = document.querySelector('delete_button');
    const xhr = new XMLHttpRequest();
    submitButton.addEventListener('click', (event) => {
        console.log(event)
        let newDostawca = {
            idDost: idDost.value,
            nazwaFirmy: nazwaFirmy.value,
            produkt: produkt.value
        }
        for(let i = 1; i < event.path[2].children[1].rows.length; i++){
            if(event.path[2].children[1].rows[i].cells[0].innerHTML == newDostawca.idDost){
               newDostawca.idDost = null;
               document.getElementById("wrong-req").innerHTML = 'Dostawca o takim ID już istnieje!!';
            }
        }
        if(newDostawca.idDost != null){
            console.log(event.path[1].children[0].rows);
            xhr.open("POST", "/dostawcy");
            xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
            xhr.send(JSON.stringify(newDostawca));
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
            console.log(event);
            xhr.open("DELETE", "/dostawcy");
            xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
            xhr.send(JSON.stringify({idDost: event.path[1].cells[0].innerText}));
            //location.reload(true);
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                location.reload(true);
            }
        }
    }, false);
});
