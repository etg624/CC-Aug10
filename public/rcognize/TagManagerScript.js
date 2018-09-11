function initScript() {

    // let assignedTags = getAssignedTagsResults;
    let allTags = getAllTagsResults;
    // let assignedTags = getAssignedTagsResults;
    const addButton = document.getElementById('addButton');
    const removeButton = document.getElementById('removeButton');

    const tagContainer = document.querySelector('#tagContainer');
    const tagPS = new PerfectScrollbar(tagContainer);

    const tagTable = document.getElementById('tagTable');

    let buttonArray = [];
    let tagArray = [];

    updateTagTable();
    const matches = function (arr, arr2) {

        var matchArray = [];
        arr.sort();
        arr2.sort();
        for (var i = 0; i < arr.length; i++) {
            if (arr2.indexOf(arr[i]) > -1) {
                return true;
            } else return false;

        }

    }

    setButtonListeners();

    function onAddTag() {

        console.log('onAddTag called');

        bootbox.hideAll();

        bootbox.prompt("Enter a new tag name.", function (promptResult) {
            if (promptResult === null) {
            } else {


                let cleanInput = promptResult.replace(/[^a-zA-Z0-9/(), ]/g, "");

                console.log(cleanInput);

                let xhr = new XMLHttpRequest();

                if (!xhr) {
                    return false;
                }

                xhr.onreadystatechange = function () {
                    if (xhr.readyState == XMLHttpRequest.DONE) {

                        console.log(xhr.responseText);

                        if (xhr.responseText.includes('existing')) {
                            bootbox.hideAll();
                            bootbox.alert('An existing tag with that name already exists!');

                        } else {
                            updateTagTable();
                            bootbox.hideAll();
                            bootbox.alert('Tag has been added!');
                        }


                    }
                }

                xhr.open("POST", serverAddress + "/addtag", true);

                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify({
                    'TagName': cleanInput
                }));
            }
        });


    }

    function onRemoveTag() {

        let tagButtons = [];

        console.log(allTags);

        for (let i = 0; i < allTags.length; i++) {


            let label = allTags[i].TagName;
            // let faceID = face.FaceID
            let buttonClass = 'btn-primary';
            let tagID = allTags[i].TagID;

            tagButtons.push({
                label: label,
                className: buttonClass,
                callback: function () {
                    removeTag(tagID, label);
                }
            });
        }

        bootbox.hideAll();


        let dialog = bootbox.dialog({
            title: 'Remove Tag',
            message: "<p>Select a tag to remove.</p>",
            buttons: tagButtons
        });

    }

    function removeTag(tagID, tagName) {

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

                updateTagTable();
            }
        }

        xhr.open("DELETE", serverAddress + "/deletetag", true);

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            'TagID': tagID,
        }));

        bootbox.hideAll();
        bootbox.alert('Tag has been removed.');

    }

    function updateTagTable() {

        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();

            if (!xhr) {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
                return false;
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    $(tagTable).empty();
                    let json = JSON.parse(xhr.responseText);
                    if (json.length > 0) {
                        allTags = [];
                        
                        for (let i = 0; i < json.length; i++) {
                            var newRow = tagTable.insertRow(tagTable.rows.length)
                            newRow.id = json[i].TagID;
                            var newCell = newRow.insertCell(0);
                            var newText = document.createTextNode(json[i].TagName);
                            newCell.appendChild(newText);
                            allTags.push(json[i]);
                            tagArray = [];
                            tagArray.push(json[i].TagName);
                        }

                        if (json.length > 10) {
                            console.log('greater than 10');
                            $(tagContainer).css('height', '380');

                        } else if (json.length > 9) {
                            console.log('10');
                            $(tagContainer).css('height', '375');
                        } else if (json.length > 8) {
                            console.log('9') 
                            $(tagContainer).css('height', '345')
                        } else if (json.length > 7) {
                            console.log('8'); 
                            $(tagContainer).css('height', '315')
                        } else if (json.length > 6) {
                            console.log(7)
                            $(tagContainer).css('height', '270')
                        } else if (json.length > 5) {
                            console.log('6')
                            $(tagContainer).css('height', '235')
                        }
                        else {
                            console.log('less than 6');
                            $(tagContainer).css('height', '100')
                        }

                    }

                    resolve(xhr.response);

                }
            }

            xhr.open("GET", serverAddress + `/tags`, true);

            xhr.send(null);

        });


    }

    function setButtonListeners() {
        addButton.addEventListener('click', function () {
            onAddTag();
        })
        removeButton.addEventListener('click', function () {
            onRemoveTag();
        })
    }
}