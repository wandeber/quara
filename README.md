# Quara
> Query as Sara

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
  - if, else, endif
  - while, endwhile
  - for, endfor
  - each, in, endeach
  - function, return, endfunction
  - null, undefined
  - class, extends, endclass
  - get, set
  - static, abstract
  - private, public, protected
  - interface, implements, endinterface


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
if c: r endif;
... else r2
...; else r2
...} else r2
... else: r2 endif;
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
while c: r endwhile;
```

## Text processor/templates (WIP, don't use it yet)
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
  {endif}
`
```

### While loops:
```
var i = 0;
`
  {while i < 5:}
    {i}
    {i = i + 1}
  {endwhile}
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

## Pending
- Array declaration
- Object declaration
- Scopes
- Function declaration
- Loops
  - For
  - Each

### Arrays
```
var list = [1, 2, 3, 4, 5];
print(list[0]);
var num = 2;
print(list[num]);
```

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

### Loops

#### For
```
for (item, key in list) {
  // ...
}
for (item in list) r
for item in list {r}
for (item, key) in list {r}
for (item, key) in list: r; endfor;
for (item, key) in list: r; endfor;
```

#### Each
```
each (item in list) {
  // ...
}
```

## License
[ISC](./LICENSE)