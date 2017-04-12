# strict-extend
A shallow extend method that removes extra properties from the target object.

Behaves like [`Object.assign()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign), but any properties on the target argument that aren't on any of the source arguments will be removed.

## Installation
This package is available on npm as `strict-assign`.
```
npm install strict-assign
```

## Usage
### Syntax
strictAssign(_target_, _...sources_)
### Parameters

**`target`**: The target object.

**`sources`**: The source object(s).

### Description
Properties in the source object(s)
