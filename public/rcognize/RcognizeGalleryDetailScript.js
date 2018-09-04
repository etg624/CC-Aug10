function initScript() {

    console.log(getFaceResult[0]);

    const incidentPhoto = document.getElementById("incidentPhoto");
    const face = getFaceResult[0];
    let assignedTags = getAssignedTagsResult;
    const allTags = getAllTagsResult;
    incidentPhoto.src = face.Link;
    const addButton = document.getElementById('addButton');
    const assignButton = document.getElementById('assignButton');
    const removeButton = document.getElementById('removeButton');

    const tagContainer = document.querySelector('#tagContainer');
    const tagPS = new PerfectScrollbar(tagContainer);

    const tagTable = document.getElementById('tagTable');


    setButtonListeners();

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
                        newRow.id = face.TagID;
                        var newCell = newRow.insertCell(0);
                        var newText = document.createTextNode(promptResult);
                        newCell.appendChild(newText);
                        console.log(JSON.stringify(face.FaceID));
                        updateTagTable(face.FaceID);
                    }
                }

                xhr.open("POST", serverAddress + "/addtag", true);

                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify({
                    "FaceID": face.FaceID,
                    'TagName': cleanInput
                }));

                bootbox.hideAll();
                bootbox.alert('Tag has been added!');
            }
        });


    }

    function onAssignTag() {

        let tagButtons = [];
        for (let i = 0; i < allTags.length; i++) {
            let label = allTags[i].TagName;
            let faceID = face.FaceID
            let buttonClass = 'btn-primary';
            let tagID = allTags[i].TagID;

            tagButtons.push({
                label: label,
                className: buttonClass,
                callback: function () {
                    assignTag(tagID, label, faceID);
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

    function assignTag(tagID, tagName, faceID) {

        let xhr = new XMLHttpRequest();

        if (!xhr) {
            return false;
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                var newRow = tagTable.insertRow(tagTable.rows.length)
                newRow.id = tagID;
                var newCell = newRow.insertCell(0);

                var newText = document.createTextNode(tagName);
                newCell.appendChild(newText);

                updateTagTable(faceID);

            }

        }

        xhr.open("POST", serverAddress + "/assigntag", true);

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            'TagID': tagID,
            'TagName': tagName,
            "FaceID": faceID
        }));

        bootbox.hideAll();
        bootbox.alert('Tag has been assigned!');
    }

    function onRemoveTag() {

        let tagButtons = [];
        for (let i = 0; i < assignedTags.length; i++) {
            let label = assignedTags[i].TagName;
            let faceID = face.FaceID
            let buttonClass = 'btn-primary';
            let tagID = assignedTags[i].TagID;

            tagButtons.push({
                label: label,
                className: buttonClass,
                callback: function () {
                    removeTag(tagID, faceID);
                }
            });
        }

        bootbox.hideAll();


        let dialog = bootbox.dialog({
            title: 'Remove Tag',
            message: "<p>Select a tag to delete.</p>",
            buttons: tagButtons
        });

    }

    function removeTag(tagID, faceID) {

        let xhr = new XMLHttpRequest();

        if (!xhr) {
            return false;
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                let tagRow = document.getElementById(tagID);

                try {
                    tagRow.remove();
                } catch (err) {
                    console.log(err);
                }

                updateTagTable(faceID);
            }
        }

        xhr.open("DELETE", serverAddress + "/removetag", true);

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            'TagID': tagID,
            'FaceID': faceID
        }));

        bootbox.hideAll();
        bootbox.alert('Tag has been deleted');

    }

    function updateTagTable(faceID) {

        let xhr = new XMLHttpRequest();

        if (!xhr) {
            return false;
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                $(tagTable).empty();
                let json = JSON.parse(xhr.responseText);
                if (json.length > 0) {
                    assignedTags = [];
                    for (let i = 0; i < json.length; i++) {
                        var newRow = tagTable.insertRow(tagTable.rows.length)
                        newRow.id = json[i].TagID;
                        var newCell = newRow.insertCell(0);
                        var newText = document.createTextNode(json[i].TagName);
                        newCell.appendChild(newText);
                        assignedTags.push(json[i]);
                    }
                }
            }
        }

        xhr.open("GET", serverAddress + `/tags/${faceID}`, true);

        xhr.send(null);

    }

    function setButtonListeners() {
        addButton.addEventListener('click', function () {
            onAddTag();
        })

        assignButton.addEventListener('click', function () {
            onAssignTag();
        })
        removeButton.addEventListener('click', function () {
            onRemoveTag();
        })
    }
}