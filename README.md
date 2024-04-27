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
  - not, eq, ne, leq, lne, lt, gt, lte, gte, and, or
  - $not, $eq, $ne, $leq, $lne, $lt, $gt, $lte, $gte, $and, $or
  - (, )
  - ++, -- (as pre-increment and pre-decrement)
  - ., [, ]
  - .. (inclusive range operator)
  - ..< (exclusive range operator)
  - {, }
  - , (Comma)
  - ;, :
  - ->
  - ", `, \
  - in, $in
  - /if, /while, /for, /fn, /struct, /class, /interface, /enum
- Supported types:
  - Booleans.
  - Integer and decimal numbers.
  - Strings.
  - Objects, arrays.
- Variables.
- Reserved keywords:
  - true, false
  - const, var
  - any, char, int, float, double, string, bool
  - if, else
  - while,
  - for,
  - fn, return,
  - null
  - enum
  - struct,
  - class, extends
  - get, set
  - static, abstract, final, virtual
  - private, public, protected
  - interface, implements

### Objects
```js
obj = {
  key1: 1,
  key2: 2
};
key = "key3";
print(obj.{key});
obj.{key} = 4;
```

### Arrays
```js
list = [1, 2, 3, 4, 5];
list.length; // 5
print(list[0]);
num = 2;
print(list[num]);
list[4] = 6;
list[num] = 7;
list.{4} = 6;

// TODO: Add support for this?
list.2 = 5;
```

### Control

#### If/else
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
if (c) r;

// Other syntaxes:
if (c) r
if (c) {r}
if (c) {r;}
if c -> r
```

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

### Text processor/templates
```js
`Hola` // Hola
```

Assign the output to a variable:
```js
name = "Sara";
text = `Hola, {name}`; // Hola Sara
```

Coding:
```js
name = "Sara";
text = `Hola, {name += " V."; name}`; // Hola Sara V.
```

#### variables:
```js
name = "Sara";
`Hola, {name}` // Hola Sara
```

#### if/else statements:
```js
name = "Sara";
useName = true;
`
  Hola
  {if useName:}
    , {name}
  {else:}
    !
  {/if}
`
```

#### While loops:
```js
i = 0;
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
- Regular expressions
- For loops

### Objects
```js
k = "key1";
obj = {
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
