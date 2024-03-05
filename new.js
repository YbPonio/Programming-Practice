var expect = function (val) {
  return {
    toBe: (val2) => {
      return val == val2 ? true : "Not Equal";
    },
    notToBe: (val2) => {
      return val != val2 ? true : "Equal";
    },
  };
};

let new1 = expect(5).toBe(3); // true
let new2 = expect(2).notToBe(5); // throws "Equal"

console.log(new1);
console.log(new2);
// console.log(add3);
