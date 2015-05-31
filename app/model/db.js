var mongoose = require('mongoose');
var autoIncrement = require('mongodb-autoincrement');

var options = {
    user: 'gihernandez',
    pass: 'g1h3rn4nd3z'
};

autoIncrement.setDefaults ({
    collection: 'counters',
    field: '_id',
    step: 1
});

mongoose.plugin(autoIncrement.mongoosePlugin);

mongoose.connect('mongodb://localhost/rh', options);