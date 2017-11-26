let Twit = require('twit');
let config = require('./config.js');
let cron = require('node-cron');
let moment = require('moment-timezone')

const T = new Twit(config);

let tweetArray = new Set();
let idArray = [];

let job = cron.schedule('0 0-23 * * *', ()=>{


T.get('search/tweets', {q: 'receive wake forest offer', count: 100, result_type: "recent"}, (err, data,response) => {
  if (!err){
    let tweetArray = new Set();
    let idArray = [];

    data.statuses.map((x)=> {
      if(x.text.substring(0,2) != "RT" && x.possibly_sensitive === false){
        tweetArray.add(x);
        //console.log(tweetArray.size)
      }
    });

    let tweets = [];
    tweets = Array.from(tweetArray);
    let d = new(Date);
    let myTimezone = "America/Toronto";
    let myDatetimeFormat= "YYYY-MM-DD hh:mm:ss a z";
    let date = moment(d).tz(myTimezone).format(myDatetimeFormat);

    console.log(date);
    console.log("Attempting to Retweet " + tweets.length + " tweets...");
    tweets.map((x)=>console.log(x.text));
    tweets.map((x)=> retweet(x.id_str));


  }



  else{
    console.log(err);
  }
});
}, null,true);

let retweet = (id) => T.post('statuses/retweet/:id', {id: id}, (err, response) => {
  if (err){
    console.log( "failed to Retweet");
  }
  else{
    console.log("Retweet successful");
  }
});
