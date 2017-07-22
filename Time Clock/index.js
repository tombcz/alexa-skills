
'use strict';
var TimeClock = require('./timeClock');

exports.handler = function (event, context) {
    var timeClock = new TimeClock();
    timeClock.execute(event, context);
};
