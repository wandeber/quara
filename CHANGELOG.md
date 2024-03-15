# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [TODO]

- Scopes.
- Add elementes to arrays.
- Remove elements from arrays.
- Define objects.
- Custom functions.
- Import. Its behaviour should be overridable from the outside.
- Migrate from Jest to Bun testing.
- Shell inside Quara main class.
- Charachter escaping in strings.
- Optimize Interpreter creation.

## [Unreleased]

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
