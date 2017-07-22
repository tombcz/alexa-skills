module.exports = {
	go: function(number) {
		return convertNumberToPhrase(number)
	}
};

var getWordForNumber = function(number) {
	words = {
		"saw": "0",
		"tie": "1",
		"knee": "2",
		"mow": "3",
		"raw": "4",
		"law": "5",
		"joy": "6",
		"key": "7",
		"fee": "8",
		"pie": "9",
		"toes": "10",
		"toad": "11",
		"tin": "12",
		"dam": "13",
		"tire": "14",
		"tile": "15",
		"ditch": "16",
		"tack": "17",
		"dove": "18",
		"tub": "19",
		"nose": "20",
		"nut": "21",
		"nun": "22",
		"name": "23",
		"nero": "24",
		"nail": "25",
		"hinge": "26",
		"neck": "27",
		"knife": "28",
		"knob": "29",
		"moose": "30",
		"moat": "31",
		"man": "32",
		"mime": "33",
		"mare": "34",
		"mail": "35",
		"match": "36",
		"mug": "37",
		"movie": "38",
		"mop": "39",
		"rice": "40",
		"rat": "41",
		"rhino": "42",
		"ram": "43",
		"rare": "44",
		"rail": "45",
		"roach": "46",
		"rake": "47",
		"roof": "48",
		"rope": "49",
		"lasso": "50",
		"lid": "51",
		"lion": "52",
		"lamb": "53",
		"lure": "54",
		"lily": "55",
		"leech": "56",
		"lock": "57",
		"leaf": "58",
		"leap": "59",
		"cheese": "60",
		"cheetah": "61",
		"chain": "62",
		"jam": "63",
		"jar": "64",
		"jewel": "65",
		"judge": "66",
		"jack": "67",
		"chief": "68",
		"jeep": "69",
		"case": "70",
		"cat": "71",
		"cone": "72",
		"comb": "73",
		"cry": "74",
		"coal": "75",
		"couch": "76",
		"cake": "77",
		"coffee": "78",
		"cap": "79",
		"face": "80",
		"fat": "81",
		"fun": "82",
		"foam": "83",
		"fur": "84",
		"file": "85",
		"fish": "86",
		"fig": "87",
		"fife": "88",
		"VP": "89",
		"bus": "90",
		"bat": "91",
		"bone": "92",
		"bum": "93",
		"bear": "94",
		"bell": "95",
		"beach": "96",
		"book": "97",
		"puff": "98",
		"pipe": "99"
	}

	for (var word in words) {
		if (words[word] == number) {
			return word;
		}
	}

	return "";
};

var convertNumberToPhrase = function(number) {

	var start = 0;
	var attemptLength = 8;
	if (attemptLength > number.length) {
		attemptLength = number.length;
	}

	var word = [];
	while (true) {
		var rangeLocation = start;
		var rangeLength = attemptLength;
		var part = number.substring(start, start + attemptLength);

		var match = getWordForNumber(part);

		// see if we matched part of the number
		if (match.length > 0) {

			//if (word.length > 0) {
			//	word += ' ';
			//}

			// save the matched word
			//word += match;
			word.push(match);

			// advance up to the digit that we just matched
			start += attemptLength;

			// reset the attempt length
			attemptLength = 8;
			if (start + attemptLength > number.length) {
				attemptLength = number.length - start;
			}

			if (attemptLength == 0) {
				break;
			}
		} else {

			// increment the attempt length
			attemptLength--;

			// stop if we're over out attempt limit
			if (attemptLength == 0) {

				// since we failed to match a part of the number, clear
				// the word list
				word = [];
				break;
			}
		}
	}
	return word;
};