document.addEventListener('DOMContentLoaded', (event) => {

    let skladnik1 = document.getElementById('skladnik1');
    let skladnik2 = document.getElementById('skladnik2');
    let skladnik3 = document.getElementById('skladnik3');

    let idProd = document.getElementById('id_prod');
    let nazwaProduktu = document.getElementById('nazwa_produktu');
    let ilosc = document.getElementById('ilosc');
    let cena = document.getElementById('cena');

    const xhr = new XMLHttpRequest();

    document.getElementById('dodaj_produkt').addEventListener('click', () => {
        document.getElementById('container').style.opacity = '0.6';
        document.getElementById('ingredients').style.display = 'block';
        document.getElementById('ingredients').classList.add('shownIngredients');
        document.getElementById('blank').style.display = 'block';
        document.getElementById('dodaj_skladniki').addEventListener('click', () => {
            if(!skladnik1.value || !skladnik2.value || !skladnik3.value){
                console.log(skladnik1.value)
                console.log('wypelnij wszystkie pola')
            }else {
                let newProduct = {
                    idProd: idProd.value,
                    nazwaProduktu: nazwaProduktu.value,
                    ilosc: ilosc.value,
                    cena: cena.value,
                    skladnik1: skladnik1.value,
                    skladnik2: skladnik2.value,
                    skladnik3: skladnik3.value
                }
                document.getElementById('ingredients').classList.remove('shownIngredients')
                document.getElementById('ingredients').style.display = 'none';
                xhr.open("POST", "/produkty");
                xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
                xhr.send(JSON.stringify(newProduct));
                xhr.onreadystatechange = function () { // Call a function when the state changes.
                    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                        location.reload(true);
                    }
                };
            }
        })
        document.getElementById('cancel').addEventListener('click', () => {
            document.getElementById('ingredients').classList.remove('shownIngredients')
            document.getElementById('ingredients').style.display = 'none';
        })
    })
    document.addEventListener('click', function (event) {
        if ( event.target.classList.contains( 'delete_button' ) ) {
            console.log(event);
            xhr.open("DELETE", "/produkty");
            xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
            console.log(event.path[1].children[0].innerText)
            xhr.send(JSON.stringify({idProd: event.path[1].children[0].innerText}));
            location.reload(true);
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                location.reload(true);
            }
        }
    }, false);
});