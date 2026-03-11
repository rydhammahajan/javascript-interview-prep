/*Polyfill for call()
Implement your own version of:
Function.prototype.myCall

Requirements : It should invoke a function with a given this context.
It should accept arguments individually.

Example
function greet(city) {
  console.log(this.name + " from " + city);
}
const user = { name: "Rydham" };
greet.myCall(user, "Delhi");
// Output
Rydham from Delhi
*/
Function.prototype.myCall = function(object , ...rest){
    object.addFunction = this ; 
    object.addFunction(...rest) ;
    delete object.addFunction ;  
}
function greet(city) {
  console.log(this.name + " from " + city);
}
const user = { name: "Rydham" };
greet.myCall(user, "Delhi");
