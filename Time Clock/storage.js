
'use strict';
var AWS = require("aws-sdk");

var storage = (function () {
    var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

    /*
     * The TimeCard class stores all time states for the user
     */
    function TimeCard(session, data) {
        if (data) {
            this.data = data;
        } else {
            this.data = {
                tasks: [],
                totals: {}
            };
        }
        this._session = session;
    }

    TimeCard.prototype = {
        isEmptyTotal: function () {
            // check if any one had non-zero total,
            // it can be used as an indication of whether the time has just started
            var allEmpty = true;
            var timeData = this.data;
            timeData.tasks.forEach(function (task) {
                if (timeData.totals[task] !== 0) {
                    allEmpty = false;
                }
            });
            return allEmpty;
        },
        save: function (callback) {
            // save the time states in the session,
            // so next time we can save a read from dynamoDB
            this._session.attributes.currentTime = this.data;
            dynamodb.putItem({
                TableName: 'TimeClockUserData',
                Item: {
                    CustomerId: {
                        S: this._session.user.userId
                    },
                    Data: {
                        S: JSON.stringify(this.data)
                    }
                }
            }, function (err, data) {
                if (err) {
                    console.log(err, err.stack);
                }
                if (callback) {
                    callback();
                }
            });
        }
    };

    return {
        loadTime: function (session, callback) {
            if (session.attributes.currentTime) {
                console.log('get time from session=' + session.attributes.currentTime);
                callback(new TimeCard(session, session.attributes.currentTime));
                return;
            }
            dynamodb.getItem({
                TableName: 'TimeClockUserData',
                Key: {
                    CustomerId: {
                        S: session.user.userId
                    }
                }
            }, function (err, data) {
                var currentTime;
                if (err) {
                    console.log(err, err.stack);
                    currentTime = new TimeCard(session);
                    session.attributes.currentTime = currentTime.data;
                    callback(currentTime);
                } else if (data.Item === undefined) {
                    currentTime = new TimeCard(session);
                    session.attributes.currentTime = currentTime.data;
                    callback(currentTime);
                } else {
                    console.log('get time from dynamodb=' + data.Item.Data.S);
                    currentTime = new TimeCard(session, JSON.parse(data.Item.Data.S));
                    session.attributes.currentTime = currentTime.data;
                    callback(currentTime);
                }
            });
        },
        newTimeCard: function (session) {
            return new TimeCard(session);
        }
    };
})();
module.exports = storage;
