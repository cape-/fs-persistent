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

```bash
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
const orders.closed = persistent('orders/closed');
const orders.open = persistent('orders/open');

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

## TODO

- Add reviver callback function to `getItem`

## Author

[Lautaro Capella](https://github.com/cape-)

## License

MIT © [Lautaro Capella](https://github.com/cape-)
