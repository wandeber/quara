# Quara
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
```
if (condition) {
  // ...
}
else if (condition) {
  // ...
}
else {
  // ...
}

if (c) r
if (c) r;
if (c) {r}
if (c) {r;}
if c {r}
if c -> r
if c: r /if;
... else r2
...; else r2
...} else r2
... else: r2 /if;
```

### Objects
```
print(obj.key1);

var key = "key1";
print(obj.{key});
print(obj[key]); // Deprecated
```

### Arrays
```
print(list[0]);
var num = 2;
print(list[num]);
```

### Loops

#### While
```
while (condition) {
  // ...
}
while (c) r
while (c) r;
while (c) {r}
while (c) {r;}
while c {r}
while c -> r
while c: r /while;
```

## Text processor/templates
```
`Hola` // Hola
```

Assign the output to a variable:
```
var name = "Sara";
var text = `Hola, {name}`; // Hola Sara
```

Coding:
```
var name = "Sara";
var text = `Hola, {name += " V."; name}`; // Hola Sara V.
```

### variables:
```
var name = "Sara";
`Hola, {name}` // Hola Sara
```

### if/else statements:
```
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
```
var i = 0;
`
  {while i < 5:}
    {i}
    {i = i + 1}
  {/while}
`
```

## Standard functions
```
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
```
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
```
var list = [1, 2, 3, 4, 5];
print(list[0]);
var num = 2;
print(list[num]);
```

### Loops

#### For (maybe unnecessary)
```
for (item, key in list) {
  // ...
}
for (item in list) r
for item in list {r}
for (item, key) in list {r}
for (item, key) in list: r; /for;
for (item, key) in list: r; /for;
```

#### Each
```
each (item in list) {
  // ...
}
```

## References and special thanks

- Thanks to [Ruslan Spivak](https://ruslanspivak.com/) for his [Let's Build A Simple Interpreter](https://ruslanspivak.com/lsbasi-part1/) series.
- [LUA](https://github.com/lua/lua)

## License

Quara © 2024 by [Bernardo Alemán Siverio (wandeber)](https://github.com/wandeber) is licensed under [CC BY-ND 4.0](./LICENSE)
