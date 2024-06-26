# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [TODO]

- Remove elements from arrays.
- Import. Its behaviour should be overridable from the outside.
- Absolute value operator: `|x|`.
- Infer types from assignments.
- Optional type definition with Pascal-like syntax.
- Casting operators: `int`, `float`, `bool`, `str`.
- Type checking operators: `is`.
- Type retrieval operator: `type`.
- `for`, `while` and `if` as expressions.
- Assignment between arrays.
- Assignment between objects.
- Sobrecarga de operadores.
- Functions:
  - Function overloading (by number of arguments).

## [UNRELEASED]

...

## [0.10.11]

### Added

- Objects treated internally with Map.
- Support for Node 18.

## [0.10.10]

### Added

- Default functions added: `push`, `pop`, `shift`, `unshift`, `len`, `concat`.
- Decreasing ranges: `5..1`, `5..<1`.
- Iterate over objects and strings with `for` loops.
- Custom function parameters.
- Custom function calls with arguments.
- For loop.
  - `for i in 1..5 {log(i)}`
  - `for v, i in 5..10 {log(i +": "+ v);}`
  - `for 1..5 {log("Hola")}`

### Removed

- Revert sum operators behaviour with arrays.

## [0.10.9]

### Added

- Sum operator now works with arrays.
- New memory system ready for scopes.
- Scopes working in functions, if blocks and while loops.
- Constants working.
- Return.

### Changed

- Update dependencies: `husky`, `eslint`.

### Removed

- Unused dependencies: `ts-loader`.

## [0.10.8]

### Added

- Reserve word `fn`.
- Operator `in` (or `$in`) for arrays, objects and strings.
- Operators without $ prefix: `and`, `or`, `not`...
- Simple function definition implementation.

### Changed

- `..` is now the inclusive range operator.
- `..<` is now the exclusive range operator.
- Optimize build size.
- Refactor classes names of AST nodes and visitors.
- Avoid default exports.

### Removed

- Some reserved words removed: `each`, `integer`, `boolean`, `function`.
- Removed the old inclusive range operator: `..=`.

## [0.10.7]

### Added
- Add elements to arrays.
- Define, access and modify objects.
- Exclusive and inclusive range operators.
- Add a new standard function: `trim`.

### Changed
- Access object members with ["key"] is not allowed anymore.

## [0.10.6]

### Added

- Add documentation for the standard functions.
- Add log function to print to the console.
- Add a test for function calls with no arguments.

### Changed

- Fix function calls with no arguments.
- print function now only prints the value of the first argument to the output channel.
- NaN now outputs "" instead of "NaN".
- undefined and null are now the same (null in Quara, undefined internally in JavaScript) and output "".

## [0.10.5]

### Added

- Add escape sequence handling to strings and text templates with the new "\\" operator.
- Add several standard functions:
  - General:
    - join
    - split
  - Maths:
    - max
    - min
    - abs
    - round
    - ceil
    - floor
    - trunc
  - Types:
    - isNumber
    - isDecimal
    - isInteger
    - isString
    - isBoolean
    - isObject
    - isArray

## [0.10.2]

### Changed

- Visitors management optimized. Now they are stored in a literal object instead of in a Map.
- Back to Node.
- Back to Jest.

### Removed

- AST.accept() method. It was not used.

## [0.10.1]

### Changed

- [Breaking change] Quara.script is async now. You can use scriptSync instead.
- Dependencies updated.
- Define arrays.
- TypeScript 5.
- Node -> Bun.
- Jest -> Bun.

### Added

- Quara.text to process a Quara string. Also Quara.textSync.
- Quara.file to process a Quara file (script or string).
- Sync versions of Quara methods.

### Fixed

- The build of the shell works again. Now it imports the Quara class properly.

## [0.10.0] - 2023-09-05

### Added

- Object dynamic accesor: obj.{"key"}. I keep obj["key"] for compatibility reasons.
- Array constants: [1, 2, 3]. They can be assigned to a variable and accessed with the [] operator.

### Changed

- Migrated from Webpack to esbuild.

### Removed

- NPM script build-tsc.

## [0.9.0] - 2023-08-31

### Added

- Changelog added.
- Templates or string processing.
- Two channel results for AST node visitors: value and output.
- Quara code file extension decided: .quara, .qr
- Sample code file added.
- "endif" and "endwhile" replaced by "/if" and "/while".
- "virtual" and "final" are now reserved keywords.
