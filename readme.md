# fs-Persistent

A simple tool inspired in *localStorage*.

## Description

Store anything **quickly**, retrieve it **quickly**. Uses filesystem to store, not suitable for productive database but it does well for testing.

## Usage

Just require('fs-persistent')

```javascript
const persistent = require("fs-persistent");
const { getItem, setItem } = persistent();

var user = {
  name: "Foo",
  email: "foo@bar.com",
};
setItem("aUser", user); // user object is stored persistently in the filesystem
```

Two lines or many years later...

```javascript
// You can retrieve the stored item anytime later simply by using the same key
var aCopyOfTheUser = getItem("aUser");
```

or if you are not going to need it anymore...

```javascript
// You can delete the stored item
removeItem("aUser");
```


## Author

[Lautaro Capella](https://github.com/cape-)

## License

MIT © [Lautaro Capella](https://github.com/cape-)


