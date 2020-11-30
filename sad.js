//Script que toma tweets
console.log("I am Sad :(")

let Twit = require('twit')
let config = require('./config')
const fs = require('fs')
let express = require('express')
const lorca = require('lorca-nlp');

let T = new Twit(config)
let app = express()
let server = app.listen(process.env.PORT || 3000);

app.use(express.static('public/'))

app.get('/', (req, res) => {
  return res.send('Hello');
});

//searchTweets()
setInterval(searchTweets, 1000 * 60)

function searchTweets() {

  let emotions = ["triste", "deprimido", "abatido", "afligido", "melancolico", "bajon", "suicida", "llorar", "llorando", ":(", "cry", "sad", "depressed", "suicidal"]
  let randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];

  T.get('search/tweets', {
    q: randomEmotion,
    count: 100,
    lang: "es"
  }, function(err, data, response) {

    for(let i = 0;i < data.statuses.length;i++){
      let texto = data.statuses[i].text
      let reg = /\b(?:a*(?:ja)+j?|(?:a+j+)+a+|j*ja+j[ja]*|a*ja+h[aj]*)\b/i
      let risa = texto.match(reg)
      let anal = lorca(texto);
      let sentimiento = anal.sentiment('senticon')


      if(sentimiento < 0.1 && !risa){
        fs.writeFile('public/tweets.json', JSON.stringify(data), (err) => {
          if (err) throw err;
        });
      }
    }
  })
}
