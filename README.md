# thrift-typescript

Generate TypeScript from Thrift IDL files.

## Installation

```sh
npm install --save @creditkarma/thrift-typescript
```

## Usage

Thrift TypeScript provides both a JavaScript and a command line API.

Given the following files

thrift/simple.thrift

```
struct MyStruct {
    1: required int id,
    2: required bool field1,
    # 3: required string field,
    4: required i16 field,
}
```

You can generate TypeScript via the command line:

```sh
thrift-typescript --rootDir . --sourceDir thrift --outDir codegen simple.thrift
```

The available options are:

* --rootDir: This is used to resolve out and source directories. Defaults to current directory.
* --outDir: The directory to save generated files to. Will be created if it doesn't exist. Defaults to 'codegen'.
* --sourceDir: The directory to search for source Thrift files. Defaults to 'thrift'.

All other fields are assumed to be source files.

You can gen code from more than one Thrift file:

```sh
thrift-typescript one.thrift two.thrift three.thrift
```

You can also generate files using the JavaScript API:

```js
import { createGenerator } from '@creditkarma/thrift-typescript'

const generator = createGenerator({
  rootDir: '.',
  sourceDir: 'thirft',
  outDir: 'codegen',
  files: [
    'simple.thrift'
  ]
})

// Generates TypeScript and saves to given outDir
generator.makeFiles()
```

You can generate TypeScript from a string of Thrift without saving to file:

```js
import { readFileSync } from 'fs'
import { make } from '@creditkarma/thrift-typescript'

const rawThrift: string = readFileSync('./thrift/simple.thrift', 'utf-8')
const generatedCode: string = make(rawThrift)
```

## Development

Install dependencies with

```sh
npm install
```

### Build

```sh
npm run build
```


### Run test in watch mode

```sh
npm run test:watch
```

## Contributing
For more information about contributing new features and bug fixes, see our [Contribution Guidelines](https://github.com/creditkarma/CONTRIBUTING.md).
External contributors must sign Contributor License Agreement (CLA)

## License
This project is licensed under [Apache License Version 2.0](./LICENSE)
