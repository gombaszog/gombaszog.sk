if ($("#livepic").length > 0) {
  setInterval(function () {
    $("#livepic").attr("src", "https://kadbudapest.hu/gombcam/igynezkimostakemping.jpg?" + new Date().getTime());
  }, 20000)
}

if ($("#weatherwrap").length > 0) {

  function fillZeros(st) {
    if ((st.toString().length) < 2) {
      return "0" + st;
    }
    return st;
  }

  function K2C(kelvin) {
    return Math.round(kelvin - 273.15);
  }

  function mps2kmph(mps) {
    return Math.round(36 * mps) / 10;
  }

  function deg2et(deg) {
    if (!deg) {
      return "össze-vissza";
    } else if (deg <= 22.5 || deg >= 337.5) {
      return "észak";
    } else if (deg <= 67.5) {
      return "északkelet";
    } else if (deg <= 112.5) {
      return "kelet";
    } else if (deg <= 157.5) {
      return "délkelet"
    } else if (deg <= 202.5) {
      return "dél";
    } else if (deg <= 247.5) {
      return "délnyugat";
    } else if (deg <= 292.5) {
      return "nyugat";
    } else if (deg <= 337.5) {
      return "északnyugat";
    }
  }

  function renderWeather(wData) {
    var wIconWrap = document.getElementById("weatherimage");
    while (wIconWrap.firstChild) {
      wIconWrap.removeChild(wIconWrap.firstChild);
    }
    var imgNode = document.createElement("IMG");
    imgNode.setAttribute("class", "weatherimage-image");
    imgNode.setAttribute("alt", wData.weather[0].description);
    imgNode.setAttribute("src", "http://openweathermap.org/img/w/" + wData.weather[0].icon + ".png");
    wIconWrap.appendChild(imgNode);

    var wTemp = document.getElementById("weathertemp");
    wTemp.innerHTML = K2C(wData.main.temp) + " ℃";

    var wPressure = document.getElementById("weatherpressure");
    wPressure.innerHTML = "Légnyomás<br /><span class='weather-data'>" + (wData.main.sea_level || wData.main.pressure) + " hPa</span>";

    var wHumid = document.getElementById("weatherhumidity");
    wHumid.innerHTML = "Páratartalom<br /><span class='weather-data'>" + wData.main.humidity + "%</span>";

    var wWind = document.getElementById("weatherwind");
    wWind.innerHTML = "Szélsebesség<br /><span class='weather-data'>" + mps2kmph(wData.wind.speed) + " km/h</span>";

    var wWindDir = document.getElementById("weatherwinddir");
    wWindDir.innerHTML = "Szélirány<br /><span class='weather-data'>" + deg2et(wData.wind.deg) + "</span>";

    var wSunR = document.getElementById("weathersunrise");
    var wSunS = document.getElementById("weathersunset");
    var sunRise = new Date(parseInt(wData.sys.sunrise * 1000));
    var sunSet = new Date(wData.sys.sunset * 1000);
    wSunR.innerHTML = "Napkelte<br /><span class='weather-data'>" + fillZeros(sunRise.getHours()) + ":" + fillZeros(sunRise.getMinutes()) + "</span>";
    wSunS.innerHTML = "Naplemente<br /><span class='weather-data'>" + fillZeros(sunSet.getHours()) + ":" + fillZeros(sunSet.getMinutes()) + "</span>";
  }

  function updateWeather() {
    var xmlhttp = new XMLHttpRequest();
    var rnsr = Math.round(Math.random() * 19182);
    xmlhttp.open("GET", 'https://kadbudapest.hu/cachemeteo/');
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4) {
        if (xmlhttp.status === 200) {
          var wData = JSON.parse(xmlhttp.responseText);
          renderWeather(wData);
        } else {
          console.log('News download error: ' + xmlhttp.statusText)
        }
      }
    }
    xmlhttp.send();
  }

  updateWeather();

  setInterval(function () {
    updateWeather();
  }, 200000)
}
