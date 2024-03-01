const EventEmmiter = require('events');

const event = new EventEmmiter();

event.on("YoBoi" , (name , age , en) => {console.log(`Your Name is ${name} and age is ${age} , your enrollment number is ${en}`)});

event.emit("YoBoi" , 'Bhavik' , 20 , 200280116023)