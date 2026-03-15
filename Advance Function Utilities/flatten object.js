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

function flatNestedObject(source){
    let target = {} ; 
    for(let key in source) {
        if(typeof source[key] == 'object'  && !Array.isArray(source[key])){
            console.log(key) ;
            target = {...target , 
                ...flatNestedObject(source[key])
            } ;
        }else{
            target[key] = source[key] ; 
        }
    }
    return target ;
}

console.log(flatNestedObject(user)) ;