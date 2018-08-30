function initScript(){

    console.log(getFaceResult[0]);

    let incidentPhoto = document.getElementById("incidentPhoto");
    let face = getFaceResult[0];
    let tags = getTagsResult;
    incidentPhoto.src = face.Link;

    let addButton = document.getElementById('addButton');

    addButton.addEventListener('click', function (){
        onAddTag();
    })

    function onAddTag() {

        bootbox.hideAll();

        bootbox.prompt("Enter a new tag name.", function (promptResult) {
            if (promptResult === null) {
            } else {


                let cleanInput = promptResult.replace(/[^a-zA-Z0-9 ]/g, "");

                let xhr = new XMLHttpRequest();

                if (!xhr) {
                    return false;
                }

                xhr.open("POST", serverAddress + "/addtag" , true);

                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify({
                    "FaceID": face.FaceID,
                    'TagName':  promptResult
                }));

                bootbox.hideAll();
                bootbox.alert('Tag has been added!');

                window.setTimeout(function () {
                }, 2000);


            }
        });


    }
    
    function setDataTables() {

        const infoContainer = document.querySelector('#infoContainer');
        const infoPS = new PerfectScrollbar(infoContainer);

        const tagContainer = document.querySelector('#tagContainer');
        const tagPS = new PerfectScrollbar(tagContainer);


    }

}