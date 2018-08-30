function initScript(){

    console.log(results[0]);

    let incidentPhoto = document.getElementById("incidentPhoto");
    incidentPhoto.src = results[0].Link;

    let addButton = document.getElementById('addButton');

    addButton.addEventListener('click', function (){
        console.log('lick my nuts');
    })
}