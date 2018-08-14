function initMap() {

    let currentArea = area[0];

    let center = { lat: currentArea.lat, lng: currentArea.lng }

    let alreadyCalled = false;

    var socket = io();

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


    const guardContainer = parent.document.querySelector('#guardContainer');
    const guardPS = new PerfectScrollbar(guardContainer);

    const incidentContainer = parent.document.querySelector('#incidentContainer');
    const incidentPS = new PerfectScrollbar(incidentContainer);

    const COLORS = [
        '#e21400', '#f78b00',
        '#58dc00', '#f800cd',
        '#3b88eb', '#8357ec'
    ];


    socket.on('incident', function (incident) {
        window.setTimeout(function () {
            parent.location.reload();
        }, 1000);
    });

    socket.on('first location', function (incident) {
        window.setTimeout(function () {
            parent.location.reload();
        }, 2000);
    });

    socket.on('user left', function (incident) {

        window.setTimeout(function () {
            parent.location.reload();
        }, 1000);
    });

    if (locations.length > 0) {


        let firstLocationLat = locations[0].lat;
        let firstLocationLng = locations[0].lng;

        if (incidents.length > 0) {
            firstLocationLat = incidents[0].lat;
            firstLocationLng = incidents[0].lng;
        }

        // Snazzy Map Style - https://snazzymaps.com/style/6618/cladme


        var map = new google.maps.Map(document.getElementById('map'), {
            styles: mapStyle,
            zoom: 18,
            center: { lat: firstLocationLat, lng: firstLocationLng },
            mapTypeId: google.maps.MapTypeId.MAP,
            streetViewControl: false,
            clickableIcons: false,
            fullscreenControl: false,
            mapTypeControl: true,
            panControl: false,
            rotateControl: false,
        });

        createGuards();

    } else {

        if (incidents.length > 0) {
            center = { lat: incidents[0].lat, lng: incidents[0].lng }
        }

        var map = new google.maps.Map(document.getElementById('map'), {
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

    }

    createIncidentMarkers();
    createIncidentButtons();

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


    let addRouteButton = parent.document.getElementById("addRouteButton");
    let cancelRouteButton = parent.document.getElementById('cancelRouteButton');
    let clearCheckpointsButton = parent.document.getElementById('clearCheckpointsButton');
    let removeLastCheckpointButton = parent.document.getElementById('removeLastCheckpointButton');
    let saveRouteButton = parent.document.getElementById('saveRouteButton');
    let loadRouteButton = parent.document.getElementById('loadRouteButton');

    addRouteButton.addEventListener('click', function (e) {
        onAddRoute();
    });

    cancelRouteButton.addEventListener('click', function (e) {
        onCancelRoute();
    });

    clearCheckpointsButton.addEventListener('click', function (e) {
        onClearCheckpoints(route);
    })

    removeLastCheckpointButton.addEventListener('click', function (e) {
        onRemoveLastCheckpoint(route)
    });

    saveRouteButton.addEventListener('click', function (e) {
        onSaveRouteAll()
    });

    loadRouteButton.addEventListener('click', function (e) {
        onSelectRoute(route);
    });

    function createGuards() {

        for (let i = 0; i < locations.length; i++) {

            let location = locations[i];
            let id = location.GuardID;
            let firstName = location.FirstName;

            let routeColor = getRouteColor(firstName);


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
                strokeColor: routeColor,
                strokeOpacity: 1,
                strokeWeight: 5,
                icons: [routeSeq]
            })

            google.maps.event.addListener(route, 'click', function (e) {
                onAddCheckpoint(route, e.latLng);
            });

            let clearCheckpointsButton = parent.document.getElementById("clearCheckpointsButton" + id);

            let removeLastCheckpointButton = parent.document.getElementById("removeLastCheckpointButton" + id);

            let saveRouteButton = parent.document.getElementById("saveRouteButton" + id);

            let loadRouteButton = parent.document.getElementById("loadRouteButton" + id);

            let editRouteButton = parent.document.getElementById('editRouteButton' + id);

            let queueRoutesButton = parent.document.getElementById('queueRoutesButton' + id);

            let addQueueButton = parent.document.getElementById('addQueueButton' + id);

            let removeQueueButton = parent.document.getElementById('removeQueueButton' + id);

            let cancelQueueButton = parent.document.getElementById('cancelQueueButton' + id);

            let trashRouteButton = parent.document.getElementById('trashRouteButton' + id);

            let endPatrolButton = parent.document.getElementById('endPatrolButton' + id)

            let addRouteButton = parent.document.getElementById('addRouteButton')

            try {
                editRouteButton.addEventListener('click', function (e) {
                    onEditRoute(route, queueRoutesButton, trashRouteButton, clearCheckpointsButton, removeLastCheckpointButton, saveRouteButton, loadRouteButton, locations);
                });

                queueRoutesButton.addEventListener('click', function (e) {
                    onQueueRoutes(queueRoutesButton, addQueueButton, removeQueueButton, cancelQueueButton, trashRouteButton, clearCheckpointsButton, removeLastCheckpointButton, saveRouteButton, loadRouteButton, locations);
                });

                addQueueButton.addEventListener('click', function (e) {
                    onAddQueue();
                });

                removeQueueButton.addEventListener('click', function (e) {
                    onRemoveQueue();
                });

                cancelQueueButton.addEventListener('click', function (e) {
                    queueRoutesButton.style.display = 'none';
                    addQueueButton.style.display = 'none';
                    removeQueueButton.style.display = 'none';
                    cancelQueueButton.style.display = 'none';

                    showAddButton();
                });

                trashRouteButton.addEventListener('click', function (e) {

                    editRouteButton.style.display = 'none';
                    trashRouteButton.style.display = 'none';
                    clearCheckpointsButton.style.display = 'none';
                    removeLastCheckpointButton.style.display = 'none';
                    saveRouteButton.style.display = 'none';
                    loadRouteButton.style.display = 'none';
                    endPatrolButton.style.display = 'none';

                    onTrashRoute(route, id);
                    showAddButton();
                });

                clearCheckpointsButton.addEventListener('click', function (e) {
                    onClearCheckpoints(route);
                })

                removeLastCheckpointButton.addEventListener('click', function (e) {
                    onRemoveLastCheckpoint(route)
                });

                loadRouteButton.addEventListener('click', function (e) {

                    onSelectRoute(route);
                });

                saveRouteButton.addEventListener('click', function (e) {
                    onSaveRoute(route, queueRoutesButton, editRouteButton, trashRouteButton, clearCheckpointsButton, removeLastCheckpointButton, loadRouteButton, saveRouteButton, id);
                });

                endPatrolButton.addEventListener('click', function (e) {
                    onEndPatrol(id, firstName, endPatrolButton);
                });
            } catch (err) {

            }

            let guardButton = parent.document.getElementById(id);

            if (guardButton != null || guardButton != undefined) {

                let lat = location.lat;
                let lng = location.lng;

                socket.on('location ' + id, function (location) {

                    lat = location.location.coords.latitude;
                    lng = location.location.coords.longitude;
                });

                guardButton.addEventListener('click', function (e) {
                    localStorage.setItem("currentGuard", id);

                    localStorage.setItem("alreadyOpenedWindow " + id, true);

                    map.setCenter({
                        lat: lat,
                        lng: lng
                    });

                    changeButtons(location.GuardID, locations, route);


                })

            }

            loadRoute(route, id);

            createGuardMarker(location, locations, route, id);

            createPatrolPath(location, coords, id);
        }
    }

    function createPatrolPath(location, coords, id) {

        let firstName = location.FirstName;

        let pathColor = getPathColor(firstName);

        var patrolSeq = {
            repeat: '30px',
            icon: {
                path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
                scale: 1,
                fillOpacity: 0,
                strokeColor: "red",
                strokeWeight: 1,
                strokeOpacity: 1
            }
        };
        var patrol = new google.maps.Polyline({
            map: map,
            zIndex: 1,
            geodesic: true,
            strokeColor: pathColor,
            strokeOpacity: 1,
            strokeWeight: 3,
            icons: [patrolSeq]
        })


        for (let i = 0; i < coords.length; i++) {
            if (coords[i].PatrolID == location.PatrolID) {
                let latLng = new google.maps.LatLng(coords[i].lat, coords[i].lng);
                if (i > 0) {
                    let lastLocation = new google.maps.LatLng(coords[i - 1].lat, coords[i - 1].lng);

                    let locAccurate = locationIsAccurate(latLng, lastLocation);
                    if (locAccurate) {
                        patrol.getPath().push(latLng);
                    } else {
                        patrol.getPath().pop();
                    }
                } else {
                    patrol.getPath().push(latLng);
                }
            }
        }

        socket.on('location ' + id, function (location) {

            continuePath(patrol, location);
        });



    }

    function continuePath(patrol, location) {


        let lat = location.location.coords.latitude;
        let lng = location.location.coords.longitude;

        patrol.getPath().push(new google.maps.LatLng(lat, lng));
    }

    function changeButtons(GuardID, locations, route) {

        hideAddButton();
        hideCancelButton();
        hideRemoveLastCheckpointButton();
        hideClearCheckpointsButton();
        hideLoadRouteButton();
        hideSaveRouteButton();

        for (let i = 0; i < locations.length; i++) {
            var id = locations[i].GuardID;

            let hideTrashButton = parent.document.getElementById('trashRouteButton' + id);
            let hideEditButton = parent.document.getElementById('editRouteButton' + id);
            let hideQueueButton = parent.document.getElementById('queueRoutesButton' + id);
            let hideClearButton = parent.document.getElementById('clearCheckpointsButton' + id)
            let hideRemoveButton = parent.document.getElementById('removeLastCheckpointButton' + id);
            let hideSaveButton = parent.document.getElementById('saveRouteButton' + id);
            let hideLoadButton = parent.document.getElementById('loadRouteButton' + id);
            let hidePatrolButton = parent.document.getElementById('endPatrolButton' + id);

            hideTrashButton.style.display = 'none';
            hideEditButton.style.display = 'none';
            hideQueueButton.style.display = 'none';
            hideClearButton.style.display = 'none';
            hideRemoveButton.style.display = 'none';
            hideSaveButton.style.display = 'none';
            hideLoadButton.style.display = 'none';
            hidePatrolButton.style.display = 'none';

        }


        let trashRouteButton = parent.document.getElementById('trashRouteButton' + GuardID);
        let editRouteButton = parent.document.getElementById('editRouteButton' + GuardID);
        let queueRoutesButton = parent.document.getElementById('queueRoutesButton' + GuardID);
        let addQueueButton = parent.document.getElementById('addQueueButton' + GuardID);
        let removeQueueButton = parent.document.getElementById('removeQueueButton' + GuardID);
        let cancelQueueButton = parent.document.getElementById('cancelQueueButton' + GuardID);
        let clearCheckpointsButton = parent.document.getElementById("clearCheckpointsButton" + id);
        let removeLastCheckpointButton = parent.document.getElementById('removeLastCheckpointButton' + GuardID);
        let saveRouteButton = parent.document.getElementById('saveRouteButton' + GuardID);
        let loadRouteButton = parent.document.getElementById('loadRouteButton' + GuardID);
        let endPatrolButton = parent.document.getElementById('endPatrolButton' + GuardID)


        trashRouteButton.style.display = 'none';
        clearCheckpointsButton.style.display = 'none';
        removeLastCheckpointButton.style.display = 'none';
        saveRouteButton.style.display = 'none';
        loadRouteButton.style.display = 'none';
        endPatrolButton.style.display = 'none';
        addQueueButton.style.display = 'none';
        removeQueueButton.style.display = 'none';
        cancelQueueButton.style.display = 'none';

        onTrashRoute(route, GuardID);

        editRouteButton.style.display = 'block';
        queueRoutesButton.style.display = 'block';
        endPatrolButton.style.display = 'block';

    }

    function createIncidentButtons() {

        var incidentButtons = [];

        for (let i = 0; i < incidents.length; i++) {
            let incident = incidents[i];
            let incidentButton = parent.document.getElementById(incident.IncidentID);
            let incidentID = incidents[i].IncidentID;

            incidentButton.addEventListener('click', function (e) {

                localStorage.setItem("alreadyOpenedWindow " + incidentID, true);
                map.setCenter({
                    lat: incident.lat,
                    lng: incident.lng
                });
            })

            incidentButtons.push(incidentButton);


        }

    }

    function createGuardMarker(location, locations, route, id) {


        var windowString =
            `
        <h3>`  + location.FirstName + `</h3>`;


        var lat = location.lat;
        var lng = location.lng;
        let marker = new google.maps.Marker({
            position: { lat: lat, lng: lng },
            map: map,
            animation: google.maps.Animation.DROP,
        });

        let markerWindow = new SnazzyInfoWindow({
            marker: marker,
            content: windowString
        });

        let alreadyOpenedWindow = localStorage.getItem('alreadyOpenedWindow ' + id);
        if (!alreadyOpenedWindow) {
            markerWindow.open(map, marker);
        }



        marker.addListener('click', function (e) {
            localStorage.setItem("alreadyOpenedWindow " + id, true);
            markerWindow.open(map, marker);
            changeButtons(id, locations, route);
        });


        socket.on('location ' + id, function (location) {

            let lat = location.location.coords.latitude;
            let lng = location.location.coords.longitude;
            marker.setPosition(new google.maps.LatLng(lat, lng))
        });

    }

    function createIncidentMarkers() {

        for (let i = 0; i < incidents.length; i++) {
            var lat = incidents[i].lat;
            var lng = incidents[i].lng;
            let incidentID = incidents[i].IncidentID;

            let windowString = '';

            if (incidents[i].Media != 'none') {
                windowString = `<h3 >` + incidents[i].Type + ` </h3> 
                    <div> <p>` + incidents[i].Description + `</p> </div> <div> <object id = 'map' data='https://convoyer.mobsscmd.com/incidentpreview/` + incidents[i].IncidentID + `' type='text/html'> <object/> </div>
                    `;
            } else {
                windowString = `<h3 >` + incidents[i].Type + ` </h3>
                <div > <p>` + incidents[i].Description + `</p></div>`
            }


            let marker = new google.maps.Marker({
                position: { lat: lat, lng: lng },
                map: map,
                icon: "../../images/warning.png",
                animation: google.maps.Animation.DROP
            });

            let markerWindow = new SnazzyInfoWindow({
                marker: marker,
                content: windowString
            });

            let alreadyOpenedWindow = localStorage.getItem('alreadyOpenedWindow ' + incidentID);

            if (!alreadyOpenedWindow) {
                markerWindow.open(map, marker);
            }

            marker.addListener('click', function (e) {
                localStorage.setItem("alreadyOpenedWindow " + incidentID, true);
                markerWindow.open(map, marker);
            });
        }
    }

    function createIncidentMarker(incident) {

        let incidentID = incident.incident;

        var xhr = new XMLHttpRequest();

        if (!xhr) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                let json = JSON.parse(xhr.responseText);
                if (json.length > 0) {
                    // loadIncidentMarker(json);
                }
            }
        }

        xhr.open("GET", "https://convoyer.mobsscmd.com/incidents/" + incidentID, true);

        xhr.send(null);

    }

    // function loadIncidentMarker(json) {

    //     let incident = json[0];

    //     var lat = incident.lat;
    //     var lng = incident.lng;


    //     let windowString = '';

    //     if (incident.Media != 'none') {
    //         windowString = `
    //         <h5 style="color:#D20202">Incident Type: `  + incident.Type + `</h5>
    //         <h6 style="color:#404040"> 
    //         ` + incident.Description + `
    //         </h6> ` +
    //             `<object id = 'map' data='https://convoyer.mobsscmd.com/incidentpreview/` + incident.IncidentID + `' width='100%' height='100%' type='text/html'> <object/> `

    //     } else {
    //         windowString = `
    //         <h5 style="color:#D20202">Incident Type: `  + incident.Type + `</h5>
    //         <h6 style="color:#404040"> 
    //         ` + incident.Description + `
    //         </h6> `
    //     }


    //     let marker = new google.maps.Marker({
    //         position: { lat: lat, lng: lng },
    //         map: map,
    //         icon: "../../images/warning.png",
    //         animation: google.maps.Animation.DROP
    //     });


    //     let markerWindow = new SnazzyInfoWindow({
    //         marker: marker,
    //         content: windowString
    //     });

    //     markerWindow.open(map, marker);


    //     marker.addListener('click', function (e) {
    //         markerWindow.open(map, marker);
    //     });

    // }

    function onAddCheckpoint(route, latLng) {
        route.getPath().push(latLng);
        route.setMap(map);
    }

    function onClearCheckpoints(route) {

        route.setPath([]);
    }

    function onRemoveLastCheckpoint(route) {


        route.getPath().pop();

    }

    function onAddRoute() {

        map.addListener('click', function (e) {
            onAddCheckpoint(route, e.latLng);
        });

        google.maps.event.addListener(route, 'click', function (e) {
            onAddCheckpoint(route, e.latLng);
        });

        hideAddButton();
        showCancelButton();
        showClearCheckpointsButton();
        showRemoveLastCheckpointButton();
        showSaveRouteButton();
        showLoadRouteButton();

    }

    function onEditRoute(route, queueRoutesButton, trashRouteButton, clearCheckpointsButton, removeLastCheckpointButton, saveRouteButton, loadRouteButton, locations) {

        for (let i = 0; i < locations.length; i++) {
            var id = locations[i].GuardID;

            var addButton = parent.document.getElementById('editRouteButton' + id);
            var endButton = parent.document.getElementById('endPatrolButton' + id);
            var queueButton = parent.document.getElementById('queueRoutesButton' + id);

            addButton.style.display = 'none';
            endButton.style.display = 'none';
            queueButton.style.display = 'none';
        }

        trashRouteButton.style.display = 'block';
        clearCheckpointsButton.style.display = 'block';
        removeLastCheckpointButton.style.display = 'block';
        saveRouteButton.style.display = 'block';
        loadRouteButton.style.display = 'block';

        map.addListener('click', function (e) {
            onAddCheckpoint(route, e.latLng);
        });

        google.maps.event.addListener(route, 'click', function (e) {
            onAddCheckpoint(route, e.latLng);
        });
    }

    function onQueueRoutes(queueRoutesButton, addQueueButton, removeQueueButton, cancelQueueButton, trashRouteButton, clearCheckpointsButton, removeLastCheckpointButton, saveRouteButton, loadRouteButton, locations) {

        for (let i = 0; i < locations.length; i++) {
            var id = locations[i].GuardID;

            var addButton = parent.document.getElementById('editRouteButton' + id);
            var endButton = parent.document.getElementById('endPatrolButton' + id);
            var queueRoutesButton = parent.document.getElementById('queueRoutesButton' + id);

            addButton.style.display = 'none';
            endButton.style.display = 'none';
            queueRoutesButton.style.display = 'none';
        }

        addQueueButton.style.display = 'block';
        removeQueueButton.style.display = 'block';
        cancelQueueButton.style.display = 'block';

    }

    function onAddQueue() {

        var xhr = new XMLHttpRequest();

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
                        let buttonClass = 'btn-primary';
                        let routeID = json[i].RouteID
                        routeButtons.push({
                            label: label,
                            className: buttonClass,
                            callback: function () {
                                onAddRouteToQueue(routeID);
                            }
                        });
                    }

                    bootbox.hideAll();

                    var dialog = bootbox.dialog({
                        title: 'Add To Queue',
                        message: "<p>Select the route you wish to add to the queue.</p>",
                        buttons: routeButtons
                    });
                }
            }
        }

        xhr.open("GET", "https://convoyer.mobsscmd.com/routes/", true);

        xhr.send(null);

    }

    function onAddRouteToQueue(routeID) {

        let currentGuard = localStorage.getItem("currentGuard");

        let queuePosition = parseInt(localStorage.getItem(currentGuard + ' que position'));

        if (queuePosition > 1) {
            localStorage.setItem(currentGuard + ' que position', parseInt(queuePosition + 1));
        } else {
            localStorage.setItem(currentGuard + ' que position', 2);
        }




        let newPosition = localStorage.getItem(currentGuard + ' que position');

        console.log('logging the queue position');
        console.log(newPosition);

        /** TODO
         * add controller and model and route for addtoqueue

         */

        let xhr = new XMLHttpRequest();

        if (!xhr) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }

        xhr.open("PUT", "https://convoyer.mobsscmd.com/queueroute", true);
        xhr.setRequestHeader('Content-Type', 'application/json');


        xhr.send(JSON.stringify({
            "QueuePosition": newPosition,
            "RouteID": routeID,
            "GuardID": currentGuard
        }));


        let id = currentGuard;

        let clearCheckpointsButton = parent.document.getElementById("clearCheckpointsButton" + id);

        let removeLastCheckpointButton = parent.document.getElementById("removeLastCheckpointButton" + id);

        let saveRouteButton = parent.document.getElementById("saveRouteButton" + id);

        let loadRouteButton = parent.document.getElementById("loadRouteButton" + id);

        let editRouteButton = parent.document.getElementById('editRouteButton' + id);

        let addQueueButton = parent.document.getElementById('addQueueButton' + id);

        let removeQueueButton = parent.document.getElementById('removeQueueButton' + id);

        let cancelQueueButton = parent.document.getElementById('cancelQueueButton' + id);

        let queueRoutesButton = parent.document.getElementById('queueRoutesButton' + id);

        let trashRouteButton = parent.document.getElementById('trashRouteButton' + id);

        let endPatrolButton = parent.document.getElementById('endPatrolButton' + id)

        try {
            editRouteButton.style.display = 'none';
            queueRoutesButton.style.display = 'none';
            addQueueButton.style.display = 'none';
            removeQueueButton.style.display = 'none';
            cancelQueueButton.style.display = 'none';
            trashRouteButton.style.display = 'none';
            clearCheckpointsButton.style.display = 'none';
            removeLastCheckpointButton.style.display = 'none';
            saveRouteButton.style.display = 'none';
            loadRouteButton.style.display = 'none';
            endPatrolButton.style.display = 'none';

            addRouteButton.style.display = 'block';

        } catch (e) {

        }

    }

    function onRemoveQueue() {

        let currentGuard = localStorage.getItem("currentGuard");
        var xhr = new XMLHttpRequest();

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
                        let buttonClass = 'btn-primary';
                        let routeID = json[i].RouteID
                        routeButtons.push({
                            label: label,
                            className: buttonClass,
                            callback: function () {
                                onRemoveRouteFromQueue(routeID);
                            }
                        });
                    }

                    bootbox.hideAll();

                    var dialog = bootbox.dialog({
                        title: 'Remove From Queue',
                        message: "<p>Select the route you wish to remove from the queue.</p>",
                        buttons: routeButtons
                    });
                }
            }
        }

        xhr.open("GET", "https://convoyer.mobsscmd.com/currentroutes/" + currentGuard, true);

        xhr.send(null);
    }

    function onRemoveRouteFromQueue(routeID) {

        let currentGuard = localStorage.getItem("currentGuard");

        let xhr = new XMLHttpRequest();

        if (!xhr) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }

        xhr.open("PUT", "https://convoyer.mobsscmd.com/queueroute", true);
        xhr.setRequestHeader('Content-Type', 'application/json');


        xhr.send(JSON.stringify({
            "QueuePosition": 0,
            "RouteID": routeID,
            "GuardID": currentGuard
        }));


        let id = currentGuard;

        let clearCheckpointsButton = parent.document.getElementById("clearCheckpointsButton" + id);

        let removeLastCheckpointButton = parent.document.getElementById("removeLastCheckpointButton" + id);

        let saveRouteButton = parent.document.getElementById("saveRouteButton" + id);

        let loadRouteButton = parent.document.getElementById("loadRouteButton" + id);

        let editRouteButton = parent.document.getElementById('editRouteButton' + id);

        let addQueueButton = parent.document.getElementById('addQueueButton' + id);

        let removeQueueButton = parent.document.getElementById('removeQueueButton' + id);

        let cancelQueueButton = parent.document.getElementById('cancelQueueButton' + id);

        let queueRoutesButton = parent.document.getElementById('queueRoutesButton' + id);

        let trashRouteButton = parent.document.getElementById('trashRouteButton' + id);

        let endPatrolButton = parent.document.getElementById('endPatrolButton' + id)

        try {
            editRouteButton.style.display = 'none';
            queueRoutesButton.style.display = 'none';
            addQueueButton.style.display = 'none';
            removeQueueButton.style.display = 'none';
            cancelQueueButton.style.display = 'none';
            trashRouteButton.style.display = 'none';
            clearCheckpointsButton.style.display = 'none';
            removeLastCheckpointButton.style.display = 'none';
            saveRouteButton.style.display = 'none';
            loadRouteButton.style.display = 'none';
            endPatrolButton.style.display = 'none';

            addRouteButton.style.display = 'block';

        } catch (e) {

        }


    }

    function onTrashRoute(route, id) {
        google.maps.event.clearListeners(map, 'click');
        google.maps.event.clearListeners(route, 'click');

        loadRoute(route, id);

    }

    function onCancelRoute() {

        google.maps.event.clearListeners(map, 'click');
        google.maps.event.clearListeners(route, 'click');

        route.setMap(null);
        route.setPath([]);
        route.setMap(map);

        hideCancelButton()
        hideClearCheckpointsButton();
        hideRemoveLastCheckpointButton();
        hideSaveRouteButton();
        hideLoadRouteButton();
        showAddButton();
    }

    function hideAddButton() {
        let addRouteButton = parent.document.getElementById('addRouteButton');
        addRouteButton.style.display = 'none'
    }

    function showAddButton() {
        let addRouteButton = parent.document.getElementById('addRouteButton');
        addRouteButton.style.display = 'block'
    }

    function hideCancelButton() {
        let cancelRouteButton = parent.document.getElementById('cancelRouteButton');
        cancelRouteButton.style.display = 'none';
    }

    function showCancelButton() {
        let cancelRouteButton = parent.document.getElementById('cancelRouteButton');
        cancelRouteButton.style.display = 'block';
    }

    function hideClearCheckpointsButton() {
        let clearCheckpointsButton = parent.document.getElementById('clearCheckpointsButton');
        clearCheckpointsButton.style.display = 'none';
    }

    function showClearCheckpointsButton() {
        let clearCheckpointsButton = parent.document.getElementById('clearCheckpointsButton');
        clearCheckpointsButton.style.display = 'block';
    }

    function hideRemoveLastCheckpointButton() {
        let removeLastCheckpointButton = parent.document.getElementById('removeLastCheckpointButton');
        removeLastCheckpointButton.style.display = 'none';
    }

    function showRemoveLastCheckpointButton() {
        let removeLastCheckpointButton = parent.document.getElementById('removeLastCheckpointButton');
        removeLastCheckpointButton.style.display = 'block';
    }

    function hideSaveRouteButton() {
        let saveRouteButton = parent.document.getElementById('saveRouteButton');
        saveRouteButton.style.display = 'none';
    }

    function showSaveRouteButton() {
        let saveRouteButton = parent.document.getElementById('saveRouteButton');
        saveRouteButton.style.display = 'block';
    }

    function hideLoadRouteButton() {
        let loadRouteButton = parent.document.getElementById('loadRouteButton');
        loadRouteButton.style.display = 'none';
    }

    function showLoadRouteButton() {
        let loadRouteButton = parent.document.getElementById('loadRouteButton');
        loadRouteButton.style.display = 'block';
    }

    function onEndPatrol(id, firstName, endPatrolButton) {

        bootbox.hideAll();

        bootbox.confirm({
            size: "small",
            message: "Are you sure you want to end " + firstName + "'s patrol?",
            callback: function (result) {
                /* result is a boolean; true = OK, false = Cancel*/
                if (result) {

                    socket.emit('stop', id);

                    endPatrolButton.style.display = 'none';

                    var xhr = new XMLHttpRequest();

                    if (!xhr) {
                        alert('Giving up :( Cannot create an XMLHTTP instance');
                        return false;
                    }

                    xhr.open("PUT", "https://convoyer.mobsscmd.com/patrols", true);
                    xhr.setRequestHeader('Content-Type', 'application/json');

                    xhr.send(JSON.stringify({
                        "CurrentPatrol": 0,
                        "GuardID": id,
                        'PatrolID': ''
                    }));

                    coordPut(id);

                    parent.location.reload();

                } else {

                }
            }
        })
    }

    function onSaveRoute(route, queueRoutesButton, editRouteButton, trashRouteButton, clearCheckpointsButton, removeLastCheckpointButton, loadRouteButton, saveRouteButton, id) {

        bootbox.hideAll();


        bootbox.prompt("Enter a name for the route.", function (result) {
            if (result === null) {
            } else {


                let cleanInput = result.replace(/[^a-zA-Z0-9 ]/g, "");

                editRouteButton.style.display = 'none';
                queueRoutesButton.style.display = 'none';
                trashRouteButton.style.display = 'none';
                clearCheckpointsButton.style.display = 'none';
                removeLastCheckpointButton.style.display = 'none';
                saveRouteButton.style.display = 'none';
                loadRouteButton.style.display = 'none';
                google.maps.event.clearListeners(map, 'click');
                google.maps.event.clearListeners(route, 'click');

                var currentGuard = localStorage.getItem("currentGuard");

                var routeID = createID();
                var xhr = new XMLHttpRequest();

                if (!xhr) {
                    alert('Giving up :( Cannot create an XMLHTTP instance');
                    return false;
                }

                xhr.open("POST", "https://convoyer.mobsscmd.com/routes", true);

                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify({
                    "RouteID": routeID,
                    "RouteName": cleanInput,
                    "QueuePosition": 1,
                    "GuardID": currentGuard
                }));

                postCheckpoints(route, routeID);

                socket.emit('load route');

                bootbox.hideAll();

                bootbox.alert('Route has been set as the current route!');

            }
        });
    }

    function onSaveRouteAll() {

        bootbox.hideAll();

        bootbox.prompt("Enter a name for the route.", function (result) {
            if (result === null) {
            } else {
                let cleanInput = result.replace(/[^a-zA-Z0-9 ]/g, "");

                google.maps.event.clearListeners(map, 'click');
                google.maps.event.clearListeners(route, 'click');

                var currentGuard = localStorage.getItem("currentGuard");

                var routeID = createID();
                var xhr = new XMLHttpRequest();

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

                postCheckpoints(route, routeID);

                google.maps.event.clearListeners(map, 'click');
                google.maps.event.clearListeners(route, 'click');

                route.setMap(null);
                route.setPath([]);
                route.setMap(map);

                hideCancelButton()
                hideClearCheckpointsButton();
                hideRemoveLastCheckpointButton();
                hideSaveRouteButton();
                hideLoadRouteButton();
                showAddButton();

                bootbox.hideAll();

                bootbox.alert('Route has been saved for later!');


            }
        });



    }

    function onSelectRoute(route) {
        var xhr = new XMLHttpRequest();

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
                        let buttonClass = 'btn-primary';
                        let routeID = json[i].RouteID
                        routeButtons.push({
                            label: label,
                            className: buttonClass,
                            callback: function () {
                                setCurrentRoute(routeID, route);
                                loadCurrentRoute(routeID, route);
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

    function loadRoute(route, id) {

        var xhr = new XMLHttpRequest();

        if (!xhr) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                let json = JSON.parse(xhr.responseText);
                if (json.length > 0) {
                    let routeID = json[0].RouteID;
                    loadCurrentRoute(routeID, route);
                }
            }
        }

        xhr.open("GET", "https://convoyer.mobsscmd.com/currentroutes/" + id, true);

        xhr.send(null);

        socket.emit('load route');

    }

    function setCurrentRoute(routeID, route) {

        let currentGuard = localStorage.getItem("currentGuard");

        let xhr = new XMLHttpRequest();

        if (!xhr) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }

        xhr.open("PUT", "https://convoyer.mobsscmd.com/setcurrentroute", true);
        xhr.setRequestHeader('Content-Type', 'application/json');


        xhr.send(JSON.stringify({
            "QueuePosition": 1,
            "RouteID": routeID,
            "GuardID": currentGuard
        }));


        let id = currentGuard;

        let clearCheckpointsButton = parent.document.getElementById("clearCheckpointsButton" + id);

        let removeLastCheckpointButton = parent.document.getElementById("removeLastCheckpointButton" + id);

        let saveRouteButton = parent.document.getElementById("saveRouteButton" + id);

        let loadRouteButton = parent.document.getElementById("loadRouteButton" + id);

        let editRouteButton = parent.document.getElementById('editRouteButton' + id);

        let queueRoutesButton = parent.document.getElementById('queueRoutesButton' + id);

        let trashRouteButton = parent.document.getElementById('trashRouteButton' + id);

        let endPatrolButton = parent.document.getElementById('endPatrolButton' + id)

        try {
            editRouteButton.style.display = 'none';
            queueRoutesButton.style.display = 'none';
            trashRouteButton.style.display = 'none';
            clearCheckpointsButton.style.display = 'none';
            removeLastCheckpointButton.style.display = 'none';
            saveRouteButton.style.display = 'none';
            loadRouteButton.style.display = 'none';
            endPatrolButton.style.display = 'none';
        } catch (e) {

        }


        onTrashRoute(route, id);


    }

    function coordPut(id) {

        var xhr = new XMLHttpRequest();

        if (!xhr) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }

        xhr.open("PUT", "https://convoyer.mobsscmd.com/coordinates", true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.send(JSON.stringify({
            "CurrentCoord": 0,
            "GuardID": id
        }));

    }

    function postCheckpoints(route, routeID) {
        let s = 0;

        let coords = route.getPath().getArray();

        for (let latLng of coords) {
            let checkpointID = createID();

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

    function loadCurrentRoute(routeID, route) {

        var xhr = new XMLHttpRequest();

        if (!xhr) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                var checkpoints = JSON.parse(xhr.responseText);
                loadRouteOnMap(checkpoints, route);

            }
        }

        xhr.open("GET", "https://convoyer.mobsscmd.com/checkpoints/" + routeID, true);

        xhr.send(null);
    }

    function loadRouteOnMap(checkpoints, route) {

        route.setPath([]);

        if (checkpoints.length > 0) {
            for (let i = 0; i < checkpoints.length; i++) {
                var latLng = new google.maps.LatLng(checkpoints[i].lat, checkpoints[i].lng);
                route.getPath().push(latLng);
            }
        }
    }

    function createID() {
        var newID = Math.random().toString(36).substr(2, 9);
        return newID;
    }

    function getPathColor(username) {
        // Compute hash code
        var hash = 7;
        for (var i = 0; i < username.length; i++) {
            hash = username.charCodeAt(i) + (hash << 5) - hash;
        }
        // Calculate color
        var index = Math.abs(hash % COLORS.length);
        return COLORS[index];
    }

    function getRouteColor(username) {
        // Compute hash code
        var hash = 11;
        for (var i = 0; i < username.length; i++) {
            hash = username.charCodeAt(i) + (hash << 5) - hash;
        }
        // Calculate color
        var index = Math.abs(hash % COLORS.length);
        return COLORS[index];
    }

    function refreshPage(seconds) {


        if (alreadyCalled) {
            return;
        }

        alreadyCalled = true;

        var count = seconds;

        var counter = setInterval(timer, 1000);

        function timer() {
            count = count - 1;
            if (count <= 0) {
                clearInterval(counter);
                parent.location.reload();

            }

            try {
                parent.document.getElementById("refreshtimer").innerHTML = "Refreshing in " + count + " seconds";
            } catch (err) {
            }
        }
    }

}
