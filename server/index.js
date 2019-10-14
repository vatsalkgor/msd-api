const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv")
const routes = require('./routes/index')
dotenv.config();
const port = process.env.PORT||3000;
// const routes = require('./routes');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use('/', routes)

app.listen(port,()=>{
    console.log(`App started on port: ${port}`);
})
