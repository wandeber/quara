# Quara
> Query as Sara

## About

- Supported comments:
  - Line comments: // ...
  - Block comments: /* ... */
- Supported operators:
  +, -, *, /, %, ^, ¬/
  =, +=, -=, *=, /=, %=, ^=
  !, ==, !=, ~=, !~=, <>, <, >, <=, >=, &&, ||
  $not, $eq, $ne, $leq, $lne, $lt, $gt, $lte, $gte, $and, $or
  (, )
  ++, -- (as pre-increment and pre-decrement)
- Supported types:
  - Booleans.
  - Integer and decimal numbers.
  - Strings.
- Variables and reserved keywords.
- Reserved valid names:
  $not, $eq, $ne, $leq, $lne, $lt, $gt, $lte, $gte, $and, $or
  true, false

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
... else r2
...; else r2;
...} else r2;
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
print(obj{key});
```

### Loops

#### While
```
while (condition) {
  // ...
}
```

#### For
```
for (item, key in list) {
  // ...
}
```

## Syntax

```
script      : (statement [OpSemicolon])* EoF

statement   : declaration | assign | expr | empty

empty       :

declaration : [constDecl | varDecl]

varDecl           : (ModVar | typeSpec) commaDecl
commaDecl         : declAssign (OpComma declAssign)*
declAssign        : member [opAssignValue]

constDecl         : ModConst [typeSpec] declEqualAssign [(OpComma declEqualAssign)*]
declEqualAssign   : member opAssignValue

opAssignValue     : OpAssign assign

equalAssign       : member OpAssign assignValue
assign            : member anyAssignOperator assignValue
assignValue       : (assign* | expr)

anyAssignOperator : OpAssign
                    | OpPlusAssign
                    | OpMinusAssign
                    | OpMultiplicationAssign
                    | OpDivisionAssign
                    | OpModulusAssign
                    | OpPowAssign

member    : variable (
              OpDot variable
              | OpArrayAccessorOpen expr OpArrayAccessorClose
            )*

variable  : Letter (Letter | Digit)*    // Identifier

```