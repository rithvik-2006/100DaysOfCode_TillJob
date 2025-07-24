// Types in TypeScript
let userName: string = "Rithvik";
let age: number = 21;
let isStudent: boolean = true;
// You can also use:
// string, number, boolean
// any, unknown, null, undefined
// void (for functions that return nothing)
// never (for functions that never return)
// array, tuple, enum

//Arrays
let numbers: number[] = [1, 2, 3];
let fruits: string[] = ["apple", "banana"];



//Union Types

let value: string | number;
value = "Hello";
value = 42;
// Type Aliases


type ID = string | number;
let userId: ID = 101;

//Interfaces
//Interfaces define the shape of an object (like a contract or blueprint). Useful in object-based code.
interface User {
  name: string;
  age: number;
  isAdmin?: boolean; // optional property
}

const user1: User = {
  name: "Rithvik",
  age: 21,
};

function printUser(user: User) {
  console.log(`${user.name} is ${user.age} years old.`);
}

interface Admin extends User {
  role: string;
}

const admin1: Admin = {
  name: "Alice",
  age: 30,
  role: "Moderator",
};

function add(a: number, b: number): number {
  return a + b;
}

console.log(add(5, 10)); // 15

//Functions in TypeScript

//Simple function with types
const greet = (name: string): string => {
  return `Hello, ${name}`;
};

//Arrow function with types
function log(message: string, level: string = "info") {
  console.log(`[${level.toUpperCase()}] ${message}`);
}
//Optional and default parameters
log("Server started"); // INFO
log("User not found", "warning"); // WARNING

//Function with void return type
function showAlert(): void {
  alert("This is an alert!");
}
