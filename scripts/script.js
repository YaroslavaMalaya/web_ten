// builder
// problem: separate the construction of a complex object from its representation so that the same construction process can create different representations

class Order {
    constructor() {
        this.order = {}; // initializing the order object
    }

    addDrink(drink) {
        this.order.drink = drink;
        return this; // returning this allows method chaining
    }

    addMainCourse(mainCourse) {
        this.order.mainCourse = mainCourse;
        return this;
    }

    addDessert(dessert){
        this.order.dessert = dessert;
        return this;
    }

    build() {
        return this.order;
    }
}

const order1 = new Order().addDrink("Coke").addMainCourse("Burger").addDessert("Pie").build();
const order2 = new Order().addDrink("Sprite").addMainCourse("Pizza").build();
console.log(order1);
console.log(order2);


// singleton
// problem: ensure that a class has only one instance and provide a global point of access to it

class SingletonCheeseburger {
    static instance;  // it holds the single instance
    
    toppings = [];
    
    constructor() {
        if (SingletonCheeseburger.instance) {
            return SingletonCheeseburger.instance;  // if already instantiated, return the instance
        }

        this.addTopping("cheese");
        this.addTopping("lettuce");
        this.addTopping("tomato");
        this.addTopping("beef patty");
        
        SingletonCheeseburger.instance = this;  // otherwise, create a new instance
    }

    addTopping(topping) {
        this.toppings.push(topping);
    }

    describeBurger() {
        return `A cheeseburger with toppings: ${this.toppings.join(", ")}`;
    }
}

const burger1 = new SingletonCheeseburger();
const burger2 = new SingletonCheeseburger();

burger1.toppings[1] = "onions"; // will be changed in both burgers
console.log(burger1.describeBurger());  
console.log(burger2.describeBurger());  // It will display the same description as burger1
console.log(burger1 === burger2);  // it will log 'true' because it's the same instance


// decorator
// problem: attach additional responsibilities or behaviors to an object dynamically without affecting its structure

class Coffee {
    cost() {
        return 5;
    }
}

// decorator functions to add features to the coffee
const withMilk = coffee => {
    const cost = coffee.cost();
    coffee.cost = () => cost + 2;
};

const withSugar = coffee => {
    const cost = coffee.cost();
    coffee.cost = () => cost + 1;
};

const sizeXL = coffee =>{
    const cost = coffee.cost();
    coffee.cost = () => cost + 3;
}

const coffee1 = new Coffee();
const coffee2 = new Coffee();
withMilk(coffee1);
sizeXL(coffee1);
withSugar(coffee2);
console.log(coffee1.cost(), coffee2.cost());


// facade
// problem: provide a simple interface for working with a complex subsystem that contains many classes

class RestaurantFacade {
    // this is the facade that hides the complexities of the order process
    orderFood(item) {
        const chef = new Chef();
        const waiter = new Waiter();
        waiter.takeOrder(item);
        chef.cook(item);
        waiter.serve(item);
    }
}

class Chef {
    cook(item) {
        console.log(`Cooking ${item}...`);
    }
}

class Waiter {
    takeOrder(item) {
        console.log(`Order received for ${item}`);
    }

    serve(item) {
        console.log(`Serving ${item}...`);
    }
}

const restaurant = new RestaurantFacade();
restaurant.orderFood("Pizza");


// composite
// problem: compose objects into tree structures to represent hierarchies

class MenuItem {
    // represents individual menu items that can be part of the Menu
    constructor(name) {
        this.name = name;
    }

    display() {
        console.log(this.name);
    }
}

class Menu {
    // Menu represents a composite object that can contain MenuItem instances or other Menu instances
    constructor() {
        this.menu = [];
    }

    add(item) {
        this.menu.push(item);
    }

    display() {
        console.log("Menu:");
        for (const item of this.menu) {
            item.display();
        }
    }
}

const mainMenu = new Menu();
mainMenu.add(new MenuItem("Pizza"));      
mainMenu.add(new MenuItem(new Coffee()));
mainMenu.add(new MenuItem(new SingletonCheeseburger()));
mainMenu.display();