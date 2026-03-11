// Polyfill for flat()
// Implement:
// Array.prototype.myFlat
// Requirements
// Accept depth parameter
// Flatten array accordingly
// Example
// const arr = [1,[2,[3,[4]]]];
// arr.myFlat(2);
// // [1,2,3,[4]]
Array.prototype.myFlat = function(level=1) {
    let arr = this  ; 
    function flatFunction(arr , level){
        const ans = [] ; 
        arr.forEach((item)=>{
            if(Array.isArray(item)){
                if(level == 0) {
                    ans.push(item) ; 
                }else{
                    ans.push(...flatFunction(item , level-1)) ; 
                }
            }else{
                ans.push(item) ; 
            } 
        })
        return ans ;
    }
    return flatFunction(arr , level) ;    
}
const arr = [1,[2,[3,[4]]]];
const ans = arr.myFlat(4);
console.log(ans) ;
