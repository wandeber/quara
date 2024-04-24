# [Quara](https://www.npmjs.com/package/quara) - [![GitHub license](https://img.shields.io/badge/license-CC_BY--ND_4.0-blue.svg)](https://github.com/wandeber/quara?tab=License-1-ov-file#readme) [![Version](https://img.shields.io/github/package-json/v/wandeber/quara)](https://www.npmjs.com/package/quara) [![size](https://img.shields.io/bundlephobia/min/quara)](https://www.npmjs.com/package/quara)


> Query as Sara

**Don't use this in production**: I may introduce breaking changes until version 1.0.0.

Programming language interpreted by JavaScript to preprocess text files like email templates.

## About
- Supported comments:
  - Line comments: // ...
  - Block comments: /* ... */
- Supported operators:
  - +, -, *, /, %, ^, ¬/
  - =, +=, -=, *=, /=, %=, ^=
  - !, ==, !=, ~=, !~=, <, >, <=, >=, &&, ||
  - $not, $eq, $ne, $leq, $lne, $lt, $gt, $lte, $gte, $and, $or
  - (, )
  - ++, -- (as pre-increment and pre-decrement)
  - ., [, ]
  - .. (as exclusive range operator)
  - {, }
  - , (Comma)
  - ;, :
  - ->
  - ", `, \
- Supported types:
  - Booleans.
  - Integer and decimal numbers.
  - Strings.
  - Objects, arrays.
- Variables.
- Reserved keywords:
  - true, false
  - const, var
  - any, char, int, integer, float, double, string, bool, boolean
  - if, else, /if
  - while, /while
  - for, /for
  - each, in, endeach
  - function, return, /function
  - null
  - class, extends, /class
  - get, set
  - static, abstract, final, virtual
  - private, public, protected
  - interface, implements, /interface


### If/else
```rust
if condition {
  // ...
}
else if condition {
  // ...
}
else {
  // ...
}

// Recommended syntaxes:
if c {r}
else if c2 {r2}
else {r3}
if (c) r;

// Other syntaxes:
if (c) r
if (c) {r}
if (c) {r;}
if c -> r
... else r2
...; else r2
...} else r2
```

### Objects
```js
var obj = {
  key1: 1,
  key2: 2
};
var key = "key3";
print(obj.{key});
obj.{key} = 4;
```

### Arrays
```js
var list = [1, 2, 3, 4, 5];
list.length; // 5
print(list[0]);
var num = 2;
print(list[num]);
list[4] = 6;
list[num] = 7;
list.{4} = 6;

// TODO: Add support for this?
list.2 = 5;
```

### Loops

#### While
```js
while condition {
  // ...
}

// Recommended syntaxes:
while c {r}
while c: r /while;
while (c) r;

// Other syntaxes:
while (c) r
while (c) {r}
while (c) {r;}
while c -> r
```

## Text processor/templates
```js
`Hola` // Hola
```

Assign the output to a variable:
```js
var name = "Sara";
var text = `Hola, {name}`; // Hola Sara
```

Coding:
```js
var name = "Sara";
var text = `Hola, {name += " V."; name}`; // Hola Sara V.
```

### variables:
```js
var name = "Sara";
`Hola, {name}` // Hola Sara
```

### if/else statements:
```js
var name = "Sara";
var useName = true;
`
  Hola
  {if useName:}
    , {name}
  {else:}
    !
  {/if}
`
```

### While loops:
```js
var i = 0;
`
  {while i < 5:}
    {i}
    {i = i + 1}
  {/while}
`
```

## Standard functions
```js
contains
isNaN

// String:
length
split
join
upperCase
lowerCase
trim

// Math:
abs
ceil
floor
round
trunc
max
min
fixed

// Types:
isNumber
isDecimal
isInteger
isString
isBoolean
isObject
isArray
help
log
print
hi
```

## Pending
- Scopes
- Function declaration
- Loops
  - For

### Objects
```js
var k = "key1";
var obj = {
  {k}: 1,
  {"key2"}: 2
};
```

### Loops

#### For (maybe unnecessary)
```rust
for (item, key) in list {
  // ...
}

// Recommended syntaxes:
for item in list {r}
for (item, key) in list {r}

for item in list: r; /for;
for (item, key) in list: r; /for;

// Other syntaxes:
for (item in list) r

// ?
for 1..5 {}
for item in 1..5 {}
for (item, key) in 1..5 {}
```

## References and special thanks

- Thanks to [Ruslan Spivak](https://ruslanspivak.com/) for his [Let's Build A Simple Interpreter](https://ruslanspivak.com/lsbasi-part1/) series.
- [LUA](https://github.com/lua/lua)

## License

Quara © 2024 by [Bernardo Alemán Siverio (wandeber)](https://github.com/wandeber) is licensed under [CC BY-ND 4.0](https://github.com/wandeber/quara?tab=License-1-ov-file#readme)
