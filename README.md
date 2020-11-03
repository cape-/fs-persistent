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
- `sync` _Bool_: If `true` the filesystem write operation is made **synchronous**. Default `false` (async).

_Returns_

- `data` _Any_: The same `data`.

---

### getItem(key)

- `key` _String_: The stored key.

_Returns_

- `data` _Any_: The retrieved `data`.

---

### removeItem(key)

- `key` _String_: The stored key.

_Returns_

- `null`

## Using a `Reviver`

A reviver is a type of callback function that can transform the values parsed by JSON engine. It is intended to "bring back to life" (_revive_) actual objects by giving you an instance to rejoin properties (data stored as JSON) with methods (alive at runtime).

Use the `reviver` argument of `persistent` to pass the callback function.

```javascript
const persistent = require('fs-persistent')
const persistentWithReviver = persistent('testReviver', (key, value) => {
    if (Number(value) === value) {      // You can apply conditions on *values* 
        return value * 2
    } else if (key === 'secretValue') { // or on *keys*
        return 'XXXXXX'
    } else if (key === 'revivedAt') {   // to transform the returning value
        return (new Date()).toISOString()
    }
    return value   // Or just return the original value
})
```

You can store any data, and it will pass trough the `reviver` when you retrieve it. 

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
const testArray = [2, 3, 5, 8, 13, 'fooBar']


persistentWithReviver.setItem('obj', testObject, true)
persistentWithReviver.setItem('arr', testArray, true)

```

let's see the result of `getItem` for `"obj"` compared with `testObject`

```javascript
const newObject = persistentWithReviver.getItem('obj')
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
const newArray = persistentWithReviver.getItem('arr')
console.log(testArray);
/* Outputs:
[ 2, 3, 5, 8, 13, 'fooBar' ]
*/
console.log(newArray);
/* Outputs:
[ 4, 6, 10, 16, 26, 'fooBar' ]
*/
```

## Author

[Lautaro Capella](https://github.com/cape-)

## License

MIT © [Lautaro Capella](https://github.com/cape-)
