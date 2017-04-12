# strict-extend
A shallow extend method that removes extra properties from the target object.

Inspired by [jQuery's `.extend()`](https://api.jquery.com/jquery.extend/) and
[`Object.assign()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign),
but any properties on the target argument that aren't on any of the source arguments will be removed.
Useful for filling in defaults for options parameters.

## Installation
This package is available on [npm](https://www.npmjs.com/package/strict-extend) as `strict-extend`.
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
`strictExtend` will return a new object containing all of the properties from all of the `sources` object(s).
Any properties already present on `target` will not be overwritten.
However, any properties present on `target` which are not present on any of the `sources` object(s) will not be copied to the return object.
Values for properties which are on multiple `sources` objects will be resolved by taking the value from the last source object.

Note that an error will not be thrown for `null` or `undefined` parameters.
Instead, an empty object will be returned.

### Examples
#### Default Options
```javascript
import strictExtend from 'strict-extend'; // or const strictExtend = require('strictExtend');

const defaults = {
    color: 'red',
    name: 'Clifford',
};

function dog(options) {
    return strictExtend(options, defaults);
}

console.log(dog()); // { color: 'red', name: 'Clifford' }
console.log(dog({ color: 'blue', name: 'Sparky'})); // { color: 'blue', name: 'Sparky' }
console.log(dog({ name: 'Rover', hasCollarOn: true })); // { color: 'red', name: 'Rover' }
// 'hasCollarOn' was ignored
```

#### Multiple Sources and Last In Behavior
```javascript
const strictExtend = require('strict-extend') // or import strictExtend from 'strict-extend';

const target = {
    kept: 'should not be overwritten',
    removed: 'should NOT be copied'
};
const source1 = {
    kept: 'this will be ignored',
    newProp1: 'this will be copied',
    newProp2: 'this value will be ignored due to the property on source2'
};
const source2 = {
    newProp2: 'last in wins!'
};
console.log(strictExtend(target, source1, source2));
//  {
//      kept: 'should not be overwritten', (copied from target)
//      newProp1: 'this will be copied', (copied from source1)
//      newProp2: 'last in wins!', (copied from source2)
//  }
//  notice 'removed' from target not copied
```

#### `null`/`undefined` Behavior
```javascript
import strictExtend from 'strict-extend';
console.log(strictExtend()); // {}
console.log(strictExtend(null)); // {}
console.log(strictExtend(null, null)); // {}
console.log(strictExtend({}, null )); // {}
console.log(strictExtend(null, {})); // {}
```

# Development
## Install
1. Clone the [repository](https://github.com/Spreetail/strict-extend).
2. Run `npm install` in the directory you cloned into.

## Tests
`npm test` assumes you have Chrome and Firefox installed.
If that is not the case, you can run `npm run test-ci` to only run tests with [PhantomJS](http://phantomjs.org/) (which is a dev dependency).
Or, you can run the tests and specify which browsers you'd like to test with using the `--browsers` option with `karma start`.
For example, to test only with Firefox, you can run `karma start --browsers Firefox`.

# License
Licensed under the [MIT License](https://opensource.org/licenses/MIT).
