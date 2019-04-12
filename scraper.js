// var ep_numbers = $('.vevent > th');
// var ep_names = $('.vevent > td.summary');
// var us_ep_aridates = $('.vevent > td:nth-child(3)');
// var fr_ep_aridates = $('.vevent > td:nth-child(4)');
// var ep_prod_nums = $('.vevent > td:nth-child(5)');
// var ep_descriptions = $('td.description');

const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://en.wikipedia.org/wiki/List_of_Code_Lyoko_episodes';

axios(url).then(response => {
  const html = response.data;
  const $ = cheerio.load(html);

  const episode_bars = $('.vevent');

  var epiosdes = [];

  episode_bars.each(function(){
    const number = $(this).find('th:nth-child(1)').text();
    const name = $(this).find('td:nth-child(2)').text();
    const us_airdate = $(this).find('td:nth-child(3)').text();
    const fr_airdate = $(this).find('td:nth-child(4)').text();
    const prod_code = $(this).find('td:nth-child(5)').text();

    console.log("Episode Number: " + number
              + "\nNames: " + name
              + "\nUS Airdate: " + us_airdate
              + "\nFR Airdate: " + fr_airdate
              + "\nProduction Code: " + prod_code);
  });

  // console.log("Episode Number: " + ep_numbers
            // + "\nNames: " + ep_names
            // + "\nUS Airdate: " + us_aridates
            // + "\nFR Airdate: " + fr_aridates
            // + "\nProduction Code: " + prod_nums
            // + "\nDescription: " + descriptions);

}).catch(console.error);
