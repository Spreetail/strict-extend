# strict-extend
A shallow extend method that removes extra properties from the target object.

Inspired by [jQuery's `.extend()`](https://api.jquery.com/jquery.extend/) and
[`Object.assign()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign),
but any properties on the target argument that aren't on any of the source arguments will be removed.
Useful for filling in defaults for an options parameter.

## Installation
This package is available on npm as `strict-extend`.
```
npm install strict-extend
```

## Usage
### Syntax
strictExtend(_target_, _...sources_)

### Parameters
**`target`**: The target object.

**`sources`**: The source object(s).

### Description
The exported method (`strictExtend`) will return a new object containing all of the properties from all of the `sources` object(s).
Any properties already present on `target` will not be overwritten.
However, any properties present on `target` which are not present on any of the `sources` object(s) will not be copied to the return object.
Values for properties which are on multiple `sources` objects will be resolved by taking the value from the last source object.

Note that an error will not be thrown for `null` or `undefined` parameters.
Instead, an empty object will be returned.

### Examples
#### Default Options
```javascript
import strictExtend from strictExtend;

const defaults = {
    color: 'red',
    name: 'Clifford',
};

function dog(options) {
    return strictExtend(options, defaults);
}

console.log(dog()); // { color: 'red', name: 'Clifford' }
console.log(dog({ color: 'blue', name: 'Sparky'})); // { color: 'blue', name: 'Sparky' }
console.log(dog({ name: 'Rover', hasCollarOn: true })) // { color: 'red', name: 'Rover' }
// 'hasCollarOn' was ignored
```

# License
Licensed under the [MIT License](https://opensource.org/licenses/MIT).
