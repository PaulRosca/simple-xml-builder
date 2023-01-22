# simple-xml-builder
A simple package for building large xml files.
## Installation
```sh
$ npm install simple-xml-builder
```
## Usage
To import the package we can do the following

```JavaScript
//CJS
const xmlBuilder = require("simple-xml-builder");

//ESM
import xmlBuilder from "simple-xml-builder";
```


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
### `Attribute`
`Attribute` for XML tags, they have the following format

Field | Type
:---:|:---:
`key` | `string`
`value` | `string`
### `.add(options)`
The `add` function is used to add a new tag to the file, it receives one parameter with the following format. The `value` will be XML encoded.

Field | Type | Required | Default
:---:|:---:|:---:|:---:
`tag` | `string` | `true` | 
`selfClosing` | `boolean` | `false` | `false`
`attributes` | `Attribute[]` | `false` | `[]`
`processing` | `boolean` | `false` | `false`

The `selfClosing` parameters specifies if the tag should be self closing, e.g
```XML
<someTag/>
```
The `attributes` option takes an array of `Attribute`s and adds them to the tag. `processing` is used to specify if the tag is a processing instruction, e.g
```XML
<? ... ?>
```
### `.txt(conent: string)`
The `txt` function is used to add text content inside a tag. After a call to this function, the current tag will be closed automatically
### `.close()`
The `close` function is used to close the current opened tag.
### `.end()`
The `end` function is used to close all current opened tags.
### `.log()`
The `log` function can be used for debugging, it will `console.log` the current buffer, opened tags and indentation level
