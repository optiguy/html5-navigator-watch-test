class GEO {

    constructor(cssId) {
        this.cssId = cssId || 'demo';
        this.wrapper = document.getElementById(this.cssId);
        this.geoLocation = navigator.geolocation;
        this.watchPositions = {};
        this.watchOptions = {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 0
        };
        this.error = function (err) {

            var textError = '';
            if(err.code == 1){
                textError = 'PERMISSION_DENIED';
            } else if(err.code == 2) {
                textError = 'POSITION_UNAVAILABLE';
            } else if(err.code == 3) {
                textError = 'TIMEOUT';
            }
            console.warn('ERROR ' + textError + '(' + err.code + '): ' + err.message);
        };

        if (!this.geoLocation) {
            this.wrapper.innerHTML = "Geo-location is not supported by this browser.";
        }
    }

    getPos() {
        navigator.geolocation.getCurrentPosition(function (position) {
            this.wrapper.innerHTML =
                "Latitude: " + position.coords.latitude +
                "<br>Longitude: " + position.coords.longitude;
        }.bind(this));
    }

    setWatchPos(lat, long) {

        var target = {
            latitude: lat,
            longitude: long
        };

        var watchId = navigator.geolocation.watchPosition(function (pos) {

            var crd = pos.coords;

            if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
                console.log('Congratulations, you reached the target');
                alert('Congratulations, you reached the target');
                navigator.geolocation.clearWatch(watchId);
                target = this.watchPositions[watchId];
            }
        }, this.error, this.watchOptions);

        this.watchPositions[watchId] = target;
    }
}

var test = new GEO();
test.getPos(); //Get once
test.setWatchPos(55,12); // Keep getting user position
test.setWatchPos(5,1); // Keep getting user position
test.setWatchPos(5,2); // Keep getting user position
console.log(test.watchPositions);