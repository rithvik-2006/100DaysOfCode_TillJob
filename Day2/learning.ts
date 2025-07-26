// ===========================================
// 🚀 TypeScript Classes - All Concepts Demo
// ===========================================

// 1. Basic Class
class Point {
  // Empty class
}

// 2. Class Fields and Initialization
class Person {
  name: string;               // public field (default)
  age: number = 18;           // initializer (inferred type)
  address!: string;           // definite assignment assertion (!)
}

// 3. readonly Modifier
class Book {
  readonly isbn: string;

  constructor(isbn: string) {
    this.isbn = isbn;
  }
}

// 4. Constructor with Default Value
class Student {
  name: string;

  constructor(name: string = "Anonymous") {
    this.name = name;
  }
}

// 5. Methods
class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }

  square(x: number): number {
    return x * x;
  }
}

// 6. Getters and Setters
class Temperature {
  private _celsius: number;

  constructor(celsius: number) {
    this._celsius = celsius;
  }

  get fahrenheit(): number {
    return this._celsius * 1.8 + 32;
  }

  set fahrenheit(value: number) {
    this._celsius = (value - 32) / 1.8;
  }
}

// 7. Implements Clause
interface Movable {
  speed: number;
  move(): void;
}

class Car implements Movable {
  speed: number = 0;

  move() {
    console.log(`Moving at ${this.speed} km/h`);
  }
}

// 8. Extends Clause (Inheritance)
class Animal {
  makeSound(): void {
    console.log("Some sound");
  }
}

class Dog extends Animal {
  makeSound(): void {
    super.makeSound(); // Access base class method
    console.log("Bark");
  }
}

// 9. Field Initialization Order
class Base {
  baseField = "base";

  constructor() {
    console.log("Base constructor:", this.baseField);
  }
}

class Derived extends Base {
  derivedField = "derived";

  constructor() {
    super();
    console.log("Derived constructor:", this.derivedField);
  }
}

// 10. Visibility Modifiers
class Employee {
  public name: string;
  private salary: number;
  protected department: string;

  constructor(name: string, salary: number, department: string) {
    this.name = name;
    this.salary = salary;
    this.department = department;
  }

  getSalary(): number {
    return this.salary;
  }
}

class Manager extends Employee {
  getDepartment(): string {
    return this.department; // ✅ Allowed
  }
}

// 11. JavaScript-native #private fields
class Counter {
  #count = 0;

  increment() {
    this.#count++;
  }

  get value() {
    return this.#count;
  }
}

// 12. Static Members
class MathUtil {
  static PI: number = 3.14;

  static square(x: number): number {
    return x * x;
  }
}

// 13. Static Block
class Config {
  static settings: Record<string, any>;

  static {
    Config.settings = {
      theme: "dark",
      language: "en",
    };
  }
}

// 14. Generic Class
class Box<T> {
  content: T;

  constructor(content: T) {
    this.content = content;
  }

  getContent(): T {
    return this.content;
  }
}

// 15. Arrow Function with `this` Binding
class Button {
  label = "Click me";

  onClick = () => {
    console.log("Clicked:", this.label); // `this` bound
  }
}

// 16. this parameter in methods
class Greeter {
  greet(this: Greeter) {
    console.log("Hello from Greeter");
  }
}

// 17. this type for method chaining
class Builder {
  data: string = "";

  setData(data: string): this {
    this.data = data;
    return this;
  }

  print(): this {
    console.log(this.data);
    return this;
  }
}

// 18. Parameter Properties
class User {
  constructor(
    public username: string,
    private password: string,
    readonly id: number
  ) {}

  checkLogin(pwd: string): boolean {
    return this.password === pwd;
  }
}

// 19. Class Expression
const Rectangle = class {
  constructor(public width: number, public height: number) {}

  area(): number {
    return this.width * this.height;
  }
};

// 20. Abstract Class and Member
abstract class Shape {
  abstract getArea(): number;

  printArea() {
    console.log(this.getArea());
  }
}

class Circle extends Shape {
  constructor(public radius: number) {
    super();
  }

  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

// 21. Structural Typing
class A {
  name = "Alice";
}

class B {
  name = "Bob";
}

let a: A = new B(); // ✅ Allowed due to structural typing

// =============================
// ✅ Test Instances
// =============================
const person = new Person();
const book = new Book("12345");
const student = new Student("Rithvik");
const calc = new Calculator();
const temp = new Temperature(0);
const car = new Car();
const dog = new Dog();
const derived = new Derived();
const manager = new Manager("John", 5000, "HR");
const counter = new Counter();
const circle = new Circle(10);
const box = new Box<string>("Hello");
const builder = new Builder().setData("Chained!").print();
const user = new User("admin", "1234", 1);
const rect = new Rectangle(5, 10);

console.log("Circle Area:", circle.getArea());
console.log("Box Content:", box.getContent());
console.log("Rectangle Area:", rect.area());
