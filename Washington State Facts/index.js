'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = ''; // amzn1.ask.skill.xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
var SKILL_NAME = 'Washington State Facts';

var FACTS = [
"King county is the largest county in Washington.",
"King county was originally named for William R. King and renamed in 1986 after Dr. Martin Luther King, Jr.",
"Washington is one of seven states that does not collect income tax.",
"The record rainfall in Washington was over 14 inches at Mt. Mitchell in 1986.",
"The highest point in Washington is Mt. Rainier, 14,410 feet above sea level.",
"Mount Rainier was named after Peter Rainier, a British soldier who fought against the Americans in the Revolutionary War.",
"Washington is the only state named after a president.",
"Microsoft’s headquarters are in Redmond.",
"Amazon’s headquarters are in Seattle.",
"The first revolving restaurant in the continental United States is atop the Space Needle in Seattle.",
"The Washington state flower is the Coast Rhododendron.",
"The Washington state tree is the Western Hemlock.",
"The Washington state bird is the Willow Goldfinch,",
"The Washington state fish is the Steelhead Trout.",
"The Washington state dance is the square dance.",
"The Washington state insect is the Green Darner Dragonfly.",
"The Washington state fruit is the apple.",
"The Washington state vegetable is the Walla Walla sweet onion.",
"More apples are produced in Washington than in any other state.",
"The capital of Washington is Olympia.",
"Native Americans called Olympia The Black Bear Place.",
"The Space Needle is 605 feet tall.",
"The Cascade Range in Washington has five major volcanoes: Mount Rainier, Mount St. Helens, Mount Baker, Glacier Peak, and Mount Adams.",
"The Centennial Trail between Spokane and Coeur d’Alene is 69 miles long.",
"There are more glaciers in Washington than the other 47 contiguous states combined.",
"Washington’s state capitol building was the last one built with a rotunda.",
"The world’s largest building, by volume, is Boeing’s final assembly plant in Everett.",
"The most Northwestern point in the continental United States is Cape Flattery on the Olympic Peninsula.",
"The first Starbucks coffee shop is in Pike’s Place Market in Seattle.",
"Before Washington became a state, the territory was called Columbia, after the Columbia River.",
"Jimi Hendrix was born in Seattle.",
"The population of Washington is over 7 million.",
"There is a gas station shaped like a teapot in Zillah.",
"The smallest city to host a World’s Fair was Spokane in 1974.",
"The Puget Sound is home to the largest ferry fleet in the United States.",
"The Hoh Rain Forest of the Olympic Peninsula gets up to 14 feet of rain each year.",
"Lewis and Clark entered Washington on October 10th, 1805.",
"In 1889, Washington became the 42nd state of the United States.",
"The Coulee Dam is the largest dam in the United States.",
"On May 18, 1980, a major volcanic eruption occurred at Mount St. Helens.",
"Boeing originally operated United Airlines.",
"Pickleball was invented in Washington.",
"There have been three United States Navy ships named for the state of Washington."
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random space fact from the space facts list
        var factIndex = Math.floor(Math.random() * FACTS.length);
        var randomFact = FACTS[factIndex];

        // Create speech output
        var speechOutput = "Here's your fact: " + randomFact;

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can say tell me a fact, or, you can say exit... What can I help you with?";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    }
};