const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const max_description_length = 450;
const file_output = "./episode_data.json";
const url = 'https://en.wikipedia.org/wiki/List_of_Code_Lyoko_episodes';

function arrayRemove(arr, value) {
   return arr.filter(function(ele){
       return ele != value;
   });
}

axios(url).then(response => {
  const html = response.data;
  const $ = cheerio.load(html);

  const episode_bars = $('.vevent');
  const episode_boxes = $('tr.expand-child');

  var episodes = [];

  episode_bars.each(function(){
    const number = $(this).find('th:nth-child(1)').text();
    const name = $(this).find('td:nth-child(2)').text();
    const us_airdate = $(this).find('td:nth-child(3)').text();
    const fr_airdate = $(this).find('td:nth-child(4)').text();
    const prod_code = $(this).find('td:nth-child(5)').text();

    const names = name.split('\"');
    const eng_name = names[1];
    const fre_name = names[3];

    episodes.push({number, eng_name, fre_name, us_airdate, fr_airdate, prod_code});
  });

  var index = 0;

  episode_boxes.each(function() {
    var description = JSON.stringify($(this).find('td.description').text());
    description = description.replace(/(\\n|\"|\\)/gmi, '');

    sentance = "";
    sentances = description.split('.');

    for(var i = 0; i < sentances.length; i++){ sentances = arrayRemove(sentances, i); }

    for(var i = 0; i < sentances.length; i++){
      if((sentance.length + sentances[i].length + 1) <= max_description_length){
        sentance += sentances[i] + '.';
      }
      else{
        break;
      }
    }

    episodes[index]['description'] = sentance;
    index++;
  });

  const json = JSON.stringify(episodes, null, 4);

  fs.writeFile(file_output, json, function(err){
    if(err){
      console.log('Couldn\'t write to file!\n' + err);
    }
  });
}).catch(console.error);
