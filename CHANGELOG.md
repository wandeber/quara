# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [TODO]

- Scopes.
- Remove elements from arrays.
- Custom functions.
- Import. Its behaviour should be overridable from the outside.
- Shell inside Quara main class.
- Optimize Interpreter creation.

## [Unreleased]

### Added
- Add elements to arrays.
- Define objects.

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
