
'use strict';
var storage = require('./storage'),
    textHelper = require('./textHelper');

var registerEventHandlers = function (eventHandlers, skillContext) {
    
    // if user said a one shot command that triggered an intent event,
    // it will start a new session, and then we should avoid speaking too many words.
    eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
        skillContext.needMoreHelp = false;
    };

    // speak welcome message and ask user questions based on whether there are
    // tasks or not.
    // Ideally, the welcome prompt must be more descriptive and the session
    // should remain open for users input.
    eventHandlers.onLaunch = function (launchRequest, session, response) {
        storage.loadTime(session, function (currentTime) {
            var speechOutput = 'Time Clock, Track your time for common tasks. What can I do for you?';
            var reprompt = textHelper.nextHelp;
            response.ask(speechOutput, reprompt);
        });
    };
};
exports.register = registerEventHandlers;
