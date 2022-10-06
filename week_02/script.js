let num = 100; // integer

// COMMENT

// comment in a line

/*
comment 
in many
lines
*/

// SCOPING



function foo() {
    console.log(num);
    let num1 = 200;
};

function anonFun() {
    console.log("Hello");
};



(() => console.log(100))


let arr = ["foo", "bar", 123]

console.log(arr[1]);


// set item in an array

arr[1] = 321

// insert a new item in array

arr.push("par")

arr.slice("") // not sure

// remove item from an array

arr.splice(2, 1); 

// index of which item to start with
// number of items to be removed from the first one 

// Iteration
// kinda like enumerate() in Python

let newArr = ["cow", "turtle", "goat"]

for (let item of arr) {
    console.log(item)
} 

// of - iterate the value

for (let i in newArr) {
    console.log(i + " " + newArr[i])
}

// in - iterate the index

newArr.forEach((item, i) => console.log(i + " " + item))

// iterate both index and item


// Objects

// Similar to dictionary in Python

let obj1 = {
    name: "Jill",
    age: 85,
    job: "Cactus Hunter",  // last comma is optional
}

// Access property

console.log(obj1.age);
console.log(obj1["name"]);

// reset the value of one object 

obj1.job = "Barista"

// loop through all properties

for (let key in obj1) {
    let value = obj1[key];
    console.log(`${key}: ${value}`); // string templete // Backtic not single quote
}

// two ways to write a string:
// let my_str = "Hello" + key + "more texts here" + value
// let my_str = "Hello ${key} more texts here ${value}"

let my_num = 10;
console.log(typeof my_num);
// this will recognize array as object

// regular for loop

for (let i = 0; 1 < 10; i++) {
    console,log(i);
}

// conditionals

let val = 80;

if (val > 80) {
    console.log("value is larger than 80")
}  else if (val > 50) {
    console.log("okay")
} else {
    console.log("terrible")
}

// ternary expression / single line expresison

let y = (val >= 80) ? console.log("good") : console.log("not good")

// does this work?
// let y = (val >= 80) ? console.log("good") : y = (val > 50) ? console.log("not good") : console.log("bad");

// traversing the dom: 
// look through the script for a specific id

let newVar = document.getElementById("example") 
// search for the id "example" in the html document

newVar.innerHTML += "Hello world!"

// this has to run after the div "example"
// otherwise there will be an error because the script run before the html div "example"






