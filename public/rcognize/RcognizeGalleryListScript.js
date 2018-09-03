function initScript() {

    $(document).ready(function () {

        
        for (let i = 0; i < getFaceListResults.length; i++) {
            let face = getFaceListResults[i];
            let tagContainer = document.getElementById(`tagContainer ${face.FaceID}`);
            let tagPS = new PerfectScrollbar(tagContainer);
            let xhr = new XMLHttpRequest();

            if (!xhr) {
                return false;
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    let json = JSON.parse(xhr.responseText);
                    console.log(json);

                    for (let q = 0; q < json.length; q++) {
                        $('#' + `tagTable ${face.FaceID}`).append('<tr><td>test 2</td></tr>')
                    }
                }
            }

            xhr.open("GET", `${serverAddress}/tags/${face.FaceID}`, true);

            xhr.send(null);
        }
    });

}