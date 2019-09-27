function openSlideMenu() {
    document.getElementById('side-menu').style.width = '250px';
    document.getElementById('main').style.marginLeft = '250px';
}

function closeSlideMenu() {
    document.getElementById('side-menu').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
}

const signUpButton = document.getElementById('registrieren');
const signInButton = document.getElementById('einloggen');
const container = document.getElementById('container');


function initMap() {
    var location = { lat: 52.506080, lng: 13.320854 };

    var styledMapType = new google.maps.StyledMapType(
        [{
                "featureType": "landscape",
                "stylers": [{
                        "saturation": -100
                    },
                    {
                        "lightness": 60
                    }
                ]
            },
            {
                "featureType": "road.local",
                "stylers": [{
                        "saturation": -100
                    },
                    {
                        "lightness": 40
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "transit",
                "stylers": [{
                        "saturation": -100
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "administrative.province",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "water",
                "stylers": [{
                        "visibility": "on"
                    },
                    {
                        "lightness": 30
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{
                        "color": "#ef8c25"
                    },
                    {
                        "lightness": 40
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [{
                        "color": "#b6c54c"
                    },
                    {
                        "lightness": 40
                    },
                    {
                        "saturation": -40
                    }
                ]
            },
            {}
        ], { name: 'Styled Map from Snazzy' });
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: location,
        mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                'styled_map'
            ]
        }
    });
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });

    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');
};