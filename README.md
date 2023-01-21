# simple-xml-builder
A simple package for building large xml files.
## Installation
```sh
$ npm install simple-xml-builder
```
## Usage
## API
### `XMLBuilder(options)`
The XMLBuilder class takes an `options` parameter with the following format

Field | Type | Required | Default
:---:|:---:|:---:|:---:
`outputFile` | `string` | `true` |
`nameSpace` | `string`\|`undefined`\|`null` | `false` | 
`buffSize` | `number` | `false` | `50000`
`format` | `boolean` | `false` | `false`

The `outputFile` is used to specify the path of the generated XML file. `nameSpace` is used to specify the initial namespace of the tags, it can be later modified ussing `.setNamespace(nameSpace)`.
The class is writing the file content synchronous using a buffer, for peformance reasons, `buffSize` is used to specify the size of the buffer (in lines). `format` is used to specify if we want our genereated xml to be formatted, keeping this off will give a smaller output file.

###add(options)
The `add` function is used to add a new tag to the file, it receives one parameter with the following format

Field | Type | Required | Default
:---:|:---:|:---:|:---:
`tag` | `string` | `true` | 

