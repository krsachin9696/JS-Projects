class Cloth {
    constructor(type, color) {
        this.type = type;
        this.color = color;
    }
} class Tshirt extends Cloth {
    constructor(type, color, size) {
        super(type, color);
        this.size = size;
    }
} class Pants extends Cloth {
    constructor(type, color, size, length) {
        super(type, color);
        this.size = size;
        this.length = length;
    }
} const arr = [
    new Pants("cotton", "red", "M", 30),
    new Pants("Denim", "green", "L", 23),
    new Pants("Velvet", "purple", "XL", 40),
    new Tshirt("cotton", "white", "L"),
    new Tshirt("cotton", "green", "M"),
    new Tshirt("Denim", "green", "S"),
];
// console.log(arr);
for(let i=0; i<arr.length; i++) {
    console.log(typeof(arr[i]));
}

// const res = arr.reduce((acc, curr) => {
//     if(curr.length){
//         acc.pants++;
//     }else{
//         acc.tshirt++;
//     }
//     return acc;
// }, {pants:0,tshirt:0});

// console.log(res)

const res = arr.reduce((acc, curr) => {
    if (acc[curr.type]) {
        acc[curr.type]++;
    } else {
        acc[curr.type] = 1;
    }
    return acc;
}, {});
  
console.log(res)