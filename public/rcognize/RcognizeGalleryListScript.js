function initScript() {

    $(document).ready(function () {


        for (let i = 0; i < getFaceListResults.length; i++) {

            let face = getFaceListResults[i];
            let tagContainer = document.getElementById(`tagContainer ${face.FaceID}`);
            let tagTable = document.getElementById(`tagTable ${face.FaceID}`)
            let tagPS = new PerfectScrollbar(tagContainer);
            let xhr = new XMLHttpRequest();
            let faceTable = $('#faceTable');


            if (!xhr) {
                return false;
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    let json = JSON.parse(xhr.responseText);
                    for (let q = 0; q < json.length; q++) {

                        console.log(json[q]);

                        var newRow = tagTable.insertRow(tagTable.rows.length)
                        newRow.id = `${json[q].TagID}`
                        var newCell = newRow.insertCell(0);
                        var newText = document.createTextNode(json[q].TagName);
                        newCell.appendChild(newText);
                    }
                }
            }

            xhr.open("GET", `${serverAddress}/tags/${face.FaceID}`, true);

            xhr.send(null);
        }
    });

}