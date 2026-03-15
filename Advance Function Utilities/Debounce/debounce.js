/**
 * Concept of Debounce : 
 * Imagine a search bar. Every time user types a character, it makes an API call to fetch the data. 
 * For-example : If we a keyword Javascript, it will make an API call for all the 10 characters. 
 * But in reality, the user only cares about the result after they finish typing. 
 * This problem is solved by the concept of debouncing. 
 * 
 * The core mechanism of Debouncing is to maintain a timer. On every keyword entered, it will reset the timer and * * will make the API call only once the timer completes without getting reset
 * 
 * Use Cases: Input Search , Form Validation , Submit Button Multiple Times , Auto Save 
 * 
 * Polyfill for Debounce
 */

function debounce(fn , delay){
    let timer ; 
    return function(...args){
        clearTimeout(timer) ; 
        timer = setTimeout(()=>{
            fn.apply(this , args) ; 
        } , delay) ; 
    }
}

function callBack(input){
    console.log("Search made for : " + input) ; 
}

const debouncedSearch = debounce(callBack , 200 ) ; 

debouncedSearch("R") ; 
debouncedSearch("Ry") ; 
debouncedSearch("Ryd") ; 
debouncedSearch("Rydh") ; 
debouncedSearch("Rydha") ; 
debouncedSearch("Rydham") ; 

// Output : Search made for : Rydham
