/**
 * The core mechanism of Throttle is : it uses a flag(lastRan or isThrottled). When the function fires, the flag is set. All the calls while the flag is set to true are ignored. After the delay , the flag is cleared and the nexrt upcoming call can fire again.
 */

// function throttle(fn , delay){
//     //lets take a flag variable
//     let isThrottled = false ; 
//     return function(...args) {
//         if(!isThrottled){
//             //Trigger the call 
//             isThrottled = true ; 
//             fn.apply(this , args) ; 
//             setTimeout(()=>{
//                 isThrottled = false ; 
//             }, delay)
//         }
//     }
// }

 function throttle(func, delay) {
  // Write your code here

  let lastCall = 0; 

  return function (...args) {

    const now = Date.now(); 

    if (now - lastCall >= delay) {
      lastCall = now; 
      func.apply(this, args); 
    }
  }
}


const callBack = (...args)=>{
    console.log("Throttle function called: " + args) ;
}
const throttleFunc = throttle(callBack ,2) ; 

throttleFunc("R") ;
throttleFunc("Ry") ; 
throttleFunc("Ryd") ; 
throttleFunc("Rydh") ; 
throttleFunc("Rydha") ; 
throttleFunc("Rydham") ; 
throttleFunc("Rydh") ; 
throttleFunc("Rydha") ; 
throttleFunc("Rydham") ;


// Output : Throttle function called: R

// It wont print anything during the cooldown .
