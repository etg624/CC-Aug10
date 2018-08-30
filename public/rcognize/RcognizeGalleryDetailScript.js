function initScript(){

    console.log(getFaceResult[0]);

    let incidentPhoto = document.getElementById("incidentPhoto");
    let face = getFaceResult[0];
    let tags = getTagsResult;
    incidentPhoto.src = face.Link;
    let addButton = document.getElementById('addButton');
    let assignButton = document.getElementById('assignButton');

    setDataTables();

    setButtonListeners();

    let tagTable = document.getElementById('tagTable');

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

                xhr.onreadystatechange = function () {
                    if (xhr.readyState == XMLHttpRequest.DONE) {
                     var newRow = tagTable.insertRow(tagTable.rows.length)   
                     var newCell = newRow.insertCell(0);

                     var newText = document.createTextNode(promptResult);
                     newCell.appendChild(newText);

                    }
        
                }

                xhr.open("POST", serverAddress + "/addtag" , true);

                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify({
                    "FaceID": face.FaceID,
                    'TagName':  promptResult
                }));

                bootbox.hideAll();
                bootbox.alert('Tag has been added!');
            }
        });


    }

    function onAssignTag() {

        let tagButtons = [];
        for (let i = 0; i < tags.length; i++) {
            let label = tags[i].TagName;
            let buttonClass = 'btn-primary';
            let tagID = tags[i].TagID;

            tagButtons.push({
                label: label,
                className: buttonClass,
                callback: function () {

                }
            });

        }

        bootbox.hideAll();


        let dialog = bootbox.dialog({
            title: 'Assign Tag',
            message: "<p>Select a tag to assign.</p>",
            buttons: tagButtons
        });
    }

    function assignTag(){
        
    }
    
    function setDataTables() {

        const infoContainer = document.querySelector('#infoContainer');
        const infoPS = new PerfectScrollbar(infoContainer);

        const tagContainer = document.querySelector('#tagContainer');
        const tagPS = new PerfectScrollbar(tagContainer);


    }

    function setButtonListeners(){
        addButton.addEventListener('click', function (){
            onAddTag();
        })

        assignButton.addEventListener('click', function (){
            onAssignTag();
        })
    }

}