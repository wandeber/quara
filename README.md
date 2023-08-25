# Quara
> Query as Sara

## About

- Supported comments:\n"
  - Line comments: // ...\n"
  - Block comments: /* ... */\n"
- Supported operators:\n"
  +, -, *, /, %, ^, ¬/\n"
  =, +=, -=, *=, /=, %=, ^=\n"
  !, ==, !=, ~=, !~=, <>, <, >, <=, >=, &&, ||\n"
  $not, $eq, $ne, $leq, $lne, $lt, $gt, $lte, $gte, $and, $or\n"
  (, )\n"
  ++, -- (as pre-increment and pre-decrement)\n"
- Supported types:\n"
  - Booleans.\n"
  - Integer and decimal numbers.\n"
  - Strings.\n"
- Variables and reserved keywords.\n"
- Reserved valid names:\n"
  $not, $eq, $ne, $leq, $lne, $lt, $gt, $lte, $gte, $and, $or\n"
  true, false\n"

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
