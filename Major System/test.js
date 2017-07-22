
var logic = require('./logic');

var v1 = '1';
var v2 = '2';
var v3 = '3';
var v4 = '4';

var number = ''
if(v1 != undefined) {
    number += v1
}
if(v2 != undefined) {
    number += v2
}
if(v3 != undefined) {
    number += v3
}
if(v4 != undefined) {
    number += v4
}

console.log(number)

var x = logic.go(number);
console.log(x)

var letters = number.split("")
for(var y in letters) {
    console.log(letters[y])
}