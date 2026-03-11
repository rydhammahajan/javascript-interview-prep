/**
 * Polyfill for apply()
 * Implement:
 * Function.prototype.myApply
 * Requirements
 * Same behavior as call : Arguments should be passed as array

Example
function greet(city, country) {
  console.log(this.name + " from " + city + ", " + country);
}

const user = { name: "Rydham" };

greet.myApply(user, ["Delhi", "India"]);
 */

function greet(city, country) {
  console.log(this.name + " from " + city + ", " + country);
}
const user = { name: "Rydham" };

Function.prototype.myApply = function(object , arg){
    object.addFunction = this; 
    object.addFunction(...arg) ; 
    delete object.addFunction;
}

greet.myApply(user, ["Delhi", "India"]);
