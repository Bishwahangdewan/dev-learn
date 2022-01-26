const arr = [
    { id: 1, val: "sdfsdf" },
    { id: 2, val: "sdfsdfasda" },
    { id: 3, val: "sdfsdfasdsadasd" },
    { id: 4, val: "sdfsdfasdasdasdasd" }
];

const val = arr.map(item => item.id).indexOf(3);

console.log(val)