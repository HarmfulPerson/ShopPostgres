document.addEventListener('DOMContentLoaded', (event) => {
    let idRach = document.getElementById('id_rach');
    let miesiac = document.getElementById('miesiac');
    let rok = document.getElementById('rok');
    let koszt = document.getElementById('koszt_rachunku');

    let zaplacone = document.getElementsByName('zaplacone');
    let potwierdzone = document.getElementsByName('potwierdzone');



    const xhr = new XMLHttpRequest();

    let submitButton = document.getElementById('dodaj_rachunek_submit');

    submitButton.addEventListener('click', (event) => {
        for(let i = 0; i < zaplacone.length; i++){
            if(zaplacone[i].checked) {
                if (zaplacone[i].value == 'true'){
                    zaplacone = true;
                }else{
                    zaplacone = false
                }
            }
        }

        for(let i = 0; i < potwierdzone.length; i++){
            if(potwierdzone[i].checked) {
                if (potwierdzone[i].value == 'true'){
                    potwierdzone = true;
                }else{
                    potwierdzone = false
                }
            }
        }
        let newRachunek = {
            idRach: parseInt(idRach.value),
            miesiac: parseInt(miesiac.value),
            rok: parseInt(rok.value),
            koszt: parseInt(koszt.value),
            zaplacone: zaplacone,
            potwierdzone: potwierdzone,
        }
        for(let i = 1; i < event.path[4].children[2].rows.length; i++){
            if(event.path[4].children[2].rows[i].cells[0].innerHTML == newRachunek.idRach){
                newRachunek.idRach = null;
                document.getElementById("wrong-req").innerHTML = 'Rachunek o takim ID już istnieje!!';
            }
        }
        if(newRachunek.idRach != null){
            xhr.open("POST", "/rachunki");
            xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
            console.log(newRachunek)
            xhr.send(JSON.stringify(newRachunek));
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
            xhr.open("DELETE", "/rachunki");
            xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
            console.log(event.path[1].children[0].innerText)
            xhr.send(JSON.stringify({idRach: event.path[1].children[0].innerText}));
            location.reload(true);
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                location.reload(true);
            }
        }
    }, false);
});