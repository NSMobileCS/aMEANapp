const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const fs = require('fs');
const path = require('path');

mongoose.connect("mongodb://localhost/t3st3rr");


const models_path = path.join(__dirname, './../models');

fs.readdirSync(models_path).forEach((file) => {
    if (file.indexOf('.js') > -1) {
        require(models_path + '/' + file);
    }
});