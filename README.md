# fs-Persistent

A simple tool inspired in _localStorage_.

## Description

Store anything **quickly**, retrieve it **quickly**. It will be there beyond runtime.

_Uses filesystem to store, not suitable for productive database but it does well for testing purposes._

## Simple usage

Just require, instantiate and extract the methods you will use.

```javascript
const persistent = require("fs-persistent");
const { setItem } = persistent();

var user = {
  name: "Foo",
  email: "foo@bar.com",
};
setItem("aUser", user); // user object is stored persistently in the filesystem
```

Two lines or many years later...

```javascript
const persistent = require("fs-persistent");
const { getItem, removeItem } = persistent();

// You can retrieve the stored item anytime later simply by using the same key
var aCopyOfTheUser = getItem("aUser");
```

or if you are not going to need it anymore...

```javascript
// You can delete the stored item
removeItem("aUser");
```

## There is more

You can use `baseDir` argument in `persistent` to acomplish data partition.

```javascript
const persistent = require("fs-persistent");
const users = persistent("users");

// This will be saved in ./users/
users.setItem("current", { name: "Cipriano", lastname: "Reyes" });
```

You can instantiate multiple persistent instances with different routes. They can be nested.

```javascript
const persistent = require("fs-persistent");
const orders = persistent('orders');
const orders.closed = persistent('orders/closed'); // You can nest
const orders.open = persistent('orders/open'); // it can be very useful

var myOrder = new Order();

orders.setItem("myLast", myOrder);
orders.open.setItem("myLast", myOrder);
```

The above code generates this filesystem tree

```
.
+-- orders
|  +-- closed
|  +-- open
|  |   +-- myLast.json
|  +-- myLast.json
```

Then...

```javascript
const persistent = require("fs-persistent");
const orders = {
  closed: persistent('orders/closed'),
  open: persistent('orders/open')
};

// When order is closed
orders.closed.setItem("myLast",orders.open.getItem("myLast");
orders.open.removeItem("myLast");
```

## Methods

### setItem(key, data)

- `key` _String_: Any name you want to give it.
- `data` _Any_: The data to store.

_Returns_

- `data` _Any_: The same `data`.

---

### getItem(key)

- `key` _String_: The stored key.

_Returns_

- `data` _Any_: The stored `data`.

---

### removeItem(key)

- `key` _String_: The stored key.

_Returns_

- `null`

## Using a `Reviver`

A reviver is a type of callback function that can transform the values parsed by JSON engine. It is intended to "revive" actual objects by giving you an instance to rejoin data (stored as JSON) with methods.

Use the `reviver` argument of `persistent` to pass the callback function.

```javascript
const persistent = require('fs-persistent')
const testWithReviver = persistent('testReviver', (key, value) => {
    // console.log(`REVIVER KEY ${key} VAL ${value}`); // for Debugging

    if (Number(value) === value) { // You can apply conditions on values 
        return value * 2
    } else if (key === 'secretValue') { // or on keys
        return 'XXXXXX'
    } else if (key === 'revivedAt') { // to transform the returning value
        return (new Date()).toISOString()
    }
    return value   // Or just return the original value
})
```

You can store any data, and it will pass trough the `reviver` when you pull it back 

```javascript
// some dummy Object
const testObject = {
    name: 'John',
    age: 34,
    heigth: 1.78,
    email: 'john@foos.com',
    secretValue: 'A1B2C3D4E5F6',
    revivedAt: null
}

// some dummy Array
const testArray = [2, 3, 5, 8, 13, 'as fxq', 23, 4, 6, 10, 16, 2, 3, 1, 1, 1]


testWithReviver.setItem('obj', testObject, true)
testWithReviver.setItem('arr', testArray, true)

```

let's see the result of `getItem` for `"obj"` compared with `testObject`

```javascript
const newObject = testWithReviver.getItem('obj')
console.log(testObject);
/* Outputs:
{
    name: 'John',
    age: 34,
    heigth: 1.78,
    email: 'john@foos.com',
    secretValue: 'A1B2C3D4E5F6',
    revivedAt: null
}
*/
console.log(newObject);
/* Outputs:
{
    name: 'John',
    age: 68,
    heigth: 3.56,
    email: 'john@foos.com',
    secretValue: 'XXXXXX',
    revivedAt: '2020-10-29T12:47:27.831Z'
}
*/
```

let's see the result of `getItem` for `"arr"` compared with `testArray`

```javascript
const newArray = testWithReviver.getItem('arr')
console.log(testArray);
/* Outputs:
[  2,  3,  5,  8,  13, 'as fxq',  23, 4,  6,  10, 16, 2,  3,  1,  1,  1  ]
*/
console.log(newArray);
/* Outputs:
[  4,  6,  10,  16, 26, 'as fxq',  46, 8,  12,  20, 32, 4,  6,  2,  2,  2  ]
*/
```

## Author

[Lautaro Capella](https://github.com/cape-)

## License

MIT © [Lautaro Capella](https://github.com/cape-)
