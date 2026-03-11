// Polyfill for bind()
// Implement:
// Function.prototype.myBind
// Requirements
// Should return a new function
// Should preserve this
// Should allow arguments to be passed later
// Example
// function greet(city) {
//   console.log(this.name + " from " + city);
// }
// const user = { name: "Rydham" };
// const boundFn = greet.myBind(user);
// boundFn("Delhi");

Function.prototype.myBind = function(object){
    const func  = this ;
    return function(...rest){
        object.addFunction = func ; 
        object.addFunction(...rest) ; 
        delete object.addFunction ; 
    }
}
function greet(city , country) {
  console.log(this.name + " from " + city + ", " + country );
}
const user = { name: "Rydham" };
const boundFn = greet.myBind(user);
boundFn("Delhi" , "India");
