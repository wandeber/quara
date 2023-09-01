# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [TODO]

- Scopes.
- Define arrays.
- Define objects.

## [Unreleased]

- Object dynamic accesor: obj.{"key"}. I keep obj["key"] for compatibility reasons.
- Array constants: [1, 2, 3]. They can be assigned to a variable and accessed with the [] operator.

## [0.9.0] - 2023-08-31

### Added

- Changelog added.
- Templates or string processing.
- Two channel results for AST node visitors: value and output.
- Quara code file extension decided: .quara, .qr
- Sample code file added.
- "endif" and "endwhile" replaced by "/if" and "/while".
- "virtual" and "final" are now reserved keywords.
