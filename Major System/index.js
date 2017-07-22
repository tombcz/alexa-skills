'use strict';
var Alexa = require('alexa-sdk');
var logic = require('./logic');

var APP_ID = ""; // amzn1.ask.skill.xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
var SKILL_NAME = 'Major System';

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {

    'LaunchRequest': function() {
        var speechOutput = "Major System, What can I help you with?";
        var reprompt = "You can say How does this work? or How can I remember fifty two, or, What sound is two associated with six. What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },

    'GetWordForIntent': function() {

        if (this.event.request.intent.slots.mynumber.value == undefined) {
            var speechOutput = "Please say the number that you want to remember, for example: two five three";
            this.emit(':tell', speechOutput, SKILL_NAME)
            return;
        }

        var x = '' + this.event.request.intent.slots.mynumber.value;
        var digits = '';
        var letters = x.split('')
        for (var y in letters) {
            digits += ' ' + letters[y];
        }

        var wordList = logic.go(x);
        var wordsCommaSeparated = wordList.join(', ');

        var wordsText;
        if (wordList.length == 1) {
            wordsText = 'word';
        } else {
            wordsText = 'phrase';
        }

        var spelledOut = '';
        for (var word in wordList) {
            spelledOut += '<say-as interpret-as="spell-out">' + wordList[word] + '</say-as>, ';
        }

        var speechOutput = 'You can remember the number, <say-as interpret-as="spell-out">' + x + '</say-as>, with the ' + wordsText + ': ' + wordsCommaSeparated + '. ' + spelledOut;
        var cardOutput = 'You can remember ' + x + ' with the ' + wordsText + ' ' + wordsCommaSeparated;

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, cardOutput)
    },

    'GetInstructionsIntent': function() {
        var num = parseInt(this.event.request.intent.slots.mynumber.value);

        if (isNaN(num)) {
            this.emit(':ask', "I didn't hear the number, please say that again", 'Say that again');
            return;
        }

        var speech = '';
        var card = '';
        if (num == 0) {
            speech = 'sounds, <phoneme alphabet="ipa" ph="sss">s</phoneme>, and, <phoneme alphabet="ipa" ph="zzz">z</phoneme>, as in see, and zero';
            card = 'sounds s and z';
        }
        if (num == 1) {
            speech = 'sounds, <phoneme alphabet="ipa" ph="tah">t</phoneme>, and, <phoneme alphabet="ipa" ph="dah">d</phoneme>, as in trap, and dig';
            card = 'sounds t and d';
        }
        if (num == 2) {
            speech = 'sound, <phoneme alphabet=\"ipa\" ph=\"nah\">n</phoneme>, as in nap';
            card = 'sound n';
        }
        if (num == 3) {
            speech = 'sound, <phoneme alphabet="ipa" ph="mmah">m</phoneme>, as in mouse';
            card = 'sound m';
        }
        if (num == 4) {
            speech = 'sound, <phoneme alphabet="ipa" ph="rrah">r</phoneme>, as in red';
            card = 'sound r';
        }
        if (num == 5) {
            speech = 'sound, <phoneme alphabet="ipa" ph="llah">l</phoneme>, as in lay';
            card = 'sound l';
        }
        if (num == 6) {
            speech = 'sounds, <phoneme alphabet="ipa" ph="t͡ʃ">ch</phoneme>. <phoneme alphabet="ipa" ph="d͡ʒ">soft g</phoneme>. <phoneme alphabet="ipa" ph="ʃ">sh</phoneme>. and, <phoneme alphabet="ipa" ph="ʒ">j</phoneme>. as in ship, or chart';
            card = 'sounds ch, soft g, sh, and j';
        }
        if (num == 7) {
            speech = 'sounds, <phoneme alphabet="ipa" ph="kah">k</phoneme>, and, <phoneme alphabet="ipa" ph="gah">g</phoneme>, as in cat, or game';
            card = 'sounds k, hard c, hard g, q, and qu';
        }
        if (num == 8) {
            speech = 'sounds, <phoneme alphabet="ipa" ph="fah">f</phoneme>, and <phoneme alphabet="ipa" ph="vah">v</phoneme>, as in five, or vest';
            card = 'sound f and v';
        }
        if (num == 9) {
            speech = 'sounds, <phoneme alphabet="ipa" ph="pah">p</phoneme>, and <phoneme alphabet="ipa" ph="bah">b</phoneme>, as in peak, or bed';
            card = 'sounds p and b';
        }

        var speechOutput = 'The number ' + num + ' is associated with the ' + speech;
        var cardOutput = 'The number ' + num + ' is associated with the ' + card;
        this.emit(':tellWithCard', speechOutput, SKILL_NAME, cardOutput)
    },

    'AMAZON.HelpIntent': function() {
        var speechOutput = "You can say How does this work? or How can I remember fifty two, or, What sound is two associated with six. What can I help you with?";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },

    'HowItWorksIntent': function() {
        var speechOutput = 'The Major System is a technique for easily remembering numbers. The way it works is that each digit from 0 to 9 is assigned a consonant sound and then you add vowel sounds to form words, so remembering the number is as easy as remembering the words. For example, to remember the number twelve, since one is associated with the sound tee, and two is associated with the sound en, you can add the vowel I, and remember the number twelve with the word TIN. If you are getting started with the Major System, you can ask what the sounds are for different digits, for example: Say, what is the sound for two?';
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },

    'AMAZON.CancelIntent': function() {
        this.emit(':tell', 'Goodbye!');
    },

    'AMAZON.StopIntent': function() {
        this.emit(':tell', 'Goodbye!');
    }
};