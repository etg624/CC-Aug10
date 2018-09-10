function initScript() {

    let allTags = getAllTagsResults;
    let addButton = document.getElementById('addButton');
    let deleteButton = document.getElementById('deleteButton');

    setDataTables();

    setButtonListeners();

    let tagTable = document.getElementById('tagTable');

    function onAddTag() {

        bootbox.hideAll();

        bootbox.prompt("Enter a new tag name.", function (promptResult) {
            if (promptResult === null) {
            } else {

                let cleanInput = promptResult.replace(/[^a-zA-Z0-9 ]/g, "");

                console.log(cleanInput);

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

                xhr.open("POST", serverAddress + "/addtag", true);

                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify({
                    'TagName': cleanInput
                }));

                bootbox.hideAll();
                bootbox.alert('Tag has been added!');
            }
        });


    }

    function onDeleteTag(){

        let tagButtons = [];
        for (let i = 0; i < allTags.length; i++) {
            let label = allTags[i].TagName;
            let buttonClass = 'btn-primary';
            let tagID = allTags[i].TagID;

            tagButtons.push({
                label: label,
                className: buttonClass,
                callback: function () {
                    deleteTag(tagID, faceID);
                }
            });
        }

        bootbox.hideAll();


        let dialog = bootbox.dialog({
            title: 'Delete Tag',
            message: "<p>Select a tag to delete.</p>",
            buttons: tagButtons
        });

    }

    function deleteTag(tagID, faceID){

        let xhr = new XMLHttpRequest();

        if (!xhr) {
            return false;
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                // var newRow = tagTable.insertRow(tagTable.rows.length)
                // var newCell = newRow.insertCell(0);

                // var newText = document.createTextNode(tagName);
                // newCell.appendChild(newText);
            }

        }

        xhr.open("DELETE", serverAddress + "/deletetag", true);

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            'TagID': tagID,
            'FaceID': faceID
        }));

        bootbox.hideAll();
        bootbox.alert('Tag has been deleted');

    }

    function setDataTables() {


        const tagContainer = document.querySelector('#tagContainer');
        const tagPS = new PerfectScrollbar(tagContainer);


    }

    function setButtonListeners() {
        addButton.addEventListener('click', function () {
            onAddTag();
        })
        deleteButton.addEventListener('click' , function () {
            onDeleteTag();
        })
    }
}