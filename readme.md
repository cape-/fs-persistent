# fs-Persistent

A simple tool inspired in *localStorage*.

## Description

Store anything **quickly**, retrieve it **quickly**. 
*Uses filesystem to store, not suitable for productive database but it does well for testing.*

## Methods

### setItem(key, data)
- `key` *String*: Any name you want to give it.
- `data` *Any*: The data to store.

Returns

- `data` *Any*: The same `data`.

### getItem(key)
- `key` *String*: The stored key.

Returns

- `data` *Any*: The stored `data`.

### removeItem(key, val)
- `key` *String*: The stored key.

Returns

- `null`


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

You can instantiate multiple persistent instances with different routes by using the `baseDir` argument in `persistent`.

```javascript
const persistent = require("fs-persistent");
const orders = persistent('orders');
const closedOrders = persistent('orders/closed');
const users = persistent('users');

orders.setItem("myLast", new Order());
users.setItem("myLast", new User());

```

Then... 

```javascript
const persistent = require("fs-persistent");
const orders = persistent('orders');
const users = persistent('users');

var theLastOrder = orders.getItem("myLast");
var theLastUser = users.getItem("myLast");
```

## Author

[Lautaro Capella](https://github.com/cape-)

## License

MIT © [Lautaro Capella](https://github.com/cape-)


