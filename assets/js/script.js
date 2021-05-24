$('#todayDate').text(moment().format("dddd MMMM D, YYYY"))

// $("#city").keyup(function (event) {
//   if (event.keyCode === 13) {
//     $("#city").click();
//   }
// });

$('#search').click(function () {

  axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${document.getElementById('city').value}&units=imperial&APPID=5161675755ce884e1eb2f358700fff24`)
    .then(res => {
      let weather = res.data
      console.log(weather)

      document.getElementById('todayLocation').innerHTML = `<h1>${weather.name}</h1>`
      console.log(weather.name)
      document.getElementById('currentTemp').innerHTML = `<h3>${weather.main.temp}</h1>`

      document.getElementById('todayDesc').innerHTML = `<p>${weather.weather[0].main}</p>`
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
      // document.getElementById('city').value = ''
    })
    .catch(err => console.error(err))

})


