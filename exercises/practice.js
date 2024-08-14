
class Cloth {
    constructor(color, type) {
        this.type = type;
        this.color = color;
    }
}

class Tshirt extends Cloth {
    constructor(size, length, color) {
        super(color, 'Tshirt');
        this.size = size;
        this.length = length;
    }
}

class Pant extends Cloth {
    constructor(size, length, color) {
        super(color, 'pant');
        this.length = length;
        this.size = size;
    }
};


const arr = [
    new Tshirt("S", "M", "Blue"),
    new Pant("M", "S", "Green"),
    new Pant("S", "L", "Blue"),
    new Tshirt("L", "M", "Red"),
]

console.log(arr)

const typesCount = arr.reduce((acc, cuu) => (
    {
        [cuu.type]: acc[cuu.type] ? ++acc[cuu.type] : 1,
        ...acc,
    }), {}
);
console.log(typesCount);


const colorCount = arr.reduce((acc, cuu) => (
    {
        ...acc,
        [cuu.color]: acc[cuu.color] ? ++acc[cuu.color] : 1
    }), {}
);
console.log(colorCount);


let sizeCount = {};

arr.forEach(item => {
    sizeCount[item.size] = sizeCount[item.size]+1 || 1;
})

console.log(sizeCount);

let lengthCount = {};

arr.map(item => {
    lengthCount[item.length] = lengthCount[item.length]+1 || 1;
})

console.log(lengthCount);


const delay = setTimeout(() => {
    console.log("world")
}, 2000);

console.log("Hello");
setTimeout(() => {
    console.log("world")
}, 2000);
console.log("hii");

function delayyy() {
    return new Promise((resolve) => {
        setTimeout(resolve, 5000);
    });
}


async function run() {
    console.log("Hello");
    await delayyy();
    console.log("hii");
}

run();

const typesCount1 = arr.reduce((acc, cuu) => 
    {
        let key = acc[cuu.type] 
        const val = {[cuu.type]: key ? ++key : 1}
        // console.log(val)
        return {...val,...acc}
    }, {}
);
console.log(typesCount1);





const obj1 = {a:1, b:2}
const obj2 = {a:2, c:3}


console.log({...obj1, ...obj2})
console.log({...obj2, ...obj1})





const sachin = new Promise((resolve) => {
        setTimeout(resolve, 5000);
    });


async function run() {
    console.log("Hello");
    await sachin;
    console.log("hii");
}

run();




