function incidentDetailScript(){

    console.log('incidentDetailScript called');

    let incidentPhoto = document.getElementById("incidentPhoto");
    let incidentVideo = document.getElementById('incidentVideo');

    if (incident[0].Media == 'none') {
        incidentPhoto.style.display = 'none';
        incidentVideo.style.display = 'none';
    }


    if (incident[0].Media == 'photo') {
        
        incidentPhoto.src = "https://s3-us-west-2.amazonaws.com/convoyer/" + incident[0].IncidentID;
        incidentPhoto.style.display = 'block';
        incidentVideo.style.display = 'none';
    }

    if (incident[0].Media == 'video') {
        
        incidentVideo.src = "https://s3-us-west-2.amazonaws.com/convoyer/" + incident[0].IncidentID;
        incidentVideo.style.display = 'block';
        incidentPhoto.style.display = 'none';
    }




var backButton = document.getElementById("backButton");

backButton.addEventListener('click', function (e) {
    history.back()

        });
}

function backToMap(){

    window.location.href = "https://convoyer.mobsscmd.com/convoyerlivemap";
    
}