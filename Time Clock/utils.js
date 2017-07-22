module.exports = {
	phraseForMinutes: function(minutes) {
		return phraseForMinutes(minutes)
	},
	initializeTasks: function(currentTime) {
		initializeTasks(currentTime)
	}
};

var phraseForMinutes = function(minutes) {

	var hours = Math.floor(minutes / 60.0);
	var minutes = minutes % 60.0;

	if (hours === 0 && minutes === 0) {
		return 'no time';
	}

	var speech = '';
	if (hours > 0) {
		if (hours === 1) {
			speech += 'an hour';
		} else {
			speech += hours + ' hours';
		}
	}

	if (minutes > 0) {
		if (speech.length > 0) {
			speech += ' and ';
		}
		if (minutes === 1) {
			speech += 'one minute';
		} else {
			speech += minutes + ' minutes';
		}
	}

	return speech;
};

var taskNameList = function() {
	return ['administrative',
		'break',
		'cleaning',
		'customer service',
		'data entry',
		'email',
		'filing',
		'lunch',
		'mail',
		'meetings',
		'organizing',
		'phone calls',
		'planning',
		'programming',
		'research',
		'reviewing',
		'shipping',
		'training',
		'travel',
		'typing',
		'writing',
		'work'
	];
}

var initializeTasks = function(currentTime) {

	if (currentTime.data.tasks.length === 0) {

		var taskNames = taskNameList();
		taskNames.forEach(function(task) {
			currentTime.data.tasks.push(task);
		});

		currentTime.data.tasks.forEach(function(task) {
			currentTime.data.totals[task] = 0;
		});
	}
};