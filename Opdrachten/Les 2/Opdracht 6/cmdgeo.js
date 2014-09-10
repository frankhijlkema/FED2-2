// Namespace cmdGeo App
var cmdGeo = cmdGeo || {};

(function()
{
    // Variable declaration
    cmdGeo.SANDBOX = "SANDBOX";
    cmdGeo.LINEAIR = "LINEAIR";
    cmdGeo.GPS_AVAILABLE = 'GPS_AVAILABLE';
    cmdGeo.GPS_UNAVAILABLE = 'GPS_UNAVAILABLE';
    cmdGeo.POSITION_UPDATED = 'POSITION_UPDATED';
    cmdGeo.REFRESH_RATE = 1000;
    cmdGeo.currentPosition = currentPositionMarker = customDebugging = debugId = map = interval =intervalCounter = updateMap = false;
    cmdGeo.locatieRij = markerRij = [];

    cmdGeo.controller =
    {
        init: function()
        {
            // init all functions for starting cmdGeo App
            cmdGeo.gps.init();
        }
    };

    cmdGeo.gps =
    {
        init: function()
        {

        },

        startInterval: function(event)
        {

        },

        setPosition: function(position)
        {

        },

        updatePosition: function()
        {

        },

        checkLocations: function(event)
        {

        },

        calculateDistance: function(p1, p2)
        {

        }
    };

    cmdGeo.maps =
    {
        generate: function(myOptions, canvasId)
        {

        },

        updatePosition: function(event)
        {

        }
    };

    cmdGeo.debug =
    {
        geoErrorHandler: function(code, message)
        {

        },

        message: function(message)
        {

        },

        setCustomDebugging: function(debugId)
        {

        }
    };

    cmdGeo.helper =
    {
        isNumber: function(n)
        {

        }
    };

})();