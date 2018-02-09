const PORT = 6969;
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require('ejs');
const path = require('path');
const session = require('express-session');
const app = express();


app.use(
    session(
        {
            saveUninitialized: false,
            resave: true,
            secret: '110% un-freaking-breakable encryption, 50%guaranteed'
        }
    )
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'ngClient/dist')));


require("./Server/config/mongoose");

const routeRouter = require("./Server/config/routes");

routeRouter(app);
app.listen(PORT, () => {
    console.log("serving on port "+PORT)
});