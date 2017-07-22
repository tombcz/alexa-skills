
'use strict';
var AlexaSkill = require('./AlexaSkill'),
    eventHandlers = require('./eventHandlers'),
    intentHandlers = require('./intentHandlers');

var APP_ID = ""; // amzn1.ask.skill.xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
var skillContext = {};

var TimeClock = function () {
    AlexaSkill.call(this, APP_ID);
    skillContext.needMoreHelp = true;
};


// Extend AlexaSkill
TimeClock.prototype = Object.create(AlexaSkill.prototype);
TimeClock.prototype.constructor = TimeClock;

eventHandlers.register(TimeClock.prototype.eventHandlers, skillContext);
intentHandlers.register(TimeClock.prototype.intentHandlers, skillContext);

module.exports = TimeClock;
