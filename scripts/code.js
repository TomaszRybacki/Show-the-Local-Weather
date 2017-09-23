/*jslint es6 */
var api = "https://fcc-weather-api.glitch.me/api/current?";
var lat, lon;
var currentTemp;
var tempUnit = "C";
var $;

$(document).ready(function () {
    "use strict";
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = "lat=" + position.coords.latitude;
            var lon = "lon=" + position.coords.longitude;
            getWeather(lat, lon);
        });
    } else {
        $("#city").text("Geolokacja nie jest wspierana przez tą przeglądarkę.");
    }
});

function getWeather(lat, lon) {
    "use strict";
    var urlString = api + lat + "&" + lon;
    $.ajax({
        url: urlString,
        success: function (result) {
            $("#city h2").text(result.name);
            currentTemp = Math.round(result.main.temp * 10) / 10;
            $("p").text(currentTemp);
            IconGen(result.weather[0].main);
        }
    });
}


function IconGen(desc) {
    "use strict";
    var desc = desc.toLowerCase();
    switch (desc) {
    case "drizzle":
        $("#icons img").attr("src", "images/czesciowe.png");
        break;
    case "clouds":
        $("#icons img").attr("src", "images/chmury.png");
        break;
    case "rain":
        $("#icons img").attr("src", "images/deszcz.png");
        break;
    case "snow":
        $("#icons img").attr("src", "images/snieg.png");
        break;
    case "clear":
        $("#icons img").attr("src", "images/slonce.png");
        break;
    case "thunderstom":
        $("#icons img").attr("src", "images/burza.png");
        break;
    }
}

$("#button").on("click", function () {
    "use strict";
    if (tempUnit === "C") {
        currentTemp = Math.round(((9 / 5) * currentTemp) + 32);
        $("p").text(currentTemp);
        $(".jednostka").html("&#8457;");
        tempUnit = "F";
    } else {
        currentTemp = Math.round((5 / 9) * (currentTemp - 32));
        $("p").text(currentTemp);
        $(".jednostka").html("&#x2103;");
        tempUnit = "C";
    }
});


