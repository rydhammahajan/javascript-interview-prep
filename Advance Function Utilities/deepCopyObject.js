const user = {
    name: "Rydham",
    age: 25,
    address: {
        city: "Delhi",
        pincode: 110001,
        coords: {
            lat: 28.6139,
            lng: 77.2090
        }
    },
    hobbies: ["coding", "reading", "gaming"],
    scores: {
        math: 95,
        science: 88
    }
};
// function to deep clone the object 

function deepClone(source){
    if (source === null || typeof source !== 'object') {
        return source;
    }
    // Handle Arrays
    if (Array.isArray(source)) {
        return source.map(item => deepClone(item));
        // recursively clone each element
    }
    let target = {} ; 
    for(let key in source) {
        target[key] = deepClone(source[key]) ;
    }
    return target ; 
}

// const copy = user;
// copy.name = "Muskaan";
// console.log(user.name); 

// const shallow = { ...user };
// shallow.address.city = "Mumbai";
// console.log(user.address.city);   // what do you expect?

const clone = deepClone(user);
clone.address.city = "Mumbai";
clone.hobbies.push("sleeping");
clone.scores.math = 0;

console.log(user);
console.log(clone) ;
// All three below should still show original values
console.log(user.address.city);   // should be "Delhi"
// console.log(user.hobbies);        // should be ["coding","reading","gaming"]
// console.log(user.scores.math);    // should be 95