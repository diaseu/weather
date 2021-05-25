$('#todayDate').text(moment().format("dddd MMMM D, YYYY"))

let today = moment().format("dddd MMMM D")

$("#city").keyup(function (event) {
  if (event.keyCode === 13) {
    $("#search").click();
  }
});

$('#search').click(function () {
  $('#main').removeClass("hidden", 500, "easeInBack")
  axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${document.getElementById('city').value}&units=imperial&APPID=5161675755ce884e1eb2f358700fff24`)
    .then(res => {
      let weather = res.data

      // Today Weatherbox
      document.getElementById('todayLocation').innerHTML = `<h1>${weather.name}</h1>`
      document.getElementById('currentTemp').innerHTML = `<h3>${weather.main.temp} °F</h3>`
      document.getElementById('todayMinmax').innerHTML = `<span>(` + Math.round(weather.main.temp_max) + `°F / ` + Math.round(weather.main.temp_min) + `°F)</span>`
      document.getElementById('todayIcon').innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}.png" alt="${weather.weather[0].description}">`
      document.getElementById('todayDesc').innerHTML = `<p>${weather.weather[0].main}</p>`
      document.getElementById('todayHumidity').innerHTML = `<span>Humidity: ${weather.main.humidity}%</span>`
      document.getElementById('todayWind').innerHTML = `<span>${weather.wind.speed} MPH</span>`
      // One Call
      axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${weather.coord.lat}&lon=${weather.coord.lon}&units=imperial&exclude=minutely,hourly,alerts,&appid=5161675755ce884e1eb2f358700fff24`)
        .then(data => {

          // UV Index
          let uv = data.data.current.uvi
          if (uv <= 2) {
            document.getElementById('todayUV').innerHTML = `
              <span>UV Index: <b class="green"> ${uv} </b></span>
                      <br />
                      <div class="spacer"></div>`
          } else if (uv > 2 && uv <= 5) {
            document.getElementById('todayUV').innerHTML = `
              <span>UV Index: <b class="yellow"> ${uv} </b></span>
                      <br />
                      <div class="spacer"></div>`
          } else if (uv > 5 && uv <= 7) {
            document.getElementById('todayUV').innerHTML = `
              <span>UV Index: <b class="orange"> ${uv} </b></span>
                      <br />
                      <div class="spacer"></div>`
          } else if (uv > 7 && uv <= 10) {
            document.getElementById('todayUV').innerHTML = `
              <span>UV Index: <b class="red"> ${uv} </b></span>
                      <br />
                      <div class="spacer"></div>`
          } else {
            document.getElementById('todayUV').innerHTML = `
              <span>UV Index: <b class="black"> ${uv} </b></span>
                      <br />
                      <div class="spacer"></div>`
          }
          let daily = data.data.daily
          console.log(daily)
          for (i = 0; i < 5; i++) {
            let fDate = moment(today).add(i + 1, 'days').format("ddd MM/DD");
            console.log(daily[i])
            document.getElementById('forecast').innerHTML += `
              <div class="weatherbox col m2 blue-grey white-text">
                <h4>${fDate}</h4>
                <img src="http://openweathermap.org/img/wn/${daily[i].weather[0].icon}.png" alt="${daily[i].weather[0].icon}">
                <p>${daily[i].weather[0].main}</p>
                <p>${daily[i].temp.day} °F  <span>(` + Math.round(daily[i].temp.max) + `°F / ` + Math.round(daily[i].temp.min) + `°F)</span></p>
                <span>Humidity: ${daily[i].humidity}%</span>
                <p></p>
              </div>`

          }
        })
        .catch(err => console.error(err))
      // for (i = 0; i < 10; i++) {
      //   let source = anime[i].attributes.posterImage.large
      //   console.log(anime[i])
      //   document.getElementById('anime').innerHTML += `
      //           <div class="col s12 m4">
      //             <div class="card">
      //               <div class="card-image">
      //                 <img src="${source}" alt="${anime[i].attributes.titles.en_jp}">
      //                 <span class="card-title">${anime[i].attributes.titles.en_jp} (EN)<br />${anime[i].attributes.titles.ja_jp} (JP)</span>
      //               </div>
      //               <div class="card-content">
      //                 <p>Age Rating: ${anime[i].attributes.ageRating}</p>
      //                 <p>Rating: ${anime[i].attributes.averageRating}</p>
      //                 <p>Status: ${anime[i].attributes.status}</p>
      //                 <p>Number of Episodes: ${anime[i].attributes.episodeCount}</p>
      //               </div>
      //             </div>
      //           </div>
      //       `
      // }
      document.getElementById('city').value = ''
    })
    .catch(err => console.error(err))

})


