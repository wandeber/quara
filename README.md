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
  - {, }
  - , (Comma)
  - ;, :
  - ->
  - ", `
- Supported types:
  - Booleans.
  - Integer and decimal numbers.
  - Strings.
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
  - null, undefined
  - class, extends, /class
  - get, set
  - static, abstract, final, virtual
  - private, public, protected
  - interface, implements, /interface


### If/else
```js
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

// Other syntaxes:
if (c) r
if (c) r;
if (c) {r}
if (c) {r;}
if c -> r
... else r2
...; else r2
...} else r2
```

### Objects
```js
print(obj.key1);

var key = "key1";
print(obj.{key});
print(obj[key]); // Deprecated
```

### Arrays
```js
print(list[0]);
var num = 2;
print(list[num]);
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

// Other syntaxes:
while (c) r
while (c) r;
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
fixed
upperCase
lowerCase
contains
isNaN
print
```

## Other
- Array declaration

## Pending
- Object declaration
- Scopes
- Function declaration
- Loops
  - For
  - Each

### Objects
```js
var key = "key2";
var obj = {
  key1: "value 1",
  {key}: 2,
  {"key3"}: "value 3"
};
print(obj.key1);
print(obj.{key});
```

### Arrays
```js
var list = [1, 2, 3, 4, 5];
print(list[0]);
var num = 2;
print(list[num]);
```

### Loops

#### For (maybe unnecessary)
```js
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
```

#### Each
```js
each (item in list) {
  // ...
}
```

## References and special thanks

- Thanks to [Ruslan Spivak](https://ruslanspivak.com/) for his [Let's Build A Simple Interpreter](https://ruslanspivak.com/lsbasi-part1/) series.
- [LUA](https://github.com/lua/lua)

## License

Quara © 2024 by [Bernardo A. Siverio (wandeber)](https://github.com/wandeber) is licensed under [CC BY-ND 4.0](https://github.com/wandeber/quara?tab=License-1-ov-file#readme)
