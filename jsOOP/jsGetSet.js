// var address = {
//     street: 'No street',
//     state: 'No state',
    
//     get getStreet() {
//         return this.street;
//     },
    
//     get getState() {
//         return this.state;
//     },
    
//     set setStreet(street) {
//         this.street = street || 'no street';
//     },
    
//     set setState(state) {
//         this.state = state || 'no state';
//     },
    
//     toString() {
//         return this.street +", "+ this.state;
//     }
// }

// console.log(address.toString());

// address.setStreet = "main street";
// address.setState = null; 

// console.log(address.toString());

// console.log(address.getState+" "+address.getStreet);


// Create getter and setter with Object.__define__.call()

function Coordinats() {
    this.lat = 'No lat';
    this.lon = 'not lon';
}

Object.__defineGetter__.call(Coordinats.prototype,"getCoords", function(){ return this.lat + " " + this.lon});
Object.__defineSetter__.call(Coordinats.prototype,"setCoords", function(string) { 
    var parts = string.split(", ");
    this.lat = parts[0] || "00";
    this.lon = parts[1] || "00";
});

var coords = new Coordinats();
coords.setCoords = "12, 15";
console.log(coords.getCoords);
