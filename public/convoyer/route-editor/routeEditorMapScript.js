
function initMap() {

    var mapStyle = [
        {
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f5f5f5"
                }
            ]
        },
        {
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#616161"
                }
            ]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#f5f5f5"
                }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#bdbdbd"
                }
            ]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ebebeb"
                }
            ]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#eeeeee"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#757575"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#e5e5e5"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#9e9e9e"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#757575"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#dadada"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#616161"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#9e9e9e"
                }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#e5e5e5"
                }
            ]
        },
        {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#eeeeee"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#c9c9c9"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#76d6ff"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#9e9e9e"
                }
            ]
        }
    ];

    const areaContainer = parent.document.querySelector('#areaContainer');
    const areaPS = new PerfectScrollbar(areaContainer);

    const routeContainer = parent.document.querySelector('#routeContainer');
    const routePS = new PerfectScrollbar(routeContainer);

    let center = { lat: 34.050963, lng: -118.256133 };
    for (let i = 0; i < areas.length; i++) {
        if (areas[i].CurrentArea == 1) {
            center = { lat: areas[i].lat, lng: areas[i].lng }
        }
    }

    let map = new google.maps.Map(document.getElementById('map'), {
        styles: mapStyle,
        zoom: 18,
        center: center,
        mapTypeId: google.maps.MapTypeId.MAP,
        streetViewControl: false,
        clickableIcons: false,
        fullscreenControl: false,
        mapTypeControl: true,
        panControl: false,
        rotateControl: false,
    });

    let routeSeq = {
        repeat: '30px',
        icon: {
            path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
            scale: 1,
            fillOpacity: 0,
            strokeColor: "yellow",
            strokeWeight: 1,
            strokeOpacity: 1
        }
    };

    let route = new google.maps.Polyline({
        map: map,
        zIndex: 1,
        geodesic: true,
        strokeColor: "black",
        strokeOpacity: 1,
        strokeWeight: 5,
        icons: [routeSeq]
    })

    let markerIsOnMap = false;


    let addAreaButton = parent.document.getElementById("addAreaButton");
    let deleteAreaButton = parent.document.getElementById('deleteAreaButton');
    let setCurrentAreaButton = parent.document.getElementById('setCurrentAreaButton');
    let cancelAreaButton = parent.document.getElementById('cancelAreaButton');
    let saveAreaButton = parent.document.getElementById('saveAreaButton');

    let addRouteButton = parent.document.getElementById("addRouteButton");
    let cancelRouteButton = parent.document.getElementById('cancelRouteButton');
    let clearCheckpointsButton = parent.document.getElementById('clearCheckpointsButton');
    let removeLastCheckpointButton = parent.document.getElementById('removeLastCheckpointButton');
    let saveRouteButton = parent.document.getElementById('saveRouteButton');
    let loadRouteButton = parent.document.getElementById('loadRouteButton');
    let deleteRouteButton = parent.document.getElementById('deleteRouteButton');

    setUpButtonListeners();

    setUpAreaButtons();

    setUpRouteButtons();

    function setUpButtonListeners() {

        addAreaButton.addEventListener('click', function (e) {
            onAddArea();
        });

        deleteAreaButton.addEventListener('click', function (e) {
            onDeleteArea();
        });

        setCurrentAreaButton.addEventListener('click', function (e) {
            onSetCurrentArea();
        });

        cancelAreaButton.addEventListener('click', function (e) {
            onCancelArea();
        });

        addRouteButton.addEventListener('click', function (e) {
            onAddRoute();
        });

        cancelRouteButton.addEventListener('click', function (e) {
            onCancelRoute();
        });

        clearCheckpointsButton.addEventListener('click', function (e) {
            onClearCheckpoints();
        })

        removeLastCheckpointButton.addEventListener('click', function (e) {
            onRemoveLastCheckpoint()
        });

        saveRouteButton.addEventListener('click', function (e) {
            onSaveRoute()
        });

        loadRouteButton.addEventListener('click', function (e) {
            onSelectRoute();
        });

        deleteRouteButton.addEventListener('click', function (e) {
            onDeleteRoute();
        });

    }

    function setUpAreaButtons() {

        for (let i = 0; i < areas.length; i++) {

            let area = areas[i];
            let id = area.AreaID;

            let areaButton = parent.document.getElementById(id);

            if (areaButton != null || areaButton != undefined) {

                let lat = area.lat;
                let lng = area.lng;

                areaButton.addEventListener('click', function (e) {

                    console.log(areaButton.id + ' clicked');

                    map.setCenter({
                        lat: lat,
                        lng: lng
                    });

                })

            }


        }
    }

    function setUpRouteButtons() {

        for (let i = 0; i < routes.length; i++) {

            let route = routes[i];
            let id = route.RouteID;

            let routeButton = parent.document.getElementById(id);

            if (routeButton != null || routeButton != undefined) {


                routeButton.addEventListener('click', function (e) {

                    console.log(routeButton.id + ' clicked');
                    loadCurrentRoute(id);
                })
            }
        }
    }

    function onAddArea() {

        addAreaButton.style.display = 'none'
        deleteAreaButton.style.display = 'none';
        addRouteButton.style.display = 'none'
        deleteRouteButton.style.display = 'none';
        cancelAreaButton.style.display = 'block';
        saveAreaButton.style.display = 'block';
        setCurrentAreaButton.style.display = 'block';

        map.addListener('click', function (e) {
            onAddAreaMarker(e.latLng);
        });

    }

    function onAddAreaMarker(latLng) {

        markerIsOnMap = true;

        google.maps.event.clearListeners(map, 'click');

        let marker = new google.maps.Marker({
            position: latLng,
            map: map,
            animation: google.maps.Animation.DROP,
        });

        map.addListener('click', function (e) {
            marker.setPosition(e.latLng);
        });

        cancelAreaButton.addEventListener('click', function (e) {
            google.maps.event.clearListeners(map, 'click');
            marker.setMap(null);
            markerIsOnMap = false;
        });


        saveAreaButton.addEventListener('click', function (e) {

            if (markerIsOnMap) {
                onSaveArea(marker)
            }

        });

    }

    function onSaveArea(marker) {

        let latLng = marker.getPosition();



        bootbox.hideAll();

        bootbox.prompt("Enter a name for the patrol area.", function (result) {
            if (result === null) {
            } else {


                let cleanInput = result.replace(/[^a-zA-Z0-9 ]/g, "");

                var areaID = createAreaID();
                let xhr = new XMLHttpRequest();

                if (!xhr) {
                    return false;
                }

                xhr.open("POST", "https://convoyer.mobsscmd.com/patrolareas", true);

                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify({
                    "AreaID": areaID,
                    "AreaName": cleanInput,
                    "CurrentArea": 0,
                    "lat": latLng.lat(),
                    "lng": latLng.lng()
                }));

                cancelAreaButton.style.display = 'none';
                saveAreaButton.style.display = 'none';
                addAreaButton.style.display = 'block'
                deleteAreaButton.style.display = 'block';
                addRouteButton.style.display = 'block'
                deleteRouteButton.style.display = 'block';

                bootbox.hideAll();
                bootbox.alert('Area has been saved!');

                window.setTimeout(function () {
                    parent.location.reload();
                }, 2000);


            }
        });


    }

    function onDeleteArea() {

        let xhr = new XMLHttpRequest();

        if (!xhr) {
            console.log('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                let json = JSON.parse(xhr.responseText);
                if (json.length > 0) {

                    let areaButtons = [];
                    for (let i = 0; i < json.length; i++) {
                        let label = json[i].Name;
                        let buttonClass = 'btn-primary';
                        let areaID = json[i].AreaID;

                        areaButtons.push({
                            label: label,
                            className: buttonClass,
                            callback: function () {
                                deleteSelectedArea(areaID);
                            }
                        });

                    }

                    bootbox.hideAll();


                    let dialog = bootbox.dialog({
                        title: 'Delete Area',
                        message: "<p>Select the area you wish to delete.</p>",
                        buttons: areaButtons
                    });




                }
            }
        }

        xhr.open("GET", "https://convoyer.mobsscmd.com/patrolareas/", true);

        xhr.send(null);
    }

    function onCancelArea() {

        cancelAreaButton.style.display = 'none';
        saveAreaButton.style.display = 'none';
        setCurrentAreaButton.style.display = 'none';
        addAreaButton.style.display = 'block'
        deleteAreaButton.style.display = 'block';
        addRouteButton.style.display = 'block'
        deleteRouteButton.style.display = 'block';


    }

    function onSetCurrentArea() {

        let areaButtons = [];
        for (let i = 0; i < areas.length; i++) {
            let label = areas[i].Name;
            let buttonClass = 'btn-primary';
            let areaID = areas[i].AreaID;

            areaButtons.push({
                label: label,
                className: buttonClass,
                callback: function () {
                    setSelectedAreaAsCurrent(areaID);
                }
            });

        }

        bootbox.hideAll();


        let dialog = bootbox.dialog({
            title: 'Select Current Area',
            message: "<p>Set an area for live view to focus on.</p>",
            buttons: areaButtons
        });




    }

    function setSelectedAreaAsCurrent(areaID) {
        let xhr = new XMLHttpRequest();

        if (!xhr) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }

        xhr.open("PUT", "https://convoyer.mobsscmd.com/patrolareas", true);

        xhr.setRequestHeader('Content-Type', 'application/json');


        xhr.send(JSON.stringify({
            "CurrentArea": 1,
            "NotCurrentArea": 0,
            "AreaID": areaID
        }));


        bootbox.hideAll();

        bootbox.alert('Current area has been set!');

    }

    function onAddRoute() {

        addAreaButton.style.display = 'none'
        deleteAreaButton.style.display = 'none';
        addRouteButton.style.display = 'none'
        deleteRouteButton.style.display = 'none';

        map.addListener('click', function (e) {
            onAddCheckpoint(e.latLng);
        });

        google.maps.event.addListener(route, 'click', function (e) {
            onAddCheckpoint(e.latLng);
        });

        cancelRouteButton.style.display = 'block';
        clearCheckpointsButton.style.display = 'block';;
        removeLastCheckpointButton.style.display = 'block';
        saveRouteButton.style.display = 'block';
        loadRouteButton.style.display = 'block';

    }

    function onAddCheckpoint(latLng) {
        route.getPath().push(latLng);
        route.setMap(map);
    }

    function onClearCheckpoints() {

        console.log('onClearCheckpoints called');

        route.setPath([]);
    }

    function onRemoveLastCheckpoint() {

        console.log('onRemoveLastCheckpoint called');

        route.getPath().pop();

    }

    function onSaveRoute() {



        bootbox.hideAll();

        bootbox.prompt("Enter a name for the route.", function (result) {
            if (result === null) {
            } else {


                let cleanInput = result.replace(/[^a-zA-Z0-9 ]/g, "");

                google.maps.event.clearListeners(map, 'click');
                google.maps.event.clearListeners(route, 'click');

                var routeID = createRouteID();
                let xhr = new XMLHttpRequest();

                if (!xhr) {
                    alert('Giving up :( Cannot create an XMLHTTP instance');
                    return false;
                }

                xhr.open("POST", "https://convoyer.mobsscmd.com/saveroute", true);

                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify({
                    "RouteID": routeID,
                    "RouteName": cleanInput,
                    "QueuePosition": 0
                }));

                postCheckpoints(routeID);

                google.maps.event.clearListeners(map, 'click');
                google.maps.event.clearListeners(route, 'click');

                route.setMap(null);
                route.setPath([]);
                route.setMap(map);

                cancelRouteButton.style.display = 'none';
                clearCheckpointsButton.style.display = 'none';
                removeLastCheckpointButton.style.display = 'none';
                saveRouteButton.style.display = 'none';
                loadRouteButton.style.display = 'none';
                addAreaButton.style.display = 'block'
                deleteAreaButton.style.display = 'block';
                addRouteButton.style.display = 'block'
                deleteRouteButton.style.display = 'block';

                bootbox.hideAll();

                bootbox.alert('Route has been saved for later!');

                window.setTimeout(function () {
                    parent.location.reload();
                }, 2000);


            }
        });
    }

    function onSelectRoute() {
        let xhr = new XMLHttpRequest();

        if (!xhr) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                let json = JSON.parse(xhr.responseText);
                if (json.length > 0) {

                    let routeButtons = [];
                    for (let i = 0; i < json.length; i++) {
                        let label = json[i].RouteName;
                        let routeID = json[i].RouteID;
                        let buttonClass = 'btn-primary';

                        routeButtons.push({
                            label: label,
                            className: buttonClass,
                            callback: function () {
                                loadCurrentRoute(routeID);
                            }
                        });

                    }

                    bootbox.hideAll();

                    var dialog = bootbox.dialog({
                        title: 'Select Route',
                        message: "<p>Select the route you wish to load.</p>",
                        buttons: routeButtons
                    });


                }
            }
        }

        xhr.open("GET", "https://convoyer.mobsscmd.com/routes/", true);

        xhr.send(null);
    }

    function onDeleteRoute() {

        let xhr = new XMLHttpRequest();

        if (!xhr) {
            console.log('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                let json = JSON.parse(xhr.responseText);
                if (json.length > 0) {

                    let routeButtons = [];
                    for (let i = 0; i < json.length; i++) {
                        let label = json[i].RouteName;
                        let buttonClass = 'btn-primary';
                        let routeID = json[i].RouteID;
                        routeButtons.push({
                            label: label,
                            className: buttonClass,
                            callback: function () {
                                deleteSelectedRoute(routeID);
                            },
                            onEscape: function () {
                            }
                        });

                    }
                    bootbox.hideAll();

                    var dialog = bootbox.dialog({
                        title: 'Delete Route',
                        message: "<p>Select the route you wish to delete.</p>",
                        buttons: routeButtons
                    });





                }
            }
        }

        xhr.open("GET", "https://convoyer.mobsscmd.com/routes/", true);

        xhr.send(null);
    }

    function onCancelRoute() {

        google.maps.event.clearListeners(map, 'click');
        google.maps.event.clearListeners(route, 'click');

        route.setMap(null);
        route.setPath([]);
        route.setMap(map);

        cancelRouteButton.style.display = 'none';
        clearCheckpointsButton.style.display = 'none';
        removeLastCheckpointButton.style.display = 'none';
        saveRouteButton.style.display = 'none';
        loadRouteButton.style.display = 'none';
        addAreaButton.style.display = 'block'
        deleteAreaButton.style.display = 'block';
        addRouteButton.style.display = 'block'
        deleteRouteButton.style.display = 'block';
    }

    function deleteSelectedRoute(routeID) {

        bootbox.hideAll();

        bootbox.confirm({
            size: "small",
            message: "Are you sure you want to delete the route?",
            callback: function (result) {
                /* result is a boolean; true = OK, false = Cancel*/
                if (result) {

                    let xhr = new XMLHttpRequest();

                    if (!xhr) {
                        alert('Giving up :( Cannot create an XMLHTTP instance');
                        return false;
                    }

                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == XMLHttpRequest.DONE) {
                            let json = JSON.parse(xhr.responseText);
                            deleteRoute(routeID);

                        }
                    }

                    xhr.open("DELETE", "https://convoyer.mobsscmd.com/checkpoints/" + routeID, true);

                    xhr.send(null);

                } else {

                }
            }
        })


    }

    function deleteSelectedArea(areaID) {

        bootbox.hideAll();

        bootbox.confirm({
            size: "small",
            message: "Are you sure you want to delete the area?",
            callback: function (result) {
                /* result is a boolean; true = OK, false = Cancel*/
                if (result) {

                    let xhr = new XMLHttpRequest();

                    if (!xhr) {
                        return false;
                    }

                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == XMLHttpRequest.DONE) {
                            let json = JSON.parse(xhr.responseText);
                        }
                    }

                    xhr.open("DELETE", "https://convoyer.mobsscmd.com/patrolareas/" + areaID, true);

                    xhr.send(null);

                    bootbox.hideAll();
                    bootbox.alert('Area has been deleted!');
                    window.setTimeout(function () {
                        parent.location.reload();
                    }, 2000);

                } else {

                }
            }
        })


    }

    function loadRoute() {

        let xhr = new XMLHttpRequest();

        if (!xhr) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                console.log('logging currentroutes response: ' + xhr.responseText);
                let json = JSON.parse(xhr.responseText);
                if (json.length > 0) {
                    let routeID = json[0].RouteID;
                    loadCurrentRoute(routeID);
                }


            }
        }

        xhr.open("GET", "https://convoyer.mobsscmd.com/currentroutes/" + id, true);

        xhr.send(null);

    }

    function deleteRoute(routeID) {

        let xhr = new XMLHttpRequest();

        if (!xhr) {
            return false;
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                let json = JSON.parse(xhr.responseText);
            }
        }

        xhr.open("DELETE", "https://convoyer.mobsscmd.com/routes/" + routeID, true);

        xhr.send(null);

        bootbox.hideAll();

        bootbox.alert('Route has been deleted!');

        window.setTimeout(function () {
            parent.location.reload();
        }, 2000);

        route.setPath([]);

        cancelRouteButton.style.display = 'none';
        clearCheckpointsButton.style.display = 'none';
        removeLastCheckpointButton.style.display = 'none';
        saveRouteButton.style.display = 'none';
        loadRouteButton.style.display = 'none';
        addAreaButton.style.display = 'block'
        deleteAreaButton.style.display = 'block';
        addRouteButton.style.display = 'block'
        deleteRouteButton.style.display = 'block';



    }

    function postCheckpoints(routeID) {
        let s = 0;
        console.log("logging route:");
        console.log(route);
        let coords = route.getPath().getArray();
        console.log("logging coords:");
        console.log(coords);
        for (let latLng of coords) {
            let checkpointID = createCheckpointID();

            let xhr = new XMLHttpRequest();

            if (!xhr) {
                alert('Giving up :( Cannot create an XMLHTTP instance');
                return false;
            }

            xhr.open("POST", "https://convoyer.mobsscmd.com/checkpoints", true);

            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({
                "CheckpointID": checkpointID,
                "Sequence": s,
                "lat": latLng.lat(),
                "lng": latLng.lng(),
                "RouteID": routeID
            }));

            s++;

        }
    }

    function loadCurrentRoute(routeID) {


        let xhr = new XMLHttpRequest();

        if (!xhr) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                console.log('logging checkpoints response: ' + xhr.responseText);
                var checkpoints = JSON.parse(xhr.responseText);
                loadRouteOnMap(checkpoints);

            }
        }

        xhr.open("GET", "https://convoyer.mobsscmd.com/checkpoints/" + routeID, true);

        xhr.send(null);
    }

    function loadRouteOnMap(checkpoints) {

        route.setPath([]);

        if (checkpoints.length > 0) {
            for (let i = 0; i < checkpoints.length; i++) {
                var latLng = new google.maps.LatLng(checkpoints[i].lat, checkpoints[i].lng);
                route.getPath().push(latLng);
            }
        }

        map.setCenter({
            lat: checkpoints[0].lat,
            lng: checkpoints[0].lng
        });


    }

    function createRouteID() {
        var newRouteID = Math.random().toString(36).substr(2, 9);
        return newRouteID;
    }

    function createAreaID() {
        var newAreaID = Math.random().toString(36).substr(2, 9);
        return newAreaID;
    }

    function createCheckpointID() {
        var newCheckpointID = Math.random().toString(36).substr(2, 9);
        return newCheckpointID;
    }

}
