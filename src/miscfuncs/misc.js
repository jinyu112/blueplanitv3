module.exports = {
    include: function (arr, obj) {
        return (arr.indexOf(obj) !== -1);
    },

    // Returns the index of an object in an array of objects that matches the "name" field
    findEventObjectByName: function (arr, name) {
        // note: the "name" field is hardcoded here (ie an array of objects that contain a key/field called "name"
        // is required!)
        if (arr.length > 0) {
            return arr.map(function (x) { return x.name; }).indexOf(name);
        }
        else return -1;
    },

    isObjEmpty: function (obj) {
        return (Object.keys(obj).length === 0 && obj.constructor === Object) // empty returns 1
    },

    convertMilTime: function (milTime) {
        if (milTime.localeCompare("9999") === 0) { //None item is populated with 999 military time
            return "";
        }
        else if (milTime.localeCompare("Food") === 0) {
            return "Food"
        }
        if (milTime.length > 0) {
            if (milTime.length === 3) {
                milTime = "0" + milTime;
            }

            // fetch
            var hours = Number(milTime.substring(0, 2));
            var minutes = Number(milTime.substring(2, 4));
            // var seconds = 0;

            // calculate
            var timeValue;

            if (hours > 0 && hours <= 12) {
                timeValue = "" + hours;
            } else if (hours > 12) {
                timeValue = "" + (hours - 12);
            }
            else if (hours === 0) {
                timeValue = "12";
            }

            timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
            timeValue += (hours >= 12) ? " P.M." : " A.M.";  // get AM/PM
            return timeValue;
        } else {
            return "";
        }
    },

    round2NearestHundredth: function (number) {
        return Math.round(100 * number) / 100;
    },

    round2NearestTenth: function (number) {
        return Math.round(10 * number) / 10;
    },

    convertTimeToAMPM: function (resultsArray_in) {
        var resultsArray_out = resultsArray_in.slice();
        var timeConverted;
        for (var i = 0; i < resultsArray_out.length; i++) {
            timeConverted = this.convertMilTime(resultsArray_out[i].time);
            if (timeConverted !== -1) {
                resultsArray_out[i].time = timeConverted;
            }
        }
        return resultsArray_out;
    },

    findMaxValueInArray: function (arr) {
        if (arr.length === 0) {
            return -1;
        }

        var max = arr[0];
        var maxIndex = 0;

        for (var i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                maxIndex = i;
                max = arr[i];
            }
        }

        return maxIndex;
    },

    deg2rad: function (deg) {
        return deg * (Math.PI / 180)
    },

    getDistanceFromLatLonInKm: function (lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = (Math.PI / 180) * (lat2 - lat1);  // deg2rad below
        var dLon = (Math.PI / 180) * (lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((Math.PI / 180) * (lat1)) * Math.cos((Math.PI / 180) * (lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        d = d * 0.621371; // distance in miles
        return d;
    },

    capFirstLetter: function (str_in) {
        if (!str_in || str_in === undefined || str_in === null) {
            str_in = "";
        }
        return str_in = str_in.charAt(0).toUpperCase() + str_in.substr(1);
    },

    getTimeDifference: function (start, end) {
        var d1 = new Date(0);
        d1.setHours(parseInt(start.toString().substr(0, 2), 10));
        d1.setMinutes(parseInt(start.toString().substr(2, 2), 10));
        var d2 = new Date(0);
        d2.setHours(parseInt(end.toString().substr(0, 2), 10));
        d2.setMinutes(parseInt(end.toString().substr(2, 2), 10));
        return d2.getTime() - d1.getTime();
    },

    msToTime: function (duration) {
        var milliseconds = parseInt((duration % 1000) / 100),
            seconds = parseInt((duration / 1000) % 60),
            minutes = parseInt((duration / (1000 * 60)) % 60),
            hours = parseInt((duration / (1000 * 60 * 60)) % 24);

        // hours = (hours < 10) ? "0" + hours : hours;
        // minutes = (minutes < 10) ? "0" + minutes : minutes;
        // seconds = (seconds < 10) ? "0" + seconds : seconds;

        var outputStr = '';
        if (minutes === 0.0) {
            outputStr = hours + " hours";
        }
        else {
            outputStr = hours + " hours and " + minutes + " minutes";
        }

        return outputStr;
    },

    randomIntFromInterval: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    // check user input location, limit to within north america, austraila, and western europe for now (1/10/19)
    // this currently ONLY works with the google maps geocoder
    checkIfValidLocation: function (data_latlon) { 
        var validFlag = false;
        var returnOption = 0;
        var countryCodes = ['AD', 'AL', 'AM', 'AT',
            'BY', 'BE', 'BA', 'BG',
            'CH', 'CY', 'CZ', 'DE',
            'DK', 'EE', 'ES', 'FO',
            'FI', 'FR', 'GB', 'GE',
            'GI', 'GR', 'HU', 'HR',
            'IE', 'IS', 'IT', 'LT',
            'LU', 'LV', 'MC', 'MK',
            'MT', 'NO', 'NL', 'PO',
            'PT', 'RO', 'SE', 'SI',
            'SK', 'SM', 'TR', 'VA', //western ish europe
            'US', 'CA', //north america
            'AU'] //austrailia
        if (data_latlon && data_latlon.results.length > 0
            && data_latlon.status.localeCompare("OK") === 0) {
            if (data_latlon.results[0].address_components) {
                var len = data_latlon.results[0].address_components.length;
                var country = data_latlon.results[0].address_components[len - 1].short_name; // US or CA for now
                validFlag = false;
                returnOption = 1; //outside of listed countries                
                for (var i = 0; i < countryCodes.length; i++) {
                    if (country.localeCompare(countryCodes[i]) === 0) {                        
                        validFlag = true;
                        returnOption = 0; // location in listed countries
                        break;
                    }                    
                }
            }
        }
        else {
            validFlag = false;
            returnOption = 2; // invalid location
        }

        return {
            validFlag: validFlag,
            returnOption: returnOption,
        }
    },
    // Check for a valid date from the user input
    isDate: function(d) {
    if (Object.prototype.toString.call(d) === "[object Date]") {
        // it is a date
        if (isNaN(d.getTime())) {  // d.valueOf() could also work
            // date is not valid
            return 0;
        }
        else {
            // date is valid
            return 1;
        }
    }
    else {
        // not a date
        return 0;
    }
}

}