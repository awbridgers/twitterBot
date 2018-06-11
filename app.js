const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.static(__dirname));

app.get('/',(req,res) => res.render("index.html"))

app.listen(process.env.PORT, () => console.log("listening on " + process.env.PORT))
