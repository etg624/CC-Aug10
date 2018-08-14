function incidentPreviewScript() {

    console.log('rendering incident media type from incidentPreviewScript');
    console.log(incident[0].Media);

    let imageAnchor = document.getElementById('imageAnchor');
    let videoAnchor = document.getElementById('videoAnchor');
    let incidentPhoto = document.getElementById("incidentPhoto");
    let incidentVideo = document.getElementById('incidentVideo');


    if (incident[0].Media == 'none') {
        console.log('none called');
        incidentPhoto.style.display = 'none';
        incidentVideo.style.display = 'none';
    }

    if (incident[0].Media == 'photo') {

        console.log('photo called');

        imageAnchor.href = "https://convoyer.mobsscmd.com/incidentdetails/" + incident[0].IncidentID
        incidentPhoto.src = "https://s3-us-west-2.amazonaws.com/convoyer/" + incident[0].IncidentID;
        incidentPhoto.style.display = 'block';
        incidentVideo.style.display = 'none';
    }

    if (incident[0].Media == 'video') {

        console.log('video called');

        videoAnchor.href = "https://convoyer.mobsscmd.com/incidentdetails/" + incident[0].IncidentID
        incidentVideo.src = "https://s3-us-west-2.amazonaws.com/convoyer/" + incident[0].IncidentID;
        incidentVideo.style.display = 'block';
        incidentPhoto.style.display = 'none';

    }
}

