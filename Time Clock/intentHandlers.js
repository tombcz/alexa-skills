'use strict';
var textHelper = require('./textHelper'),
    storage = require('./storage'),
    utils = require('./utils');

var registerIntentHandlers = function(intentHandlers, skillContext) {

    // reset time for all tasks
    intentHandlers.ClearTimeIntent = function(intent, session, response) {
        storage.loadTime(session, function(currentTime) {

            utils.initializeTasks(currentTime);

            currentTime.data.tasks.forEach(function(task) {
                currentTime.data.totals[task] = 0;
            });

            currentTime.save(function() {

                var speechOutput = 'cleared all your hours';
                if (skillContext.needMoreHelp) {
                    speechOutput += '. You can add time to a task, clear all hours, or exit. What would you like?';
                    var repromptText = 'You can add time to a task, clear all hours, or exit. What would you like?';
                    response.ask(speechOutput, repromptText);
                } else {
                    response.tell(speechOutput);
                }
            });
        });
    };

    // tell the user what tasks can be tracked
    intentHandlers.TaskListIntent = function(intent, session, response) {
        var speechOutput = 'you can track time for: administrative, break, cleaning, customer service, data entry, email, filing, lunch, mail, meetings, organizing, phone calls, planning, programming, research, reviewing, shipping, training, travel, typing, writing, and work';
        var cardOutput = 'Administrative, Break, Cleaning, Customer Service, Data Entry, Email, Filing, Lunch, Mail, Meetings, Organizing, Phone Calls, Planning, Programming, Research, Reviewing, Shipping, Training, Travel, Typing, Writing, Work';
        response.tellWithCard(speechOutput, "Available Tasks", cardOutput);
    };

    // give a task hours, ask additional question if slot values are missing.
    intentHandlers.AddHoursIntent = function(intent, session, response) {

        var taskName = textHelper.getTaskName(intent.slots.TaskName.value)

        var hours = intent.slots.HoursNumber;
        var hoursValue = parseInt(hours.value);
        if (isNaN(hoursValue)) {
            console.log('Invalid hours value = ' + hours.value);
            response.ask('sorry, I did not hear the hours, please say that again', 'please say that again');
            return;
        }
        var minutesValue = hoursValue * 60;

        storage.loadTime(session, function(currentTime) {

            utils.initializeTasks(currentTime);

            var targetTask;
            for (var i = 0; i < currentTime.data.tasks.length; i++) {
                if (currentTime.data.tasks[i] === taskName) {
                    targetTask = currentTime.data.tasks[i];
                    break;
                }
            }

            if (!targetTask) {
                response.ask('sorry, I did not hear the task, please say that again', 'please say that again');
                return;
            }

            var newMinutes = currentTime.data.totals[targetTask] + minutesValue;
            currentTime.data.totals[targetTask] = newMinutes;

            var speechOutput = '';
            speechOutput += 'added ' + utils.phraseForMinutes(minutesValue) + ' for ' + targetTask + '. ';
            speechOutput += targetTask + ' has a total of ' + utils.phraseForMinutes(newMinutes);

            currentTime.save(function() {
                response.tell(speechOutput);
            });
        });
    };

    intentHandlers.AddOneHourIntent = function(intent, session, response) {

        var taskName = textHelper.getTaskName(intent.slots.TaskName.value)

        storage.loadTime(session, function(currentTime) {

            utils.initializeTasks(currentTime);

            var targetTask;
            for (var i = 0; i < currentTime.data.tasks.length; i++) {
                if (currentTime.data.tasks[i] === taskName) {
                    targetTask = currentTime.data.tasks[i];
                    break;
                }
            }

            if (!targetTask) {
                response.ask('sorry, I did not hear the task, please say that again', 'please say that again');
                return;
            }

            var minutesValue = 60;
            var newMinutes = currentTime.data.totals[targetTask] + minutesValue;
            currentTime.data.totals[targetTask] = newMinutes;

            var speechOutput = '';
            speechOutput += 'added ' + utils.phraseForMinutes(minutesValue) + ' for ' + targetTask + '. ';
            speechOutput += targetTask + ' has a total of ' + utils.phraseForMinutes(newMinutes);

            currentTime.save(function() {
                response.tell(speechOutput);
            });
        });
    };

    intentHandlers.AddOneHourMinutesIntent = function(intent, session, response) {

        var taskName = textHelper.getTaskName(intent.slots.TaskName.value)

        var minutes = intent.slots.MinutesNumber;
        var minutesValue = parseInt(minutes.value);
        if (isNaN(minutesValue)) {
            console.log('Invalid minutes value = ' + minutes.value);
            response.ask('sorry, i did not hear the minutes, please say that again', 'please say that again');
            return;
        }

        storage.loadTime(session, function(currentTime) {

            utils.initializeTasks(currentTime);

            var targetTask;
            for (var i = 0; i < currentTime.data.tasks.length; i++) {
                if (currentTime.data.tasks[i] === taskName) {
                    targetTask = currentTime.data.tasks[i];
                    break;
                }
            }

            if (!targetTask) {
                response.ask('sorry, I did not hear the task, please say that again', 'please say that again');
                return;
            }

            minutesValue += 60;
            var newMinutes = currentTime.data.totals[targetTask] + minutesValue;
            currentTime.data.totals[targetTask] = newMinutes;

            var speechOutput = '';
            speechOutput += 'added ' + utils.phraseForMinutes(minutesValue) + ' for ' + targetTask + '. ';
            speechOutput += targetTask + ' has a total of ' + utils.phraseForMinutes(newMinutes);

            currentTime.save(function() {
                response.tell(speechOutput);
            });
        });
    };

    intentHandlers.AddOneHourAndAHalfIntent = function(intent, session, response) {

        var taskName = textHelper.getTaskName(intent.slots.TaskName.value)

        storage.loadTime(session, function(currentTime) {

            utils.initializeTasks(currentTime);

            var targetTask;
            for (var i = 0; i < currentTime.data.tasks.length; i++) {
                if (currentTime.data.tasks[i] === taskName) {
                    targetTask = currentTime.data.tasks[i];
                    break;
                }
            }

            if (!targetTask) {
                response.ask('sorry, I did not hear the task, please say that again', 'please say that again');
                return;
            }

            var minutesValue = 90;
            var newMinutes = currentTime.data.totals[targetTask] + minutesValue;
            currentTime.data.totals[targetTask] = newMinutes;

            var speechOutput = '';
            speechOutput += 'added ' + utils.phraseForMinutes(minutesValue) + ' for ' + targetTask + '. ';
            speechOutput += targetTask + ' has a total of ' + utils.phraseForMinutes(newMinutes);

            currentTime.save(function() {
                response.tell(speechOutput);
            });
        });
    };

    intentHandlers.AddHalfHourIntent = function(intent, session, response) {

        var taskName = textHelper.getTaskName(intent.slots.TaskName.value)

        storage.loadTime(session, function(currentTime) {

            utils.initializeTasks(currentTime);

            var targetTask;
            for (var i = 0; i < currentTime.data.tasks.length; i++) {
                if (currentTime.data.tasks[i] === taskName) {
                    targetTask = currentTime.data.tasks[i];
                    break;
                }
            }

            if (!targetTask) {
                response.ask('sorry, I did not hear the task, please say that again', 'please say that again');
                return;
            }

            var minutesValue = 30;
            var newMinutes = currentTime.data.totals[targetTask] + minutesValue;
            currentTime.data.totals[targetTask] = newMinutes;

            var speechOutput = '';
            speechOutput += 'added ' + utils.phraseForMinutes(minutesValue) + ' for ' + targetTask + '. ';
            speechOutput += targetTask + ' has a total of ' + utils.phraseForMinutes(newMinutes);

            currentTime.save(function() {
                response.tell(speechOutput);
            });
        });
    };

    intentHandlers.AddMinutesIntent = function(intent, session, response) {

        var taskName = textHelper.getTaskName(intent.slots.TaskName.value)

        var minutes = intent.slots.MinutesNumber;
        var minutesValue = parseInt(minutes.value);
        if (isNaN(minutesValue)) {
            console.log('Invalid minutes value = ' + minutes.value);
            response.ask('Sorry, I did not hear the minutes, please say that again', 'please say that again');
            return;
        }

        storage.loadTime(session, function(currentTime) {

            utils.initializeTasks(currentTime);

            var targetTask;
            for (var i = 0; i < currentTime.data.tasks.length; i++) {
                if (currentTime.data.tasks[i] === taskName) {
                    targetTask = currentTime.data.tasks[i];
                    break;
                }
            }

            if (!targetTask) {
                response.ask('sorry, I did not hear the task, please say that again', 'please say that again');
                return;
            }

            var newMinutes = currentTime.data.totals[targetTask] + minutesValue;
            currentTime.data.totals[targetTask] = newMinutes;

            var speechOutput = 'added ' + utils.phraseForMinutes(minutesValue) + ' for ' + targetTask + '. ';
            speechOutput += targetTask + ' has a total of ' + utils.phraseForMinutes(newMinutes);

            currentTime.save(function() {
                response.tell(speechOutput);
            });
        });
    };

    intentHandlers.AddHoursMinutesIntent = function(intent, session, response) {

        var taskName = textHelper.getTaskName(intent.slots.TaskName.value)

        var hours = intent.slots.HoursNumber;
        var hoursValue = parseInt(hours.value);
        if (isNaN(hoursValue)) {
            console.log('Invalid hours value = ' + hours.value);
            response.ask('sorry, I did not hear the hours, please say that again', 'please say that again');
            return;
        }

        var minutes = intent.slots.MinutesNumber;
        var minutesValue = parseInt(minutes.value);
        if (isNaN(minutesValue)) {
            console.log('Invalid minutes value = ' + minutes.value);
            response.ask('sorry, I did not hear the minutes, please say that again', 'please say that again');
            return;
        }

        var totalMinutes = (hoursValue * 60) + minutesValue;

        storage.loadTime(session, function(currentTime) {

            utils.initializeTasks(currentTime);

            var targetTask;
            for (var i = 0; i < currentTime.data.tasks.length; i++) {
                if (currentTime.data.tasks[i] === taskName) {
                    targetTask = currentTime.data.tasks[i];
                    break;
                }
            }

            if (!targetTask) {
                response.ask('sorry, I did not hear the task, please say that again', 'please say that again');
                return;
            }

            var newMinutes = currentTime.data.totals[targetTask] + totalMinutes;
            currentTime.data.totals[targetTask] = newMinutes;

            var speechOutput = 'added ' + utils.phraseForMinutes(totalMinutes) + ' for ' + targetTask + '. ';
            speechOutput += targetTask + ' has a total of ' + utils.phraseForMinutes(newMinutes);

            currentTime.save(function() {
                response.tell(speechOutput);
            });
        });
    };

    // tells the task times and sends the result in a card
    intentHandlers.TellTimesIntent = function(intent, session, response) {

        storage.loadTime(session, function(currentTime) {

            utils.initializeTasks(currentTime);

            var sortedTotals = [];
            currentTime.data.tasks.forEach(function(task) {
                sortedTotals.push({
                    total: currentTime.data.totals[task],
                    task: task
                });
            });

            sortedTotals.sort(function(p1, p2) {
                return p2.total - p1.total;
            });

            var cardOutput = '';
            var speechOutput = '';
            sortedTotals.forEach(function(taskTotal, index) {
                if (taskTotal.total > 0) {
                    speechOutput += taskTotal.task + ': ' + utils.phraseForMinutes(taskTotal.total) + ', ';
                    cardOutput += taskTotal.task + ' : ' + utils.phraseForMinutes(taskTotal.total) + '\n';
                }
            });

            if (speechOutput.length == 0) {
                speechOutput = 'No tasks have any hours yet';
                cardOutput = 'All tasks have zero hours';
            }

            response.tellWithCard(speechOutput, "Time Card", cardOutput);
        });
    };

    intentHandlers.TellTaskTimeIntent = function(intent, session, response) {

        var taskName = textHelper.getTaskName(intent.slots.TaskName.value)

        storage.loadTime(session, function(currentTime) {

            utils.initializeTasks(currentTime);

            var targetTask;
            for (var i = 0; i < currentTime.data.tasks.length; i++) {
                if (currentTime.data.tasks[i] === taskName) {
                    targetTask = currentTime.data.tasks[i];
                    break;
                }
            }

            if (!targetTask) {
                response.ask('sorry, I did not hear the task, please say that again', 'please say that again');
                return;
            }

            var minutes = currentTime.data.totals[taskName];

            var speechOutput = '';
            var cardOutput = '';

            if (minutes > 0) {
                speechOutput += taskName + ' has a total of ' + utils.phraseForMinutes(minutes);
                cardOutput += taskName + ' has a total of ' + utils.phraseForMinutes(minutes);
            } else {
                speechOutput += taskName + ' has no time';
                cardOutput += taskName + ' : no time';
            }

            response.tellWithCard(speechOutput, "Time Card", cardOutput);
        });
    };

    // The help prompt must end with a question for users or prompt the user to
    // speak and leave the session open to receive a response.  Please see test
    // case 4.12 from our Submission Checklist for guidance on the help intent.
    intentHandlers['AMAZON.HelpIntent'] = function(intent, session, response) {
        var speechOutput = textHelper.completeHelp;
        //if (skillContext.needMoreHelp) {
            response.ask(textHelper.completeHelp + ' So, how can I help?', 'How can I help?');
        //} else {
        //    response.tell(textHelper.completeHelp);
        //}
    };

    intentHandlers['AMAZON.CancelIntent'] = function(intent, session, response) {
        if (skillContext.needMoreHelp) {
            response.tell('Okay.  Whenever you\'re ready, you can start adding hours for your tasks.');
        } else {
            response.tell('');
        }
    };

    intentHandlers['AMAZON.StopIntent'] = function(intent, session, response) {
        if (skillContext.needMoreHelp) {
            response.tell('Okay.  Whenever you\'re ready, you can start adding hours for your tasks.');
        } else {
            response.tell('');
        }
    };
};
exports.register = registerIntentHandlers;