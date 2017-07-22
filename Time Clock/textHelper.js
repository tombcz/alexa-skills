
'use strict';
var textHelper = (function () {
    return {
        completeHelp: 'Here\'s some things you can say,'
        + ' add a ten minute break'
        + ' add 2 hours and twenty minutes to meetings.'
        + ' tell me my time.'
        + ' clear my time.'
        + ' and exit.',
        nextHelp: 'You can add time to a task, get your current times, or say help. What would you like?',

        getTaskName: function (recognizedTaskName) {
            return recognizedTaskName;
        }
    };
})();
module.exports = textHelper;
