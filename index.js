let Twit = require('twit');
let config = require('./config.js');
let cron = require('node-cron');
let moment = require('moment-timezone')

const T = new Twit(config);       //setup Twit with twitter API keys


//use cron to schedule bot to check tweets every hour
let job = cron.schedule('0 0-23 * * *', ()=>{


T.get('search/tweets', {q: 'Your search query here', count: 100, result_type: "recent"}, (err, data,response) => {
  if (!err){
    let tweetArray = new Set();
    let idArray = [];

    //loop through the array of tweets returned by twitter and filter out manual RT's and possibly NSFW material
    data.statuses.map((x)=> {
      if(x.text.substring(0,2) != "RT"){        //remove retweets from the list
        if(!x.hasOwnProperty("possibly_sensitive")){        //if it doesn't have a link, attempt to retweet.
        tweetArray.add(x);
        //console.log(tweetArray.size)
      }
      else if(x.hasOwnProperty("possibly_sensitive") && x.possibly_sensitive===false){    //if it containst link, make sure its safe
        tweetArray.add(x)
      }
  }
    });

    let tweets = [];
    tweets = Array.from(tweetArray);    //convert the set to an array to make use of map function
    //create a new date object and format it for testing
    let d = new(Date);
    let myTimezone = "America/Toronto";
    let myDatetimeFormat= "YYYY-MM-DD hh:mm:ss a z";
    let date = moment(d).tz(myTimezone).format(myDatetimeFormat);

    console.log(date);    //log the date and time to quickly determine if the bot is running every hour
    console.log("Attempting to Retweet " + tweets.length + " tweets...");
    tweets.map((x)=>console.log(x.text));   //log the tweet text just for testing
    tweets.map((x)=> retweet(x.id_str));    //retweet the tweets in the array


  }



  else{
    console.log(err);   //log any errors
  }
});
}, null,true);

//function to retweet tweets
let retweet = (id) => T.post('statuses/retweet/:id', {id: id}, (err, response) => {
  if (err){
    console.log( "failed to Retweet");
  }
  else{
    console.log("Retweet successful");
  }
});
