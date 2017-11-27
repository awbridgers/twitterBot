Twitter Bot
=============
created by Adam Bridgers
- - - -

## About
This is a Node.js app that uses [Twit](https://www.npmjs.com/package/twit) and [node-cron](https://www.npmjs.com/package/node-cron) in combination with
[PM2](https://www.npmjs.com/package/pm2) to search Twitter every hour for a specified phrase and retweet the tweets it finds.
## How to Run
1. Run `git clone` to clone the repository
2. `cd` in the directory where you cloned the repository
3. Run `npm install`
4. Run `node index.js` to start the app

If you want to run the app forever using pm2
1. Complete all of the above steps
2. Run `npm install pm2 -g`
3. Run `pm2 start index.js`
